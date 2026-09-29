import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import type { WriterContext } from "@/lib/writer/events";
import type { SubmissionStatus, WriterEventName } from "@/lib/writer/types";

const temp = createTempDb("admin-api");

const ESSAY_MARK = "TESSAIO-UNICO-NAO-DEVE-VAZAR";
const ADDRESS = "Maria.Gomes@Example.com";
/** The routes default to "the last 30 days", so every seeded timestamp has to stay recent. */
const FIXED_NOW = Date.now();

const hoursAgo = (hours: number) => new Date(FIXED_NOW - hours * 3_600_000).toISOString();
const uuid = () => crypto.randomUUID();

type StoreModule = typeof import("@/lib/writer/store");
type Json = Record<string, any>;

let store: StoreModule;
let raw: () => import("better-sqlite3").Database;
let adminToken: string;

function context(locale: WriterContext["locale"], taskId: string): WriterContext {
  return { locale, path: `/${locale}/escrever`, taskId: taskId as WriterContext["taskId"] };
}

/**
 * `silent` seeds a candidate who walked away: last_activity_at stays at the opening hour, so the
 * abandonment sweep can only catch that one. The others report live activity.
 */
function seedSession(seed: {
  locale?: WriterContext["locale"];
  taskId?: string;
  openedAt?: string;
  events?: WriterEventName[];
  wordCount?: number;
  activeMs?: number;
  elapsedMs?: number;
  silent?: boolean;
}): string {
  const id = uuid();
  const locale = seed.locale ?? "pt-br";
  const taskId = seed.taskId ?? "mandacaru-2025-2";
  const openedAt = seed.openedAt ?? hoursAgo(3);
  const visitor = uuid();
  const words = seed.wordCount ?? 150;
  const activeMs = seed.activeMs ?? 900_000;
  const elapsedMs = seed.elapsedMs ?? 1_200_000;

  store.upsertWriterSession({ sessionId: id, visitorId: visitor, context: context(locale, taskId), now: openedAt });
  for (const name of seed.events ?? []) {
    store.insertWriterEvent(
      {
        eventId: uuid(),
        sessionId: id,
        visitorId: visitor,
        event: name,
        occurredAt: openedAt,
        wordCount: words,
      },
      context(locale, taskId),
      Date.parse(openedAt),
    );
  }

  if (seed.silent) {
    // applySessionProgress deliberately leaves last_activity_at alone: it is the server's clock.
    store.applySessionProgress(id, {
      status: "writing",
      firstInputAt: openedAt,
      activeMs,
      elapsedMs,
      currentWordCount: words,
      maxWordCount: words,
    });
  } else {
    store.advanceSessionStatus(id, "writing", {
      first_input_at: openedAt,
      active_ms: activeMs,
      elapsed_ms: elapsedMs,
      current_word_count: words,
      max_word_count: words,
    });
  }
  return id;
}

function seedSubmission(seed: {
  sessionId: string | null;
  locale?: string;
  taskId?: string;
  status: SubmissionStatus;
  email?: string;
  wordCount?: number;
  errorCode?: string;
}): string {
  const id = uuid();
  store.createSubmission({
    id,
    sessionId: seed.sessionId,
    email: seed.email ?? ADDRESS,
    locale: seed.locale ?? "pt-br",
    taskId: seed.taskId ?? "mandacaru-2025-2",
    text: `${ESSAY_MARK}. Frase com "=1+1" dentro do texto deve continuar so no banco.`,
    wordCount: seed.wordCount ?? 150,
  });
  const createdAt = hoursAgo(3);
  raw().prepare(`UPDATE writing_submissions SET created_at = ?, updated_at = ? WHERE id = ?`)
    .run(createdAt, createdAt, id);

  if (seed.status === "completed") {
    store.completeSubmission(id, {
      analysisJson: JSON.stringify({
        corrections: [
          { id: "c1", category: "grammar", severity: "error" },
          { id: "c2", category: "grammar", severity: "warning" },
          { id: "c3", category: "spelling", severity: "error" },
        ],
      }),
      celpeLevel: "intermediario",
      scoresJson: JSON.stringify({ grammar: 7, cohesion: 6 }),
      provider: "openai",
      model: "gpt-4.1-mini",
      mock: false,
      analysisDurationMs: 4200,
    });
  } else {
    store.setSubmissionStatus(id, seed.status, { code: seed.errorCode ?? "analysis_timeout", message: "provider timeout" });
  }
  return id;
}

