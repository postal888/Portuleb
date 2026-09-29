import { beforeAll, afterAll, describe, expect, it } from "vitest";
import Database from "better-sqlite3";
import { createTempDb } from "../helpers/temp-db";

/**
 * Retention is executed by deploy/writer-retention.mjs, which is also the only place the policy
 * SQL lives. These tests run the same module the cron script runs, against a throwaway database.
 */

const temp = createTempDb("retention");
const DAY = 86_400_000;
const NOW = Date.parse("2026-09-27T12:00:00.000Z");
const ago = (ms: number) => new Date(NOW - ms).toISOString();

type RetentionModule = typeof import("../../deploy/writer-retention.mjs");
type StoreModule = typeof import("@/lib/writer/store");

let retention: RetentionModule;
let store: StoreModule;
let raw: () => ReturnType<typeof import("@/lib/admin/db").getAdminDb>;

beforeAll(async () => {
  retention = await import("../../deploy/writer-retention.mjs");
  store = await import("@/lib/writer/store");
  const db = await import("@/lib/admin/db");
  raw = () => db.getAdminDb();
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // ignore
  }
});

const uuid = () => crypto.randomUUID();

function addSession(seed: { id?: string; status: string; ageDays?: number; ageMs?: number }): string {
  const id = seed.id ?? uuid();
  const stamp = ago(seed.ageMs ?? (seed.ageDays ?? 0) * DAY);
  raw()
    .prepare(
      `INSERT INTO writer_sessions
         (id, visitor_id, locale, path, status, opened_at, last_activity_at, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?)`,
    )
    .run(id, uuid(), "pt-br", "/pt-br/escrever", seed.status, stamp, stamp, stamp, stamp);
  return id;
}

function addEvent(sessionId: string, ageMs: number): string {
  const id = uuid();
  raw()
    .prepare(
      `INSERT INTO writer_events (id, session_id, event_name, occurred_at, locale, metadata_json)
       VALUES (?,?,?,?,?,'{}')`,
    )
    .run(id, sessionId, "writer_opened", ago(ageMs), "pt-br");
  return id;
}

function addSubmission(sessionId: string | null): string {
  const id = uuid();
  store.createSubmission({
    id,
    sessionId,
    email: "retention-fixture@example.com",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    text: "Fixture text used only to keep a submission row alive during retention tests.",
    wordCount: 150,
  });
  return id;
}

const countOf = (value: unknown) => Number((value as { c: number }).c);
const count = (table: string) => countOf(raw().prepare(`SELECT COUNT(*) AS c FROM ${table}`).get());
const alive = (table: string, id: string) =>
  countOf(raw().prepare(`SELECT COUNT(*) AS c FROM ${table} WHERE id = ?`).get(id)) === 1;

const run = (options?: { dryRun?: boolean; nowMs?: number }) =>
  retention.runWriterRetention(raw(), { nowMs: NOW, ...options });

describe("границы retention", () => {
  it("событие ровно на границе 180 дней остаётся, на миллиметр старше — уходит", () => {
    const session = addSession({ status: "completed", ageDays: 10 });
    const onBoundary = addEvent(session, 180 * DAY);
    const pastBoundary = addEvent(session, 180 * DAY + 1);

    const result = run();

    expect(result.deleted.events).toBe(1);
    expect(alive("writer_events", onBoundary)).toBe(true);
    expect(alive("writer_events", pastBoundary)).toBe(false);
  });

  it("брошенная сессия: ровно 90 суток — живёт, 90 суток + 1 мс — удаляется", () => {
    const kept = addSession({ status: "abandoned", ageMs: 90 * DAY });
    const doomed = addSession({ status: "abandoned", ageMs: 90 * DAY + 1 });

    const result = run();

    expect(result.deleted.abandonedSessions).toBe(1);
    expect(alive("writer_sessions", kept)).toBe(true);
    expect(alive("writer_sessions", doomed)).toBe(false);
  });

  it("финальная сессия ждёт 180 суток, а не 90", () => {
    const stillYoung = addSession({ status: "completed", ageDays: 120 });
    const oldTerminal = addSession({ status: "failed", ageMs: 180 * DAY + 1 });

    const result = run();

    expect(result.deleted.terminalSessions).toBe(1);
    expect(result.deleted.abandonedSessions).toBe(0);
    expect(alive("writer_sessions", stillYoung)).toBe(true);
    expect(alive("writer_sessions", oldTerminal)).toBe(false);
  });

  it("сессия, нужная отправке, не удаляется даже через 400 дней", () => {
    const session = addSession({ status: "completed", ageDays: 400 });
    addSubmission(session);
    const event = addEvent(session, 10 * DAY);

    const result = run();

    expect(result.deleted.terminalSessions).toBe(0);
    expect(alive("writer_sessions", session)).toBe(true);
    expect(alive("writer_events", event)).toBe(true);
  });

  it("ссылка учитывается с обеих сторон, а висячая — уже нет", () => {
    const submission = addSubmission(null);
    const session = addSession({ status: "completed", ageDays: 400 });
    raw().prepare(`UPDATE writer_sessions SET submission_id = ? WHERE id = ?`).run(submission, session);

    expect(run().deleted.terminalSessions).toBe(0);
    expect(alive("writer_sessions", session)).toBe(true);

    // Отправку стёрли другой веткой — ссылка повисла, сессия больше не нужна.
    raw().prepare(`DELETE FROM writing_submissions WHERE id = ?`).run(submission);
    expect(run().deleted.terminalSessions).toBe(1);
    expect(alive("writer_sessions", session)).toBe(false);
  });

  it("сессия в работе не трогается и видна в остатке", () => {
    const inFlight = addSession({ status: "ready_for_email", ageDays: 400 });

    const result = run();

    expect(alive("writer_sessions", inFlight)).toBe(true);
    expect(result.remaining?.inFlight).toBeGreaterThanOrEqual(1);
  });

  it("события удалённой сессии уходят вместе с ней", () => {
    const session = addSession({ status: "abandoned", ageMs: 91 * DAY });
    const fresh = addEvent(session, 2 * DAY);

    const result = run();

    expect(result.deleted.abandonedSessions).toBe(1);
    expect(result.deleted.orphanEvents).toBe(1);
    expect(alive("writer_events", fresh)).toBe(false);
  });
});

