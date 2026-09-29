import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import { migrateWriterObservability } from "@/lib/writer/schema-ddl";
import { generateReportToken, hashReportToken, isExpired } from "@/lib/writer/report-token";
import type { WriterContext, WriterEventInput } from "@/lib/writer/events";
import type { SubmissionStatus } from "@/lib/writer/types";

const temp = createTempDb("store");

afterAll(() => {
  // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  try {
    temp.close();
  } catch {
    // ignore
  }
});

type StoreModule = typeof import("@/lib/writer/store");
type DbModule = typeof import("@/lib/admin/db");

let store: StoreModule;
let db: DbModule;

beforeAll(async () => {
  store = await import("@/lib/writer/store");
  db = await import("@/lib/admin/db");
});

const uuid = () => crypto.randomUUID();

function context(overrides: Partial<WriterContext> = {}): WriterContext {
  return { locale: "pt-br", path: "/pt-br/escrever", taskId: "mandacaru-2025-2", ...overrides };
}

function event(overrides: Partial<WriterEventInput> = {}): WriterEventInput {
  return {
    eventId: uuid(),
    sessionId: uuid(),
    visitorId: uuid(),
    event: "writer_opened",
    occurredAt: new Date().toISOString(),
    ...overrides,
  };
}

function submission(id = uuid(), overrides: Record<string, unknown> = {}) {
  return {
    id,
    sessionId: null,
    email: "candidate@example.com",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    text: "Um texto de teste com algumas palavras.",
    wordCount: 8,
    ...overrides,
  };
}

describe("миграция 004", () => {
  it("создаёт все пять таблиц", () => {
    const rows = db
      .getAdminDb()
      .prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name IN
         ('writer_sessions','writer_events','writing_submissions','writing_reports','email_deliveries')`,
      )
      .all() as { name: string }[];
    expect(rows.map((row) => row.name).sort()).toEqual([
      "email_deliveries",
      "writer_events",
      "writer_sessions",
      "writing_reports",
      "writing_submissions",
    ]);
  });

  it("повторный запуск безопасен и сохраняет существующие данные", () => {
    const database = db.getAdminDb();
    database.prepare(`INSERT INTO writing_emails (email) VALUES ('keep@example.com')`).run();
    const before = (database.prepare(`SELECT COUNT(*) AS c FROM writing_emails`).get() as { c: number }).c;

    expect(() => migrateWriterObservability(database)).not.toThrow();
    expect(() => migrateWriterObservability(database)).not.toThrow();

    const after = (database.prepare(`SELECT COUNT(*) AS c FROM writing_emails`).get() as { c: number }).c;
    expect(after).toBe(before);
  });

  it("индексы для периода, статусов, локалей и заданий созданы", () => {
    const names = (
      db.getAdminDb().prepare(`SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_writer%' OR name LIKE 'idx_writing%' OR name LIKE 'idx_email_deliveries%'`).all() as { name: string }[]
    ).map((row) => row.name);
    for (const expected of [
      "idx_writer_sessions_opened",
      "idx_writer_sessions_status",
      "idx_writer_sessions_locale",
      "idx_writer_sessions_task",
      "idx_writer_events_occurred",
      "idx_writing_submissions_status",
      "idx_writing_submissions_locale",
      "idx_writing_submissions_task",
      "idx_email_deliveries_status",
    ]) {
      expect(names).toContain(expected);
    }
  });
});

describe("writer_sessions", () => {
  it("создаёт сессию один раз и обновляет задачу без дублей", () => {
    const database = db.getAdminDb();
    const sessionId = uuid();
    const visitorId = uuid();

    store.upsertWriterSession({ sessionId, visitorId, context: context() });
    store.upsertWriterSession({ sessionId, visitorId, context: context({ taskId: "zona-livre-2023-2" }) });

    const rows = database.prepare(`SELECT * FROM writer_sessions WHERE id = ?`).all(sessionId) as Record<string, unknown>[];
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe("opened");
    expect(rows[0].initial_task_id).toBe("mandacaru-2025-2");
    expect(rows[0].current_task_id).toBe("zona-livre-2023-2");
    expect(rows[0].locale).toBe("pt-br");
  });

  it("бросившая писать сессия помечается abandoned без клиентского события", () => {
    const database = db.getAdminDb();
    const sessionId = uuid();
    store.upsertWriterSession({ sessionId, visitorId: uuid(), context: context() });
    store.advanceSessionStatus(sessionId, "writing", { first_input_at: new Date().toISOString() });

    database
      .prepare(`UPDATE writer_sessions SET last_activity_at = ? WHERE id = ?`)
      .run(new Date(Date.now() - 31 * 60 * 1000).toISOString(), sessionId);

    expect(store.markAbandonedSessions(30 * 60 * 1000)).toBeGreaterThanOrEqual(1);
    expect(store.getSession(sessionId)?.status).toBe("abandoned");
  });

  it("завершённая сессия не становится abandoned", () => {
    const database = db.getAdminDb();
    const sessionId = uuid();
    store.upsertWriterSession({ sessionId, visitorId: uuid(), context: context() });
    store.advanceSessionStatus(sessionId, "completed", {
      submitted_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });
    database
      .prepare(`UPDATE writer_sessions SET last_activity_at = ? WHERE id = ?`)
      .run(new Date(Date.now() - 40 * 60 * 1000).toISOString(), sessionId);

    store.markAbandonedSessions(30 * 60 * 1000);
    expect(store.getSession(sessionId)?.status).toBe("completed");
  });
});