async function json(response: Response): Promise<Json> {
  return (await response.json()) as Json;
}

function headers(authorized: boolean): Record<string, string> {
  return authorized ? { authorization: `Bearer ${adminToken}` } : {};
}

async function getOverview(search: string, authorized = true) {
  const route = await import("@/app/api/admin/writer/overview/route");
  const url = `https://example.test/api/admin/writer/overview${search ? `?${search}` : ""}`;
  return route.GET(new Request(url, { headers: headers(authorized) }));
}

async function getSubmissions(search: string, authorized = true) {
  const route = await import("@/app/api/admin/writer/submissions/route");
  const url = `https://example.test/api/admin/writer/submissions${search ? `?${search}` : ""}`;
  return route.GET(new Request(url, { headers: headers(authorized) }));
}

async function getExport(search: string, authorized = true) {
  const route = await import("@/app/api/admin/writer/export/route");
  return route.GET(new Request(`https://example.test/api/admin/writer/export?${search}`, { headers: headers(authorized) }));
}

async function getDetail(id: string, authorized = true) {
  const route = await import("@/app/api/admin/writer/submission/[id]/route");
  const url = `https://example.test/api/admin/writer/submission/${encodeURIComponent(id)}`;
  return route.GET(new Request(url, { headers: headers(authorized) }), { params: Promise.resolve({ id }) });
}

async function erase(body: unknown, authorized = true) {
  const route = await import("@/app/api/admin/writer/erase/route");
  return route.POST(
    new Request("https://example.test/api/admin/writer/erase", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers(authorized) },
      body: JSON.stringify(body),
    }),
  );
}

let fullSession: string;
let quietSession: string;
let enSession: string;
let primarySubmission: string;
let failedSubmission: string;
let enSubmission: string;

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  process.env.ADMIN_USERNAME = "admin";
  process.env.ADMIN_PASSWORD = "test-password-only";
  process.env.ADMIN_SECRET_KEY = "test-admin-secret";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;

  store = await import("@/lib/writer/store");
  const db = await import("@/lib/admin/db");
  raw = () => db.getAdminDb();
  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability(db.getAdminDb());

  const auth = await import("@/lib/admin/auth");
  adminToken = auth.createAdminToken("admin");

  const trail: WriterEventName[] = [
    "writer_opened",
    "writer_started",
    "writer_reached_email_threshold",
    "writer_reached_exam_minimum",
    "writer_submit_started",
    "writer_analysis_succeeded",
    "writer_result_shown",
    "writer_email_sent",
  ];
  fullSession = seedSession({ events: trail, activeMs: 1_200_000, elapsedMs: 1_500_000 });
  quietSession = seedSession({
    openedAt: hoursAgo(6),
    events: ["writer_opened", "writer_started"],
    wordCount: 61,
    activeMs: 240_000,
    elapsedMs: 400_000,
    silent: true,
  });
  enSession = seedSession({ locale: "en", taskId: "cotas-usp-2023-2", events: ["writer_opened"] });

  primarySubmission = seedSubmission({ sessionId: fullSession, status: "completed" });
  failedSubmission = seedSubmission({
    sessionId: quietSession,
    status: "failed_analysis",
    email: "quiet@example.com",
    wordCount: 61,
    errorCode: "=cmd|'/s'",
  });
  enSubmission = seedSubmission({
    sessionId: enSession,
    locale: "en",
    taskId: "cotas-usp-2023-2",
    status: "completed",
    email: "english@example.net",
    wordCount: 200,
  });

  const { saveWriterArchive, writerArchiveRoot } = await import("@/lib/writer/archive");
  const relative = saveWriterArchive({
    id: primarySubmission,
    savedAt: hoursAgo(3),
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    wordCount: 150,
    text: ESSAY_MARK,
    analysis: null,
    meta: null,
    timing: { activeMs: 1_200_000, elapsedMs: 1_500_000 },
  });
  store.setArchiveResult(primarySubmission, "ok", relative);
  expect(fs.existsSync(path.join(writerArchiveRoot(), relative))).toBe(true);

  const report = store.createReport(primarySubmission, "hash-primary", 30);
  store.markReportOpened(report.id, hoursAgo(2));
  store.createDelivery({ submissionId: primarySubmission, recipient: "maria.gomes@example.com", provider: "resend", status: "pending" });
  store.markDeliverySent(primarySubmission, "msg_primary");
  store.createDelivery({ submissionId: enSubmission, recipient: "english@example.net", provider: "resend", status: "pending" });
  store.markDeliveryFailed(enSubmission, "provider 503");
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  }
});

