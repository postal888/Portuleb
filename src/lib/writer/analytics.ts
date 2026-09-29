import { getAdminDb } from "@/lib/admin/db";
import {
  getDeliveryForSubmission,
  getReportForSubmission,
  getSession,
  getSubmission,
  listSessionEvents,
  maskEmail,
} from "./store";
import { percentile, wordsPerActiveMinute } from "./time";
import type { WriterEventName, WriterSessionRow } from "./types";

export type WriterFilters = {
  sinceIso: string;
  untilIso: string;
  locale?: string;
  taskId?: string;
  status?: string;
  deliveryStatus?: string;
  sessionStatus?: string;
  provider?: string;
  model?: string;
  mock?: "all" | "real" | "mock";
};

export type SubmissionListItem = {
  id: string;
  created_at: string;
  completed_at: string | null;
  session_id: string | null;
  locale: string;
  task_id: string | null;
  word_count: number;
  status: string;
  celpe_level: string | null;
  provider: string | null;
  model: string | null;
  mock: number;
  analysis_duration_ms: number | null;
  active_ms: number | null;
  elapsed_ms: number | null;
  archive_status: string | null;
  archive_path: string | null;
  archive_error: string | null;
  error_code: string | null;
  error_message: string | null;
  email_masked: string;
  email_domain: string;
  delivery_status: string | null;
  delivery_attempts: number | null;
  sent_at: string | null;
  report_open_count: number | null;
  report_first_opened_at: string | null;
};

function sessionWhere(filters: WriterFilters) {
  const clauses = [`s.opened_at BETWEEN @since AND @until`];
  const params: Record<string, unknown> = { since: filters.sinceIso, until: filters.untilIso };

  if (filters.locale) {
    clauses.push("s.locale = @locale");
    params.locale = filters.locale;
  }
  if (filters.taskId) {
    clauses.push("s.current_task_id = @taskId");
    params.taskId = filters.taskId;
  }
  if (filters.sessionStatus) {
    clauses.push("s.status = @sessionStatus");
    params.sessionStatus = filters.sessionStatus;
  }
  return { where: clauses.join(" AND "), params };
}

/**
 * Every submission query joins its session as `s` so the session-side filters narrow the
 * same rows the funnel shows — otherwise a `sessionStatus` filter would move some steps only.
 */
function submissionWhere(filters: WriterFilters) {
  const clauses = [`sub.created_at BETWEEN @since AND @until`];
  const params: Record<string, unknown> = { since: filters.sinceIso, until: filters.untilIso };

  if (filters.locale) {
    clauses.push("sub.locale = @locale");
    params.locale = filters.locale;
  }
  if (filters.taskId) {
    clauses.push("sub.task_id = @taskId");
    params.taskId = filters.taskId;
  }
  if (filters.status) {
    clauses.push("sub.status = @status");
    params.status = filters.status;
  }
  if (filters.deliveryStatus === "none") {
    clauses.push("d.id IS NULL");
  } else if (filters.deliveryStatus) {
    clauses.push("d.status = @deliveryStatus");
    params.deliveryStatus = filters.deliveryStatus;
  }
  if (filters.sessionStatus) {
    clauses.push("s.status = @sessionStatus");
    params.sessionStatus = filters.sessionStatus;
  }
  if (filters.provider) {
    clauses.push("sub.provider = @provider");
    params.provider = filters.provider;
  }
  if (filters.model) {
    clauses.push("sub.model = @model");
    params.model = filters.model;
  }
  if (filters.mock === "real") clauses.push("sub.mock = 0");
  if (filters.mock === "mock") clauses.push("sub.mock = 1");

  return { where: clauses.join(" AND "), params };
}

function countDistinctSessionsByEvent(filters: WriterFilters, names: WriterEventName[]): number {
  if (!names.length) return 0;
  const { where, params } = sessionWhere(filters);
  const placeholders = names.map((name, index) => `@e${index}`);
  const eventParams = Object.fromEntries(names.map((name, index) => [`e${index}`, name]));

  const row = getAdminDb()
    .prepare(
      `SELECT COUNT(DISTINCT e.session_id) AS c
       FROM writer_events e
       JOIN writer_sessions s ON s.id = e.session_id
       WHERE ${where} AND e.event_name IN (${placeholders.join(",")})`,
    )
    .get({ ...params, ...eventParams }) as { c: number };
  return row.c;
}