describe("writer_events", () => {
  it("идемпотентен по eventId: повторный beacon не увеличивает счётчик", () => {
    const payload = event({ event: "writer_started" });
    const first = store.insertWriterEvent(payload, context());
    const second = store.insertWriterEvent(payload, context());

    expect(first.inserted).toBe(true);
    expect(second.inserted).toBe(false);

    const rows = db.getAdminDb().prepare(`SELECT COUNT(*) AS c FROM writer_events WHERE id = ?`).get(payload.eventId) as {
      c: number;
    };
    expect(rows.c).toBe(1);
  });

  it("серверное время главнее клиентских часов", () => {
    const serverNow = Date.parse("2026-09-26T10:00:00.000Z");

    const future = store.insertWriterEvent(event({ occurredAt: "2027-01-01T00:00:00.000Z" }), context(), serverNow);
    const futureRow = db.getAdminDb().prepare(`SELECT occurred_at FROM writer_events WHERE id = ?`).get(future.eventId) as { occurred_at: string };
    expect(Date.parse(futureRow.occurred_at)).toBe(serverNow);

    const ancient = store.insertWriterEvent(event({ occurredAt: "2020-01-01T00:00:00.000Z" }), context(), serverNow);
    const ancientRow = db.getAdminDb().prepare(`SELECT occurred_at FROM writer_events WHERE id = ?`).get(ancient.eventId) as { occurred_at: string };
    expect(Date.parse(ancientRow.occurred_at)).toBe(serverNow);
  });

  it("в metadata не попадают ключи вне allowlist", () => {
    const inserted = store.insertWriterEvent(
      event({ event: "writer_reached_exam_minimum", wordCount: 150, resultStatus: "succeeded" }),
      context(),
    );
    const row = db.getAdminDb().prepare(`SELECT metadata_json FROM writer_events WHERE id = ?`).get(inserted.eventId) as {
      metadata_json: string;
    };
    expect(JSON.parse(row.metadata_json)).toEqual({ wordCount: 150, resultStatus: "succeeded" });
  });

  // Retention of old events/sessions lives in deploy/writer-retention.mjs (same SQL for the cron
  // script and for the tests) and is covered by tests/writer/retention.test.ts.
});

describe("токен отчёта", () => {
  it("в базе лежит только hash", () => {
    const id = uuid();
    store.createSubmission(submission(id));

    const token = generateReportToken();
    const report = store.createReport(id, hashReportToken(token), 30);

    expect(report.token_hash).toHaveLength(64);
    expect(report.token_hash).not.toContain(token);

    const rows = db.getAdminDb().prepare(`SELECT token_hash FROM writing_reports`).all() as { token_hash: string }[];
    expect(rows.some((row) => row.token_hash.includes(token))).toBe(false);
    expect(store.findReportByTokenHash(hashReportToken(token))?.id).toBe(report.id);
    expect(store.findReportByTokenHash(hashReportToken(generateReportToken()))).toBeUndefined();
  });

  it("просмотр засчитывается один раз на двойной заход", () => {
    const id = uuid();
    store.createSubmission(submission(id, { email: "second@example.com", locale: "en" }));
    const report = store.createReport(id, hashReportToken(generateReportToken()), 30);

    store.markReportOpened(report.id);
    store.markReportOpened(report.id);

    const row = db
      .getAdminDb()
      .prepare(`SELECT open_count, first_opened_at, last_opened_at, expires_at FROM writing_reports WHERE id = ?`)
      .get(report.id) as { open_count: number; first_opened_at: string; last_opened_at: string; expires_at: string };

    expect(row.open_count).toBe(1);
    expect(row.first_opened_at).toBe(row.last_opened_at);
    expect(isExpired(row.expires_at)).toBe(false);
  });

  it("истёкший срок отсекается", () => {
    expect(isExpired(new Date(Date.now() - 1000).toISOString())).toBe(true);
    expect(isExpired(new Date(Date.now() + 60_000).toISOString())).toBe(false);
  });
});