describe("доступ к writer-аналитике в админке", () => {
  it("ни один маршрут не отдаёт данные без токена", async () => {
    const responses = await Promise.all([
      getOverview("", false),
      getSubmissions("", false),
      getExport("kind=submissions", false),
      getDetail(primarySubmission, false),
      erase({ submissionId: primarySubmission }, false),
    ]);
    for (const response of responses) expect(response.status).toBe(401);
    expect(store.getSubmission(primarySubmission)).toBeTruthy();
  });

  it("нераспознанный фильтр даёт 400 с причиной, а не молча игнорируется", async () => {
    const badLocale = await json(await getOverview("locale=de"));
    expect(badLocale.errorCode).toBe("bad_filters");
    expect(String(badLocale.problems[0])).toContain("locale");

    expect((await getSubmissions("taskId=nope-2020-1")).status).toBe(400);
    expect((await getExport("kind=funnel&status=invented")).status).toBe(400);
    expect((await getOverview("from=2026-09-20&to=2026-09-10")).status).toBe(400);

    const noId = await json(await erase({ nope: 1 }));
    expect(noId.errorCode).toBe("bad_request");
  });

  it("overview считает KPI и воронку за окно и попутно помечает заброшенные сессии", async () => {
    const response = await getOverview("");
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    const payload = await json(response);
    expect(payload.ok).toBe(true);
    expect(payload.kpis.sessions).toBe(3);
    expect(payload.kpis.uniqueVisitors).toBe(3);
    expect(payload.kpis.analyzedOk).toBe(2);
    expect(payload.kpis.analyzedFailed).toBe(1);
    expect(payload.kpis.emailsSent).toBe(1);
    expect(payload.kpis.emailFailures).toBe(1);
    expect(payload.kpis.reportsOpened).toBe(1);
    expect(payload.kpis.medianActiveMs).toBe(900_000);

    // Only the silent session was writing and quiet for over 30 minutes: the tab reads trigger it.
    expect(payload.abandonedMarked).toBe(1);
    expect(payload.kpis.abandoned).toBe(1);
    expect(store.getSession(quietSession)?.status).toBe("abandoned");
    expect(store.getSession(fullSession)?.status).toBe("writing");
    const again = await json(await getOverview(""));
    expect(again.abandonedMarked).toBe(0);

    const steps = Object.fromEntries((payload.funnel as Json[]).map((row) => [row.key, row]));
    expect(steps.opened.count).toBe(3);
    expect(steps.started.count).toBe(2);
    expect(steps.email_gate.count).toBe(1);
    expect(steps.exam_min.count).toBe(1);
    expect(steps.submitted.count).toBe(1);
    expect(steps.analyzed.count).toBe(2);
    expect(steps.email_sent.count).toBe(1);
    expect(steps.report_opened.count).toBe(1);
    expect(steps.opened.fromPrev).toBeNull();
    expect(steps.opened.fromOpened).toBe(100);
    expect(steps.started.fromPrev).toBe(66.7);

    expect((payload.breakdowns.byDay as Json[]).length).toBeGreaterThan(0);
    const text = JSON.stringify(payload);
    expect(text).not.toContain(ESSAY_MARK);
    expect(text).not.toContain("maria.gomes@example.com");
  });

  it("один и тот же фильтр сужает сводки и список одинаково", async () => {
    const en = await json(await getOverview("locale=en"));
    expect(en.kpis.sessions).toBe(1);
    expect(en.kpis.analyzedOk).toBe(1);

    const enList = await json(await getSubmissions("locale=en"));
    expect(enList.total).toBe(1);
    expect(enList.submissions[0].id).toBe(enSubmission);

    const abandoned = await json(await getSubmissions("sessionStatus=abandoned"));
    expect(abandoned.submissions.map((row: Json) => row.id)).toEqual([failedSubmission]);

    expect((await json(await getSubmissions("mock=real"))).total).toBe(3);
    const sent = await json(await getSubmissions("delivery=sent"));
    expect(sent.submissions.map((row: Json) => row.id)).toEqual([primarySubmission]);
    const nothing = await json(await getSubmissions("delivery=none"));
    expect(nothing.submissions.map((row: Json) => row.id)).toEqual([failedSubmission]);

    const crossFilter = await json(await getSubmissions("taskId=cotas-usp-2023-2&locale=pt-br"));
    expect(crossFilter.total).toBe(0);

    const lastWeek = new Date(FIXED_NOW - 7 * 24 * 3_600_000).toISOString().slice(0, 10);
    const stale = await json(await getSubmissions(`from=${lastWeek}&to=${lastWeek}`));
    expect(stale.total).toBe(0);
  });

  it("в списке адрес замаскирован, а текста эссе нет", async () => {
    const payload = await json(await getSubmissions(""));
    expect(payload.returned).toBe(3);
    expect(payload.total).toBe(3);

    const text = JSON.stringify(payload);
    expect(text).not.toContain(ESSAY_MARK);
    expect(text).not.toContain("maria.gomes@example.com");

    const row = payload.submissions.find((item: Json) => item.id === primarySubmission);
    expect(row.email_masked).toMatch(/^ma\*+@example\.com$/);
    expect(row.email_domain).toBe("example.com");
    expect(row.delivery_status).toBe("sent");
    expect(row.delivery_attempts).toBe(1);
    expect(row.report_open_count).toBe(1);
    expect(row.active_ms).toBe(1_200_000);
    expect(row.archive_status).toBe("ok");
    expect(row).not.toHaveProperty("essay_text");
    expect(row).not.toHaveProperty("email");
    expect(row).not.toHaveProperty("analysis_json");

    const limited = await json(await getSubmissions("limit=2"));
    expect(limited.returned).toBe(2);
    expect(limited.total).toBe(3);
  });
});