describe("безопасность операции", () => {
  it("отправки, отчёты и письма не удаляются никогда", () => {
    const session = addSession({ status: "completed", ageDays: 10 });
    const submission = addSubmission(session);
    const report = store.createReport(submission, "hash-retention-test", 30);
    store.createDelivery({ submissionId: submission, recipient: "fixed@example.com", provider: null, status: "pending" });
    const before = {
      submissions: count("writing_submissions"),
      reports: count("writing_reports"),
      deliveries: count("email_deliveries"),
    };

    const result = run();

    expect(Object.keys(result.deleted).sort()).toEqual(["abandonedSessions", "events", "orphanEvents", "terminalSessions"]);
    expect(count("writing_submissions")).toBe(before.submissions);
    expect(count("writing_reports")).toBe(before.reports);
    expect(count("email_deliveries")).toBe(before.deliveries);
    expect(alive("writing_submissions", submission)).toBe(true);
    expect(alive("writing_reports", report.id)).toBe(true);
    expect(result.remaining?.submissions).toBe(before.submissions);
  });

  it("dry-run показывает те же числа и ничего не пишет", () => {
    const session = addSession({ status: "abandoned", ageMs: 120 * DAY });
    const event = addEvent(session, 200 * DAY);

    const preview = run({ dryRun: true });
    expect(preview.dryRun).toBe(true);
    expect(preview.deleted.events).toBeGreaterThanOrEqual(1);
    expect(preview.deleted.abandonedSessions).toBe(1);
    expect(alive("writer_sessions", session)).toBe(true);
    expect(alive("writer_events", event)).toBe(true);

    const applied = run();
    expect(applied.deleted).toEqual(preview.deleted);
    expect(alive("writer_sessions", session)).toBe(false);
  });

  it("идемпотентно: второй прогон не находит чего удалять", () => {
    addSession({ status: "completed", ageMs: 500 * DAY });
    run();
    const second = run();
    expect(Object.values(second.deleted).reduce((a, b) => a + b, 0)).toBe(0);
  });

  it("ошибка на полпути откатывает всё", () => {
    const session = addSession({ status: "abandoned", ageMs: 400 * DAY });
    const oldEvent = addEvent(session, 400 * DAY);
    // Триггер не принимает связанных параметров, поэтому id подставляется — он всегда uuid().
    expect(session).toMatch(/^[0-9a-f-]{36}$/);
    raw().exec(
      `CREATE TRIGGER block_session_delete BEFORE DELETE ON writer_sessions
       WHEN OLD.id = '${session}' BEGIN SELECT RAISE(ABORT, 'тестовый блок'); END`,
    );

    try {
      expect(() => run()).toThrow(/тестовый блок/);
    } finally {
      raw().exec(`DROP TRIGGER block_session_delete`);
    }

    expect(alive("writer_sessions", session)).toBe(true);
    expect(alive("writer_events", oldEvent)).toBe(true);
  });

  it("база без writer-таблиц не роняет скрипт", () => {
    const empty = new Database(":memory:");
    try {
      const result = retention.runWriterRetention(empty, { nowMs: NOW });
      expect(result.deleted).toEqual({});
      expect(result.remaining).toBeNull();
      expect(result.skipped).toContain("нет writer-таблиц");
    } finally {
      empty.close();
    }
  });

  it("границы считаются от переданного момента, а не от часов процесса", () => {
    const policy = retention.WRITER_RETENTION;
    expect(policy).toEqual({ eventsDays: 180, terminalSessionDays: 180, abandonedSessionDays: 90 });
    const cutoffs = retention.retentionCutoffs(NOW, policy);
    expect(cutoffs.events).toBe(new Date(NOW - 180 * DAY).toISOString());
    expect(cutoffs.terminalSessions).toBe(new Date(NOW - 180 * DAY).toISOString());
    expect(cutoffs.abandonedSessions).toBe(new Date(NOW - 90 * DAY).toISOString());
  });
});