describe("подписка на доставку и удаление", () => {
  it("сбой письма не удаляет готовый анализ", () => {
    const id = uuid();
    store.createSubmission(submission(id, { email: "third@example.com" }));
    store.completeSubmission(id, {
      analysisJson: JSON.stringify({ corrections: [] }),
      celpeLevel: "intermediario",
      scoresJson: JSON.stringify({ taskFulfillment: 3 }),
      provider: "openai",
      model: "gpt-4.1-mini",
      mock: false,
      analysisDurationMs: 1200,
    });

    store.createDelivery({ submissionId: id, recipient: "third@example.com", provider: "resend", status: "pending" });
    store.markDeliveryFailed(id, "resend 429 too many requests");

    const row = store.getSubmission(id);
    expect(row?.status).toBe("completed");
    expect(row?.analysis_json).toContain("corrections");
    expect(store.getDeliveryForSubmission(id)?.status).toBe("failed");
  });

  it("письмо не считается отправленным до фактической отправки", () => {
    const id = uuid();
    store.createSubmission(submission(id, { email: "fourth@example.com" }));
    const delivery = store.createDelivery({ submissionId: id, recipient: "fourth@example.com", provider: null, status: "pending" });
    expect(delivery.status).toBe("pending");
    expect(delivery.sent_at).toBeNull();

    store.markDeliverySent(id, "rm_123");
    const after = store.getDeliveryForSubmission(id);
    expect(after?.status).toBe("sent");
    expect(after?.provider_message_id).toBe("rm_123");
    expect(after?.attempt_count).toBe(1);
  });

  it("без настраиваемого провайдера доставка помечается skipped_unconfigured", () => {
    const id = uuid();
    store.createSubmission(submission(id, { email: "fifth@example.com" }));
    store.createDelivery({ submissionId: id, recipient: "fifth@example.com", provider: null, status: "skipped_unconfigured" });
    expect(store.getDeliveryForSubmission(id)?.status).toBe("skipped_unconfigured");
  });

  it("каскадное удаление стирает текст, анализ, почту и события", () => {
    const sessionId = uuid();
    const id = uuid();
    store.upsertWriterSession({ sessionId, visitorId: uuid(), context: context() });
    store.insertWriterEvent(event({ sessionId, event: "writer_started" }), context());
    store.createSubmission(submission(id, { sessionId, email: "erase@example.com" }));
    store.createReport(id, hashReportToken(generateReportToken()), 30);
    store.createDelivery({ submissionId: id, recipient: "erase@example.com", provider: "resend", status: "pending" });

    const result = store.deleteSubmissionCascade(id);
    expect(result.submission).toBe(1);
    expect(result.report).toBe(1);
    expect(result.delivery).toBe(1);
    expect(result.events).toBe(1);
    expect(result.session).toBe(1);
    expect(store.getSubmission(id)).toBeUndefined();
    const emails = db.getAdminDb().prepare(`SELECT COUNT(*) AS c FROM writing_submissions WHERE email = 'erase@example.com'`).get() as { c: number };
    expect(emails.c).toBe(0);
  });
});

describe("безопасные строки", () => {
  it("email маскируется в списках", () => {
    const masked = store.maskEmail("candidate.long@gmail.com");
    expect(masked).toContain("@gmail.com");
    expect(masked).not.toContain("candidate.long");
    expect(store.maskEmail(null)).toBe("—");
  });

  it("техническая ошибка не уносит ключ провайдера и адрес", () => {
    const dirty = "Failed with sk-abcdef123456789 for person@example.com\n  at SecretStack(frame)";
    const safe = store.safeErrorText(dirty);
    expect(safe).not.toContain("sk-abcdef123456789");
    expect(safe).not.toContain("person@example.com");
    expect(safe).not.toContain("\n");
    expect(safe?.length).toBeLessThanOrEqual(300);
  });

  it("ошибка в подчинённом статусе не затирает completed", () => {
    const id = uuid();
    store.createSubmission(submission(id, { email: "sixth@example.com" }));
    store.completeSubmission(id, {
      analysisJson: "{}",
      celpeLevel: null,
      scoresJson: null,
      provider: "mock",
      model: "seeded-pt",
      mock: true,
      analysisDurationMs: 5,
    });
    store.setArchiveResult(id, "failed", null, "EACCES: " + "disk".repeat(20));

    const row = store.getSubmission(id);
    expect(row?.status).toBe("completed");
    expect(row?.archive_status).toBe("failed");
    expect(row?.archive_error).toContain("EACCES");
    expect(row?.error_message).toBeNull();
  });
});