describe("карточка одной отправки", () => {
  it("по uuid отдаёт сессию, события, отчёт, доставку и разбор ошибок", async () => {
    const response = await getDetail(primarySubmission);
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const payload = await json(response);

    expect(payload.ok).toBe(true);
    expect(payload.submission.email_masked).toMatch(/^ma\*+@example\.com$/);
    expect(payload.submission.celpe_level).toBe("intermediario");
    expect(payload.submission.essay_text).toContain(ESSAY_MARK);
    // The card is opened for one candidate at a time, so it carries the real address exactly as
    // it was typed; the list above and the CSV below keep the mask.
    expect(payload.submission.email).toBe(ADDRESS);
    expect(payload.submission).not.toHaveProperty("email_normalized");
    expect(payload.submission).not.toHaveProperty("analysis_json");
    expect(payload.submission).not.toHaveProperty("scores_json");

    expect(payload.session.id).toBe(fullSession);
    expect(payload.session.active_ms).toBe(1_200_000);
    const names = (payload.events as Json[]).map((event) => event.event_name);
    expect(names).toContain("writer_submit_started");
    expect(names).toContain("writer_email_sent");
    expect(payload.events[0].occurred_at).toBeTruthy();

    expect(payload.result.corrections).toBe(3);
    expect(payload.result.byCategory).toEqual({ grammar: 2, spelling: 1 });
    expect(payload.result.scores).toEqual({ grammar: 7, cohesion: 6 });
    expect(payload.result.level).toBe("intermediario");

    expect(payload.report.open_count).toBe(1);
    expect(payload.report.expired).toBe(false);
    expect(payload.report).not.toHaveProperty("token_hash");

    expect(payload.delivery.status).toBe("sent");
    expect(payload.delivery.provider).toBe("resend");
    expect(JSON.stringify(payload)).toContain(ADDRESS);
  });

  it("отправка без сессии и без письма читается, а не падает", async () => {
    const loose = seedSubmission({ sessionId: null, status: "completed", email: "loose@example.com" });
    const payload = await json(await getDetail(loose));
    expect(payload.session).toBeNull();
    expect(payload.events).toEqual([]);
    expect(payload.report).toBeNull();
    expect(payload.delivery).toBeNull();
    expect(payload.submission.email_masked).toContain("@example.com");
    expect(payload.result.corrections).toBe(3);
  });

  it("неизвестный или подставной id — 404, а не 500", async () => {
    expect((await getDetail(uuid())).status).toBe(404);
    const traversal = await getDetail("../../etc/passwd");
    expect(traversal.status).toBe(404);
    expect((await json(traversal)).errorCode).toBe("not_found");
  });
});