function countSubmissions(filters: WriterFilters, statuses: string[]): number {
  if (!statuses.length) return 0;
  const { where, params } = submissionWhere({ ...filters, status: undefined });
  const placeholders = statuses.map((_, index) => `@st${index}`);
  const statusParams = Object.fromEntries(statuses.map((status, index) => [`st${index}`, status]));

  const row = getAdminDb()
    .prepare(
      `SELECT COUNT(*) AS c FROM writing_submissions sub
       LEFT JOIN email_deliveries d ON d.submission_id = sub.id
       LEFT JOIN writer_sessions s ON s.id = sub.session_id
       WHERE ${where} AND sub.status IN (${placeholders.join(",")})`,
    )
    .get({ ...params, ...statusParams }) as { c: number };
  return row.c;
}

function countDelivery(filters: WriterFilters, statuses: string[]): number {
  if (!statuses.length) return 0;
  const { where, params } = submissionWhere({ ...filters, status: undefined, deliveryStatus: undefined });
  const placeholders = statuses.map((_, index) => `@ds${index}`);
  const statusParams = Object.fromEntries(statuses.map((status, index) => [`ds${index}`, status]));

  const row = getAdminDb()
    .prepare(
      `SELECT COUNT(*) AS c FROM writing_submissions sub
       JOIN email_deliveries d ON d.submission_id = sub.id
       LEFT JOIN writer_sessions s ON s.id = sub.session_id
       WHERE ${where} AND d.status IN (${placeholders.join(",")})`,
    )
    .get({ ...params, ...statusParams }) as { c: number };
  return row.c;
}

function ratio(part: number, whole: number): number | null {
  if (!whole) return null;
  return Math.round((part / whole) * 1000) / 10;
}

export function getWriterFunnel(filters: WriterFilters) {
  const opened = countDistinctSessionsByEvent(filters, ["writer_opened"]);
  const started = countDistinctSessionsByEvent(filters, ["writer_started"]);
  const emailGate = countDistinctSessionsByEvent(filters, ["writer_reached_email_threshold"]);
  const examMin = countDistinctSessionsByEvent(filters, ["writer_reached_exam_minimum"]);
  const submitStarted = countDistinctSessionsByEvent(filters, ["writer_submit_started"]);
  const analyzed = countSubmissions(filters, ["completed"]);
  const emailSent = countDelivery(filters, ["sent"]);
  const reportOpened = reportOpenedCount(filters);

  const steps = [
    { key: "opened", label: "opened", count: opened },
    { key: "started", label: "started", count: started },
    { key: "email_gate", label: "40 words", count: emailGate },
    { key: "exam_min", label: "120 words", count: examMin },
    { key: "submitted", label: "submitted", count: submitStarted },
    { key: "analyzed", label: "analyzed", count: analyzed },
    { key: "email_sent", label: "email sent", count: emailSent },
    { key: "report_opened", label: "report opened", count: reportOpened },
  ];

  return steps.map((step, index) => ({
    ...step,
    fromPrev: index === 0 ? null : ratio(step.count, steps[index - 1].count),
    fromOpened: ratio(step.count, opened),
  }));
}

function reportOpenedCount(filters: WriterFilters): number {
  const { where, params } = submissionWhere({ ...filters, status: undefined, deliveryStatus: undefined });
  const row = getAdminDb()
    .prepare(
      `SELECT COUNT(*) AS c FROM writing_submissions sub
       JOIN writing_reports r ON r.submission_id = sub.id
       LEFT JOIN writer_sessions s ON s.id = sub.session_id
       WHERE ${where} AND r.first_opened_at IS NOT NULL`,
    )
    .get(params) as { c: number };
  return row.c;
}

