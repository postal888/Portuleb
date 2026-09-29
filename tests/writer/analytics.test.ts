import { beforeAll, describe, expect, it, afterAll } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import type { WriterFilters } from "@/lib/writer/analytics";
import type { WriterEventInput, WriterContext } from "@/lib/writer/events";
import type { SubmissionStatus, WriterEventName } from "@/lib/writer/types";

const temp = createTempDb("analytics");

type AnalyticsModule = typeof import("@/lib/writer/analytics");
type StoreModule = typeof import("@/lib/writer/store");
type DbModule = typeof import("@/lib/admin/db");

let analytics: AnalyticsModule;
let store: StoreModule;
let raw: () => import("better-sqlite3").Database;

beforeAll(async () => {
  analytics = await import("@/lib/writer/analytics");
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

const RANGE = { sinceIso: "2026-09-19T00:00:00.000Z", untilIso: "2026-09-23T00:00:00.000Z" };

function filters(overrides: Partial<WriterFilters> = {}): WriterFilters {
  return { ...RANGE, ...overrides };
}

type SessionSeed = {
  id: string;
  visitorId: string;
  locale: string;
  taskId: string;
  openedAt: string;
  status?: string;
  activeMs?: number;
  elapsedMs?: number;
  referrer?: string;
  utm?: [string, string, string];
};

function addSession(seed: SessionSeed) {
  raw()
    .prepare(
      `INSERT INTO writer_sessions
         (id, visitor_id, locale, path, initial_task_id, current_task_id, referrer,
          utm_source, utm_medium, utm_campaign, status, opened_at, last_activity_at,
          active_ms, elapsed_ms, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    )
    .run(
      seed.id,
      seed.visitorId,
      seed.locale,
      `/${seed.locale}/escrever`,
      seed.taskId,
      seed.taskId,
      seed.referrer ?? null,
      seed.utm?.[0] ?? null,
      seed.utm?.[1] ?? null,
      seed.utm?.[2] ?? null,
      seed.status ?? "opened",
      seed.openedAt,
      seed.openedAt,
      seed.activeMs ?? 0,
      seed.elapsedMs ?? 0,
      seed.openedAt,
      seed.openedAt,
    );
  return seed;
}

function addEvents(
  sessionId: string,
  locale: WriterContext["locale"],
  taskId: NonNullable<WriterContext["taskId"]>,
  at: string,
  names: WriterEventName[],
) {
  for (const name of names) {
    store.insertWriterEvent(
      {
        eventId: uuid(),
        sessionId,
        visitorId: uuid(),
        event: name,
        occurredAt: at,
        wordCount: name.includes("threshold") ? 41 : 150,
      },
      { locale, path: `/${locale}/escrever`, taskId },
      Date.parse(at),
    );
  }
}

type SubmissionSeed = {
  id: string;
  sessionId: string;
  email: string;
  locale: string;
  taskId: string;
  createdAt: string;
  status: SubmissionStatus;
  wordCount?: number;
  errorCode?: string;
  provider?: string;
  model?: string;
  mock?: boolean;
};

function addSubmission(seed: SubmissionSeed) {
  store.createSubmission({
    id: seed.id,
    sessionId: seed.sessionId,
    email: seed.email,
    locale: seed.locale,
    taskId: seed.taskId,
    text: "Texto de teste para analytics.",
    wordCount: seed.wordCount ?? 150,
  });
  raw()
    .prepare(`UPDATE writing_submissions SET created_at = ?, updated_at = ? WHERE id = ?`)
    .run(seed.createdAt, seed.createdAt, seed.id);

  if (seed.status === "completed") {
    store.completeSubmission(seed.id, {
      analysisJson: "{}",
      celpeLevel: "intermediario",
      scoresJson: null,
      provider: seed.provider ?? "openai",
      model: seed.model ?? "gpt-4.1-mini",
      mock: seed.mock ?? false,
      analysisDurationMs: 4200,
    });
  } else {
    store.setSubmissionStatus(seed.id, seed.status, { code: seed.errorCode ?? "analysis_error", message: "boom" });
  }
  raw()
    .prepare(`UPDATE writing_submissions SET completed_at = ? WHERE id = ?`)
    .run(seed.status === "completed" ? seed.createdAt : null, seed.id);
  return seed;
}

/* ------------------------------------------------------------------ fixtures */

// v1 opens twice in pt-br on two different days; v2 writes in en and fails;
// v3 is outside the date window and must never leak into the numbers.
let sessA: SessionSeed;
let sessB: SessionSeed;
let sessC: SessionSeed;
let subA: SubmissionSeed;
let subB: SubmissionSeed;

beforeAll(() => {
  sessA = addSession({
    id: uuid(),
    visitorId: "visitor-1",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    openedAt: "2026-09-20T10:00:00.000Z",
    status: "completed",
    activeMs: 600_000,
    elapsedMs: 900_000,
    referrer: "https://google.com",
    utm: ["telegram", "social", "celpe"],
  });
  sessB = addSession({
    id: uuid(),
    visitorId: "visitor-1",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    openedAt: "2026-09-21T10:00:00.000Z",
    status: "completed",
    activeMs: 1_800_000,
    elapsedMs: 2_000_000,
  });
  sessC = addSession({
    id: uuid(),
    visitorId: "visitor-2",
    locale: "en",
    taskId: "cotas-usp-2023-2",
    openedAt: "2026-09-21T11:00:00.000Z",
    status: "abandoned",
    activeMs: 120_000,
    elapsedMs: 400_000,
  });
  addSession({
    id: uuid(),
    visitorId: "visitor-3",
    locale: "ru",
    taskId: "mandacaru-2025-2",
    openedAt: "2026-09-26T10:00:00.000Z",
    status: "writing",
    activeMs: 300_000,
    elapsedMs: 300_000,
  });

  const fullPath: WriterEventName[] = [
    "writer_opened",
    "writer_started",
    "writer_reached_email_threshold",
    "writer_reached_exam_minimum",
    "writer_submit_started",
  ];

  addEvents(sessA.id, "pt-br", "mandacaru-2025-2", "2026-09-20T10:05:00.000Z", fullPath);
  addEvents(sessB.id, "pt-br", "mandacaru-2025-2", "2026-09-21T10:05:00.000Z", fullPath);
  addEvents(sessC.id, "en", "cotas-usp-2023-2", "2026-09-21T11:05:00.000Z", [
    "writer_opened",
    "writer_started",
    "writer_reached_email_threshold",
  ]);

  subA = addSubmission({
    id: uuid(),
    sessionId: sessA.id,
    email: "Ana.Silva@Example.com",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    createdAt: "2026-09-20T10:10:00.000Z",
    status: "completed",
  });
  subB = addSubmission({
    id: uuid(),
    sessionId: sessB.id,
    email: "ana.silva@example.com",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    createdAt: "2026-09-21T10:10:00.000Z",
    status: "completed",
    provider: "mock",
    model: "mock-local",
    mock: true,
  });
  addSubmission({
    id: uuid(),
    sessionId: sessC.id,
    email: "bob@example.org",
    locale: "en",
    taskId: "cotas-usp-2023-2",
    createdAt: "2026-09-21T11:10:00.000Z",
    status: "failed_analysis",
    errorCode: "timeout",
  });

  const reportA = store.createReport(subA.id, "hash-a", 30);
  store.markReportOpened(reportA.id, "2026-09-20T12:00:00.000Z");
  store.createReport(subB.id, "hash-b", 30);
  store.createDelivery({ submissionId: subA.id, recipient: "ana.silva@example.com", provider: "resend", status: "pending" });
  store.markDeliverySent(subA.id, "msg_1");
  store.createDelivery({ submissionId: subB.id, recipient: "ana.silva@example.com", provider: "resend", status: "pending" });
  store.markDeliveryFailed(subB.id, "smtp 550 rejected");
});

/* ---------------------------------------------------------------- funnel */

describe("воронка writer", () => {
  const funnel = () => Object.fromEntries(analytics.getWriterFunnel(filters()).map((row) => [row.key, row]));

  it("считает шаги по уникальным сессиям и не завышает повторы", () => {
    const steps = funnel();
    expect(steps.opened.count).toBe(3);
    expect(steps.started.count).toBe(3);
    expect(steps.email_gate.count).toBe(3);
    expect(steps.exam_min.count).toBe(2);
    expect(steps.submitted.count).toBe(2);
    expect(steps.analyzed.count).toBe(2);
    expect(steps.email_sent.count).toBe(1);
    expect(steps.report_opened.count).toBe(1);
  });

  it("идемпотентность: повторный beacon с тем же eventId не меняет воронку", () => {
    const dupe = {
      eventId: "00000000-0000-4000-8000-000000000001",
      sessionId: sessA.id,
      visitorId: "00000000-0000-4000-8000-000000000002",
      event: "writer_submit_started",
      occurredAt: "2026-09-20T10:09:00.000Z",
    } satisfies WriterEventInput;
    const first = store.insertWriterEvent(dupe, { locale: "pt-br", path: "/pt-br/escrever", taskId: "mandacaru-2025-2" }, Date.parse(dupe.occurredAt));
    const second = store.insertWriterEvent(dupe, { locale: "pt-br", path: "/pt-br/escrever", taskId: "mandacaru-2025-2" }, Date.parse(dupe.occurredAt));
    expect(first.inserted).toBe(true);
    expect(second.inserted).toBe(false);
    expect(funnel().submitted.count).toBe(2);
  });

  it("шаги монотонны и проценты считаются от предыдущего шага", () => {
    const rows = analytics.getWriterFunnel(filters());
    const counts = rows.map((row) => row.count);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
    expect(rows[0].fromPrev).toBeNull();
    expect(rows[3].fromPrev).toBe(66.7);
    expect(rows[3].fromOpened).toBe(66.7);
    expect(rows[0].fromOpened).toBe(100);
  });

  it("нулевой шаг не даёт NaN", () => {
    const rows = analytics.getWriterFunnel(filters({ taskId: "nonexistent-task" }));
    for (const row of rows) {
      expect(row.count).toBe(0);
      expect(Number.isFinite(row.fromOpened ?? 0)).toBe(true);
      expect(row.fromPrev === null || Number.isFinite(row.fromPrev)).toBe(true);
    }
  });
});

/* ---------------------------------------------------------------- filters */

describe("фильтры не смешивают данные", () => {
  it("locale=pt-br исключает en", () => {
    const steps = Object.fromEntries(analytics.getWriterFunnel(filters({ locale: "pt-br" })).map((r) => [r.key, r.count]));
    expect(steps.opened).toBe(2);
    expect(steps.analyzed).toBe(2);
    expect(steps.email_sent).toBe(1);
  });

  it("locale=en показывает старт без отправкок", () => {
    const steps = Object.fromEntries(analytics.getWriterFunnel(filters({ locale: "en" })).map((r) => [r.key, r.count]));
    expect(steps.opened).toBe(1);
    expect(steps.started).toBe(1);
    expect(steps.submitted).toBe(0);
    expect(steps.analyzed).toBe(0);
  });

  it("taskId фильтрует и сессии, и отправки", () => {
    const kpis = analytics.getWriterKpis(filters({ taskId: "cotas-usp-2023-2" }));
    expect(kpis.sessions).toBe(1);
    expect(kpis.analyzedOk).toBe(0);
    expect(kpis.analyzedFailed).toBe(1);
    expect(kpis.abandoned).toBe(1);
  });

  it("дата вне окна не попадает в выборку", () => {
    const ru = analytics.getWriterKpis(filters({ locale: "ru" }));
    expect(ru.sessions).toBe(0);
    const widened = analytics.getWriterKpis({ sinceIso: "2026-09-25T00:00:00.000Z", untilIso: "2026-09-27T00:00:00.000Z", locale: "ru" });
    expect(widened.sessions).toBe(1);
  });

  it("mock/real и статус доставки фильтруют отправки", () => {
    expect(analytics.listWriterSubmissions(filters({ mock: "real" }))).toHaveLength(2);
    expect(analytics.listWriterSubmissions(filters({ mock: "mock" }))).toHaveLength(1);
    expect(analytics.listWriterSubmissions(filters({ status: "completed" }))).toHaveLength(2);
    expect(analytics.listWriterSubmissions(filters({ deliveryStatus: "failed" }))).toHaveLength(1);
    expect(analytics.listWriterSubmissions(filters({ locale: "en" }))).toHaveLength(1);
    expect(analytics.listWriterSubmissions(filters({ taskId: "mandacaru-2025-2" }))).toHaveLength(2);
  });
});

/* ------------------------------------------------------------------ kpis */

describe("KPI", () => {
  it("считает уникальных посетителей и сессии раздельно", () => {
    const kpis = analytics.getWriterKpis(filters());
    expect(kpis.uniqueVisitors).toBe(2);
    expect(kpis.sessions).toBe(3);
    expect(kpis.submitAttempts).toBe(2);
    expect(kpis.reportsOpened).toBe(1);
    expect(kpis.emailFailures).toBe(1);
  });

  it("конверсии — это проценты, а не доли", () => {
    const kpis = analytics.getWriterKpis(filters());
    expect(kpis.conversionOpenedToStarted).toBe(100);
    expect(kpis.conversionStartedToSubmitted).toBe(66.7);
    expect(kpis.conversionSubmittedToCompleted).toBe(100);
    expect(kpis.conversionEmailSentToReportOpened).toBe(100);
  });

  it("медиана времени активна уважает фильтр по locale", () => {
    const all = analytics.getWriterKpis(filters());
    expect(all.medianActiveMs).toBe(600_000);
    expect(all.p75ActiveMs).toBe(1_800_000);
    const pt = analytics.getWriterKpis(filters({ locale: "pt-br" }));
    expect(pt.medianActiveMs).toBe(600_000);
    const en = analytics.getWriterKpis(filters({ locale: "en" }));
    expect(en.medianActiveMs).toBeNull();
  });

  it("скорость письма считается по активным минутам", () => {
    const pt = analytics.getWriterKpis(filters({ locale: "pt-br" }));
    // 150 слов за 10 минут и за 30 минут: медиана по ближайшему рангу берёт нижнее значение.
    expect(pt.medianWordsPerMinute).toBe(5);
  });
});

/* ------------------------------------------------------------ breakdowns */

describe("разбивки", () => {
  it("по дням: ровно дни из фильтра", () => {
    const byDay = analytics.getWriterBreakdowns(filters()).byDay as { day: string; sessions: number; visitors: number }[];
    expect(byDay.map((row) => row.day)).toEqual(["2026-09-20", "2026-09-21"]);
    expect(byDay[1].sessions).toBe(2);
    expect(byDay[1].visitors).toBe(2);
  });

  it("по locale и задачам не содержат чужих строк", () => {
    const en = analytics.getWriterBreakdowns(filters({ locale: "en" })).byLocale as { locale: string }[];
    expect(en.map((row) => row.locale)).toEqual(["en"]);
    const tasks = analytics.getWriterBreakdowns(filters({ taskId: "cotas-usp-2023-2" })).byTask as { task: string }[];
    expect(tasks.map((row) => row.task)).toEqual(["cotas-usp-2023-2"]);
  });

  it("ошибки и модели фильтруются по тому же окну", () => {
    const errors = analytics.getWriterBreakdowns(filters()).byErrorCategory as { error_code: string; status: string; c: number }[];
    expect(errors).toEqual([{ error_code: "timeout", status: "failed_analysis", c: 1 }]);
    const models = analytics.getWriterBreakdowns(filters()).byModel as {
      provider: string;
      model: string;
      mock_runs: number;
      real_runs: number;
      runs: number;
    }[];
    expect(models.map((row) => `${row.provider}/${row.model}:${row.mock_runs}/${row.real_runs}`).sort()).toEqual([
      "mock/mock-local:1/0",
      "openai/gpt-4.1-mini:0/1",
      "—/—:0/1",
    ]);
    expect(analytics.getWriterBreakdowns(filters({ locale: "en" })).byModel).toHaveLength(1);
  });

  it("реферер и utm группируются", () => {
    const referrers = analytics.getWriterBreakdowns(filters()).byReferrer as { referrer: string; sessions: number }[];
    expect(referrers.find((row) => row.referrer === "https://google.com")?.sessions).toBe(1);
    expect(referrers.find((row) => row.referrer === "direct")?.sessions).toBe(2);
    const utm = analytics.getWriterBreakdowns(filters()).byUtm as { utm_source: string; sessions: number }[];
    expect(utm.map((row) => `${row.utm_source}:${row.sessions}`).sort()).toEqual(["telegram:1", "—:2"]);
  });
});

/* ------------------------------------------------------------ submissions */

describe("список отправок", () => {
  it("email маскируется, но домен остаётся для группировки", () => {
    const rows = analytics.listWriterSubmissions(filters({ locale: "pt-br" }));
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.email_masked).not.toContain("silva");
      expect(row.email_masked).toMatch(/^an\*+@example\.com$/);
      expect(row.email_domain).toBe("example.com");
    }
  });

  it("в списке есть тайминги сессии и статус доставки", () => {
    const [newest] = analytics.listWriterSubmissions(filters({ locale: "pt-br" }));
    expect(newest.active_ms).toBe(1_800_000);
    expect(newest.delivery_status).toBe("failed");
    expect(newest.delivery_attempts).toBe(1);
    expect(newest.report_open_count).toBe(0);
    expect(newest.analysis_duration_ms).toBe(4200);
  });

  it("limit ограничивает строки", () => {
    expect(analytics.listWriterSubmissions(filters(), 1)).toHaveLength(1);
  });

  it("csv по дням не смешивает дни", () => {
    const rows = analytics.getFunnelRowsForCsv(filters());
    expect(rows.map((row) => row.day)).toEqual(["2026-09-20", "2026-09-21"]);
    expect(rows[0].sessions).toBe(1);
    expect(rows[1].sessions).toBe(2);
    expect(rows[0].medianActiveMs).toBe(600_000);
    expect(rows[1].medianActiveMs).toBe(1_800_000);
  });
});

/* --------------------------------------------------------------- cascade */

describe("удаление PII", () => {
  it("каскад убирает отправку, отчёт, письмо и сессию", () => {
    const doomed = addSession({
      id: uuid(),
      visitorId: "visitor-9",
      locale: "pt-br",
      taskId: "mandacaru-2025-2",
      openedAt: "2026-09-22T10:00:00.000Z",
    });
    addEvents(doomed.id, "pt-br", "mandacaru-2025-2", "2026-09-22T10:01:00.000Z", ["writer_opened"]);
    const doomedSub = addSubmission({
      id: uuid(),
      sessionId: doomed.id,
      email: "wipe@example.com",
      locale: "pt-br",
      taskId: "mandacaru-2025-2",
      createdAt: "2026-09-22T10:02:00.000Z",
      status: "completed",
    });
    store.createReport(doomedSub.id, "hash-wipe", 30);
    store.createDelivery({ submissionId: doomedSub.id, recipient: "wipe@example.com", provider: null, status: "pending" });

    const counts = store.deleteSubmissionCascade(doomedSub.id);
    // emails=0: the new lifecycle never writes the legacy address book, so there is nothing to purge.
    expect(counts).toEqual({ submission: 1, report: 1, delivery: 1, events: 1, session: 1, emails: 0 });
    expect(store.getSubmission(doomedSub.id)).toBeUndefined();
    expect(store.getSession(doomed.id)).toBeUndefined();
    expect(analytics.listWriterSubmissions(filters()).some((row) => row.id === doomedSub.id)).toBe(false);
  });

  it("каскад чистит и старый справочник адресов, если он больше не нужен", () => {
    const legacy = addSession({
      id: uuid(),
      visitorId: "visitor-legacy",
      locale: "pt-br",
      taskId: "mandacaru-2025-2",
      openedAt: "2026-09-22T11:00:00.000Z",
    });
    const first = addSubmission({
      id: uuid(),
      sessionId: legacy.id,
      email: "Shared@example.com",
      locale: "pt-br",
      taskId: "mandacaru-2025-2",
      createdAt: "2026-09-22T11:01:00.000Z",
      status: "completed",
    });
    const second = addSubmission({
      id: uuid(),
      sessionId: addSession({
        id: uuid(),
        visitorId: "visitor-legacy-2",
        locale: "pt-br",
        taskId: "mandacaru-2025-2",
        openedAt: "2026-09-22T11:02:00.000Z",
      }).id,
      email: "shared@example.com",
      locale: "pt-br",
      taskId: "mandacaru-2025-2",
      createdAt: "2026-09-22T11:03:00.000Z",
      status: "completed",
    });

    // The address book was filled by the old flow only; the new tables never touch it.
    raw().prepare(`INSERT INTO writing_emails (email, last_task_id) VALUES (?, 'mandacaru-2025-2')`).run("shared@example.com");
    const addressBook = () =>
      (raw().prepare(`SELECT COUNT(*) AS c FROM writing_emails WHERE lower(email) = ?`).get("shared@example.com") as { c: number }).c;

    expect(store.deleteSubmissionCascade(first.id).emails).toBe(0);
    expect(addressBook()).toBe(1);

    expect(store.deleteSubmissionCascade(second.id).emails).toBe(1);
    expect(addressBook()).toBe(0);
  });
});