describe("выгрузка CSV", () => {
  it("файл-вложение: BOM, заголовки и только маски адресов, без текста эссе", async () => {
    const response = await getExport("kind=submissions");
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/csv");
    expect(response.headers.get("Content-Disposition")).toContain('attachment; filename="writer-submissions-');
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    // response.text() would silently drop the BOM, so the file is read as bytes.
    const bytes = new Uint8Array(await response.arrayBuffer());
    expect([bytes[0], bytes[1], bytes[2]]).toEqual([0xef, 0xbb, 0xbf]);
    const body = Buffer.from(bytes).toString("utf8");
    const [header, ...lines] = body.slice(1).trimEnd().split("\r\n");
    expect(header).toBe(
      "id,created_at,completed_at,locale,task_id,word_count,status,celpe_level,provider,model,mock," +
        "analysis_duration_ms,active_ms,elapsed_ms,email_masked,email_domain,delivery_status," +
        "delivery_attempts,sent_at,report_open_count,report_first_opened_at,archive_status,archive_path,error_code",
    );

    const listed = await json(await getSubmissions(""));
    expect(lines).toHaveLength(listed.returned);
    expect(body).not.toContain(ESSAY_MARK);
    expect(body).not.toContain("maria.gomes@example.com");
    expect(body).toContain("ma*");
    expect(body).toContain(primarySubmission);
  });

  it("ячейку, которую таблица исполнила бы как формулу, обезвреживают", async () => {
    const { toCsv } = await import("@/lib/writer/admin-query");
    const csv = toCsv(
      [{ code: '=HYPERLINK("http://evil.test")', note: "@someone", dash: "-2", plain: "ok", empty: null }],
      ["code", "note", "dash", "plain", "empty"],
    );
    const [, row] = csv.trimEnd().split("\r\n");
    expect(row.startsWith("\"'=HYPERLINK(")).toBe(true);
    expect(row).toContain("'@someone");
    expect(row).toContain("'-2");
    expect(row.endsWith("ok,")).toBe(true);

    const body = await (await getExport("kind=submissions")).text();
    // failedSubmission stores error_code "=cmd|'/s'": it may only leave the server guarded.
    expect(body).toContain(",'=cmd|'/s'");
    expect(body).not.toContain(",=cmd");
  });

  it("funnel выгружается по дням и уважает те же фильтры", async () => {
    const pt = await getExport("kind=funnel&locale=pt-br");
    expect(pt.status).toBe(200);
    const ptBytes = new Uint8Array(await pt.arrayBuffer());
    expect([ptBytes[0], ptBytes[1], ptBytes[2]]).toEqual([0xef, 0xbb, 0xbf]);
    const ptBody = Buffer.from(ptBytes).toString("utf8");
    const [header, ...lines] = ptBody.slice(1).trimEnd().split("\r\n");
    expect(header).toContain("day");
    expect(header).toContain("sessions");
    expect(lines.length).toBeGreaterThanOrEqual(1);
    for (const line of lines) expect(line).toMatch(/^\d{4}-\d{2}-\d{2},/);

    const enBytes = new Uint8Array(await (await getExport("kind=funnel&locale=en")).arrayBuffer());
    const enLines = Buffer.from(enBytes).toString("utf8").slice(1).trimEnd().split("\r\n").slice(1);
    expect(enLines).toHaveLength(1);
    expect(enLines[0]).toMatch(/^\d{4}-\d{2}-\d{2},1,1,/);
  });
});