export function getWriterKpis(filters: WriterFilters) {
  const { where, params } = sessionWhere(filters);
  const database = getAdminDb();

  const sessions = database
    .prepare(`SELECT COUNT(*) AS c FROM writer_sessions s WHERE ${where}`)
    .get(params) as { c: number };
  const visitors = database
    .prepare(`SELECT COUNT(DISTINCT s.visitor_id) AS c FROM writer_sessions s WHERE ${where}`)
    .get(params) as { c: number };
  const abandoned = database
    .prepare(`SELECT COUNT(*) AS c FROM writer_sessions s WHERE ${where} AND s.status = 'abandoned'`)
    .get(params) as { c: number };

  const started = countDistinctSessionsByEvent(filters, ["writer_started"]);
  const submitStarted = countDistinctSessionsByEvent(filters, ["writer_submit_started"]);
  const completed = countSubmissions(filters, ["completed"]);
  const failed = countSubmissions(filters, ["failed_validation", "failed_analysis", "failed_storage"]);
  const emailSent = countDelivery(filters, ["sent"]);
  const emailFailed = countDelivery(filters, ["failed"]);
  const resubmitted = countDistinctSessionsByEvent(filters, ["writer_resubmitted"]);
  const reportsOpened = reportOpenedCount(filters);

  const sessionFilter = sessionWhere(filters);
  const submissionFilter = submissionWhere({ ...filters, status: undefined, deliveryStatus: undefined });
  const timingRows = database
    .prepare(
      `SELECT s.active_ms AS active_ms, s.elapsed_ms AS elapsed_ms, sub.word_count AS word_count
       FROM writing_submissions sub
       JOIN writer_sessions s ON s.id = sub.session_id
       WHERE sub.status = 'completed' AND ${submissionFilter.where} AND ${sessionFilter.where}`,
    )
    .all({ ...submissionFilter.params, ...sessionFilter.params }) as {
    active_ms: number;
    elapsed_ms: number;
    word_count: number;
  }[];

  const activeList = timingRows.map((row) => row.active_ms).filter((value) => value > 0);
  const elapsedList = timingRows.map((row) => row.elapsed_ms).filter((value) => value > 0);
  const speedList = timingRows
    .map((row) => wordsPerActiveMinute(row.word_count, row.active_ms))
    .filter((value): value is number => value !== null && value > 0);

  return {
    uniqueVisitors: visitors.c,
    sessions: sessions.c,
    started,
    emailGate: countDistinctSessionsByEvent(filters, ["writer_reached_email_threshold"]),
    examMin: countDistinctSessionsByEvent(filters, ["writer_reached_exam_minimum"]),
    submitAttempts: submitStarted,
    analyzedOk: completed,
    analyzedFailed: failed,
    emailsSent: emailSent,
    emailFailures: emailFailed,
    reportsOpened,
    resubmissions: resubmitted,
    abandoned: abandoned.c,
    conversionOpenedToStarted: ratio(started, sessions.c),
    conversionStartedToSubmitted: ratio(submitStarted, started),
    conversionSubmittedToCompleted: ratio(completed, submitStarted),
    conversionEmailSentToReportOpened: ratio(reportsOpened, emailSent),
    medianActiveMs: percentile(activeList, 50),
    p75ActiveMs: percentile(activeList, 75),
    medianElapsedMs: percentile(elapsedList, 50),
    medianWordsPerMinute: percentile(speedList, 50),
  };
}

export function getWriterBreakdowns(filters: WriterFilters) {
  const database = getAdminDb();
  const { where, params } = sessionWhere(filters);

  const byDay = database
    .prepare(
      `SELECT substr(s.opened_at, 1, 10) AS day,
              COUNT(*) AS sessions,
              COUNT(DISTINCT s.visitor_id) AS visitors,
              SUM(CASE WHEN s.status IN ('completed','submitted') THEN 1 ELSE 0 END) AS reached_submit
       FROM writer_sessions s WHERE ${where} GROUP BY day ORDER BY day`,
    )
    .all(params) as Record<string, unknown>[];

  const byLocale = database
    .prepare(`SELECT s.locale AS locale, COUNT(*) AS sessions, COUNT(DISTINCT s.visitor_id) AS visitors
              FROM writer_sessions s WHERE ${where} GROUP BY s.locale ORDER BY sessions DESC`)
    .all(params) as Record<string, unknown>[];

  const byTask = database
    .prepare(`SELECT COALESCE(s.current_task_id,'—') AS task, s.locale AS locale, COUNT(*) AS sessions
              FROM writer_sessions s WHERE ${where} GROUP BY s.current_task_id, s.locale ORDER BY sessions DESC`)
    .all(params) as Record<string, unknown>[];

  const byReferrer = database
    .prepare(`SELECT COALESCE(NULLIF(s.referrer,''),'direct') AS referrer, COUNT(*) AS sessions
              FROM writer_sessions s WHERE ${where} GROUP BY referrer ORDER BY sessions DESC LIMIT 25`)
    .all(params) as Record<string, unknown>[];

  const byUtm = database
    .prepare(`SELECT COALESCE(NULLIF(s.utm_source,''),'—') AS utm_source,
                     COALESCE(NULLIF(s.utm_medium,''),'—') AS utm_medium,
                     COALESCE(NULLIF(s.utm_campaign,''),'—') AS utm_campaign,
                     COUNT(*) AS sessions
              FROM writer_sessions s WHERE ${where} GROUP BY s.utm_source, s.utm_medium, s.utm_campaign
              ORDER BY sessions DESC LIMIT 25`)
    .all(params) as Record<string, unknown>[];

  const bySessionStatus = database
    .prepare(`SELECT s.status AS status, COUNT(*) AS sessions FROM writer_sessions s WHERE ${where} GROUP BY s.status ORDER BY sessions DESC`)
    .all(params) as Record<string, unknown>[];

  const subWhere = submissionWhere({ ...filters, status: undefined, deliveryStatus: undefined });
  const byErrorCategory = database
    .prepare(`SELECT COALESCE(sub.error_code,'—') AS error_code, sub.status AS status, COUNT(*) AS c
              FROM writing_submissions sub WHERE ${subWhere.where} AND sub.status LIKE 'failed%'
              GROUP BY sub.error_code, sub.status ORDER BY c DESC`)
    .all(subWhere.params) as Record<string, unknown>[];

  const byModel = database
    .prepare(`SELECT COALESCE(sub.provider,'—') AS provider, COALESCE(sub.model,'—') AS model,
                     SUM(CASE WHEN sub.mock = 1 THEN 1 ELSE 0 END) AS mock_runs,
                     SUM(CASE WHEN sub.mock = 0 THEN 1 ELSE 0 END) AS real_runs, COUNT(*) AS runs
              FROM writing_submissions sub WHERE ${subWhere.where} GROUP BY sub.provider, sub.model ORDER BY runs DESC`)
    .all(subWhere.params) as Record<string, unknown>[];

  return { byDay, byLocale, byTask, byReferrer, byUtm, bySessionStatus, byErrorCategory, byModel };
}

export function listWriterSubmissions(filters: WriterFilters, limit = 200): SubmissionListItem[] {
  const { where, params } = submissionWhere(filters);
  const database = getAdminDb();

  const rows = database
    .prepare(
      `SELECT sub.id, sub.created_at, sub.completed_at, sub.session_id, sub.locale, sub.task_id,
              sub.word_count, sub.status, sub.celpe_level, sub.provider, sub.model, sub.mock,
              sub.analysis_duration_ms, sub.archive_status, sub.archive_path, sub.archive_error, sub.error_code,
              sub.error_message, sub.email_normalized, s.active_ms, s.elapsed_ms,
              d.status AS delivery_status, d.attempt_count AS delivery_attempts, d.sent_at,
              r.open_count AS report_open_count, r.first_opened_at AS report_first_opened_at
       FROM writing_submissions sub
       LEFT JOIN writer_sessions s ON s.id = sub.session_id
       LEFT JOIN email_deliveries d ON d.submission_id = sub.id
       LEFT JOIN writing_reports r ON r.submission_id = sub.id
       WHERE ${where}
       ORDER BY sub.created_at DESC LIMIT @limit`,
    )
    .all({ ...params, limit }) as (Omit<SubmissionListItem, "email_masked" | "email_domain"> & {
    email_normalized: string;
  })[];

  return rows.map(({ email_normalized: email, ...row }) => ({
    ...row,
    email_masked: maskEmail(email),
    email_domain: email.includes("@") ? email.split("@")[1] : "—",
  }));
}