describe("стирание данных по запросу кандидата", () => {
  it("erase убирает строки, файл копии и запись старого справочника", async () => {
    const doomedSession = seedSession({ events: ["writer_opened", "writer_started"] });
    const doomed = seedSubmission({ sessionId: doomedSession, status: "completed", email: "doomed@example.com" });
    const { saveWriterArchive, writerArchiveRoot } = await import("@/lib/writer/archive");
    const relative = saveWriterArchive({
      id: doomed,
      savedAt: hoursAgo(1),
      locale: "pt-br",
      taskId: "mandacaru-2025-2",
      wordCount: 150,
      text: ESSAY_MARK,
      analysis: null,
      meta: null,
      timing: { activeMs: 1, elapsedMs: 2 },
    });
    store.setArchiveResult(doomed, "ok", relative);
    store.createReport(doomed, "hash-doomed", 30);
    store.createDelivery({ submissionId: doomed, recipient: "doomed@example.com", provider: null, status: "pending" });
    raw().prepare(`INSERT INTO writing_emails (email, last_task_id) VALUES (?, 'mandacaru-2025-2')`).run("doomed@example.com");
    const file = path.join(writerArchiveRoot(), relative);
    expect(fs.existsSync(file)).toBe(true);

    const payload = await json(await erase({ submissionId: doomed }));
    expect(payload.ok).toBe(true);
    expect(payload.removed).toEqual({
      submission: 1,
      report: 1,
      delivery: 1,
      events: 2,
      session: 1,
      emails: 1,
      archiveFile: true,
    });

    expect(store.getSubmission(doomed)).toBeUndefined();
    expect(store.getSession(doomedSession)).toBeUndefined();
    expect(fs.existsSync(file)).toBe(false);
    const left = raw().prepare(`SELECT COUNT(*) AS c FROM writing_emails WHERE lower(email) = ?`).get("doomed@example.com") as { c: number };
    expect(left.c).toBe(0);

    const list = await json(await getSubmissions(""));
    expect(list.submissions.map((row: Json) => row.id)).not.toContain(doomed);
    expect((await getDetail(doomed)).status).toBe(404);
  });

  it("erase не трогает соседние отправки и требует существующий id", async () => {
    const before = await json(await getSubmissions(""));
    const missing = await json(await erase({ submissionId: uuid() }));
    expect(missing.errorCode).toBe("not_found");

    const after = await json(await getSubmissions(""));
    expect(after.total).toBe(before.total);
    expect(store.getSubmission(primarySubmission)).toBeTruthy();
    expect(store.getSubmission(enSubmission)).toBeTruthy();
    expect(store.getReportForSubmission(primarySubmission)?.token_hash).toBe("hash-primary");
    expect(store.getDeliveryForSubmission(primarySubmission)?.status).toBe("sent");
  });

  it("перезапись в одной сессии: стирание одной отправки не ослепляет вторую", async () => {
    const shared = seedSession({ events: ["writer_opened", "writer_resubmitted"] });
    const kept = seedSubmission({ sessionId: shared, status: "completed", email: "kept@example.com" });
    const removed = seedSubmission({ sessionId: shared, status: "completed", email: "gone@example.com" });
    store.createReport(kept, "hash-kept", 30);
    store.createReport(removed, "hash-gone", 30);
    store.createDelivery({ submissionId: kept, recipient: "kept@example.com", provider: null, status: "pending" });

    const payload = await json(await erase({ submissionId: removed }));
    expect(payload.removed).toEqual({
      submission: 1,
      report: 1,
      delivery: 0,
      events: 0,
      session: 0,
      emails: 0,
      archiveFile: false,
    });

    const detail = await json(await getDetail(kept));
    expect(detail.session.id).toBe(shared);
    expect(detail.events).toHaveLength(2);
    expect(store.getReportForSubmission(kept)?.token_hash).toBe("hash-kept");
    expect(store.getDeliveryForSubmission(kept)?.status).toBe("pending");
  });
});