export function countWriterSubmissions(filters: WriterFilters): number {
  const { where, params } = submissionWhere(filters);
  const row = getAdminDb()
    .prepare(
      `SELECT COUNT(*) AS c FROM writing_submissions sub
       LEFT JOIN email_deliveries d ON d.submission_id = sub.id
       LEFT JOIN writer_sessions s ON s.id = sub.session_id
       WHERE ${where}`,
    )
    .get(params) as { c: number };
  return row.c;
}

export type SubmissionDetail = {
  submission: Record<string, unknown> & { email: string; email_masked: string };
  session: WriterSessionRow | null;
  events: { event_name: string; occurred_at: string; received_at: string; task_id: string | null; word_count: number | null; metadata: unknown }[];
  report: Record<string, unknown> | null;
  delivery: Record<string, unknown> | null;
  result: { corrections: number; byCategory: Record<string, number>; level: string | null; scores: unknown } | null;
};

/**
 * Everything one candidate left behind, keyed by submission id. The operator opens one person at
 * a time, so this payload carries the real address; the list rows and the CSV keep the mask, and
 * `email_normalized` stays out because the panel would then hold two copies of the same address.
 */
export function getSubmissionDetail(submissionId: string): SubmissionDetail | null {
  const submission = getSubmission(submissionId);
  if (!submission) return null;

  const {
    email_normalized: emailNormalized,
    analysis_json: analysisJson,
    scores_json: scoresJson,
    ...rest
  } = submission;
  const session = submission.session_id ? (getSession(submission.session_id) ?? null) : null;

  let corrections: Record<string, unknown>[] = [];
  try {
    const analysis = analysisJson ? (JSON.parse(analysisJson) as { corrections?: Record<string, unknown>[] }) : null;
    corrections = analysis?.corrections ?? [];
  } catch {
    corrections = [];
  }
  const byCategory: Record<string, number> = {};
  for (const correction of corrections) {
    const category = String(correction.category ?? "other");
    byCategory[category] = (byCategory[category] ?? 0) + 1;
  }

  const report = getReportForSubmission(submissionId);
  const delivery = getDeliveryForSubmission(submissionId);

  return {
    submission: {
      ...rest,
      // The normalized form keeps the mask identical to the one the list shows, and does not
      // echo back the capitalisation the candidate typed.
      email_masked: maskEmail(submission.email_normalized || submission.email),
    },
    session,
    events: listSessionEvents(submission.session_id ?? "").map((event) => ({
      event_name: event.event_name,
      occurred_at: event.occurred_at,
      received_at: event.received_at,
      task_id: event.task_id,
      word_count: event.word_count,
      metadata: safeJson(event.metadata_json),
    })),
    report: report
      ? {
          created_at: report.created_at,
          expires_at: report.expires_at,
          first_opened_at: report.first_opened_at,
          last_opened_at: report.last_opened_at,
          open_count: report.open_count,
          expired: Date.parse(report.expires_at) <= Date.now(),
        }
      : null,
    delivery: delivery
      ? {
          status: delivery.status,
          provider: delivery.provider,
          attempt_count: delivery.attempt_count,
          last_error: delivery.last_error,
          created_at: delivery.created_at,
          sent_at: delivery.sent_at,
          updated_at: delivery.updated_at,
        }
      : null,
    result: {
      corrections: corrections.length,
      byCategory,
      level: submission.celpe_level,
      scores: safeJson(scoresJson),
    },
  };
}

function safeJson(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return { unparseable: true };
  }
}

export function getFunnelRowsForCsv(filters: WriterFilters) {  const days = getWriterBreakdowns(filters).byDay as { day: string }[];
  return days.map((row) => {
    const dayFilters: WriterFilters = {
      ...filters,
      sinceIso: `${row.day}T00:00:00.000Z`,
      untilIso: `${row.day}T23:59:59.999Z`,
    };
    const kpis = getWriterKpis(dayFilters);
    return { day: row.day, ...kpis };
  });
}
