import { getAdminDb } from "@/lib/admin/db";
import { nowIso, isoDaysFromNow, isoAgo, REPORT_OPEN_DEDUPE_MS } from "./time";
import type {
  EmailDeliveryRow,
  WriterEventRow,
  WritingReportRow,
  WritingSubmissionRow,
  WriterSessionRow,
} from "./types";
import type { ArchiveStatus, EmailDeliveryStatus, SubmissionStatus, WriterEventName, WriterSessionStatus } from "./types";
import { eventMetadata, normalizeOccurredAt, type WriterEventInput, type WriterContext } from "./events";

export function maskEmail(email: string | null | undefined): string {
  if (!email) return "—";
  const at = email.indexOf("@");
  if (at <= 0) return "***";
  const name = email.slice(0, at);
  const domain = email.slice(at + 1);
  const head = name.slice(0, Math.min(2, name.length));
  return `${head}${"*".repeat(Math.max(2, Math.min(6, name.length - head.length)))}@${domain}`;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/* ------------------------------------------------------------------ sessions */

export type SessionContextInput = {
  sessionId: string;
  visitorId: string;
  context: WriterContext;
  now?: string;
};

export function upsertWriterSession({ sessionId, visitorId, context, now }: SessionContextInput): void {
  const database = getAdminDb();
  const stamp = now ?? nowIso();
  const existing = database
    .prepare(`SELECT id, status, current_task_id, first_input_at FROM writer_sessions WHERE id = ?`)
    .get(sessionId) as { id: string; status: string; current_task_id: string | null; first_input_at: string | null } | undefined;

  if (!existing) {
    database
      .prepare(
        `INSERT INTO writer_sessions
           (id, visitor_id, locale, path, initial_task_id, current_task_id, referrer,
            utm_source, utm_medium, utm_campaign, status, opened_at, last_activity_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'opened', ?, ?, ?, ?)`,
      )
      .run(
        sessionId,
        visitorId,
        context.locale,
        context.path,
        context.taskId ?? null,
        context.taskId ?? null,
        context.referrer ?? null,
        context.utmSource ?? null,
        context.utmMedium ?? null,
        context.utmCampaign ?? null,
        stamp,
        stamp,
        stamp,
        stamp,
      );
    return;
  }

  database
    .prepare(
      `UPDATE writer_sessions
       SET last_activity_at = ?, updated_at = ?,
           current_task_id = COALESCE(?, current_task_id),
           referrer = COALESCE(?, referrer),
           utm_source = COALESCE(?, utm_source),
           utm_medium = COALESCE(?, utm_medium),
           utm_campaign = COALESCE(?, utm_campaign)
       WHERE id = ?`,
    )
    .run(
      stamp,
      stamp,
      context.taskId ?? null,
      context.referrer ?? null,
      context.utmSource ?? null,
      context.utmMedium ?? null,
      context.utmCampaign ?? null,
      sessionId,
    );
}

export function advanceSessionStatus(sessionId: string, status: WriterSessionStatus, fields: Partial<{
  first_input_at: string;
  submitted_at: string;
  completed_at: string;
  active_ms: number;
  elapsed_ms: number;
  current_word_count: number;
  max_word_count: number;
  submission_id: string;
}> = {}): void {
  const database = getAdminDb();
  const stamp = nowIso();
  const sets = ["status = ?", "last_activity_at = ?", "updated_at = ?"];
  const values: (string | number)[] = [status, stamp, stamp];

  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    sets.push(`${key} = ?`);
    values.push(value);
  }
  values.push(sessionId);

  database.prepare(`UPDATE writer_sessions SET ${sets.join(", ")} WHERE id = ?`).run(...values);
}

export function getSession(id: string): WriterSessionRow | undefined {
  return getAdminDb().prepare(`SELECT * FROM writer_sessions WHERE id = ?`).get(id) as
    | WriterSessionRow
    | undefined;
}

export type SessionProgress = {
  status?: WriterSessionStatus;
  firstInputAt?: string;
  submittedAt?: string;
  completedAt?: string;
  activeMs?: number;
  elapsedMs?: number;
  currentWordCount?: number;
  maxWordCount?: number;
  currentTaskId?: string | null;
};

/**
 * Folds a client-tracked progress report into the session row. Timestamps are written once,
 * counters only ever grow, so a replayed or out-of-order beacon cannot move a session backwards.
 * last_activity_at is deliberately not touched: that clock is the server's receipt time.
 */
export function applySessionProgress(sessionId: string, patch: SessionProgress): void {
  const database = getAdminDb();
  const current = getSession(sessionId);
  if (!current) return;
  const stamp = nowIso();

  database
    .prepare(
      `UPDATE writer_sessions
       SET status = COALESCE(?, status),
           first_input_at = COALESCE(first_input_at, ?),
           submitted_at = COALESCE(submitted_at, ?),
           completed_at = COALESCE(completed_at, ?),
           active_ms = MAX(active_ms, ?),
           elapsed_ms = MAX(elapsed_ms, ?),
           current_word_count = COALESCE(?, current_word_count),
           max_word_count = MAX(max_word_count, ?),
           current_task_id = COALESCE(?, current_task_id),
           updated_at = ?
       WHERE id = ?`,
    )
    .run(
      patch.status ?? null,
      patch.firstInputAt ?? null,
      patch.submittedAt ?? null,
      patch.completedAt ?? null,
      patch.activeMs ?? 0,
      patch.elapsedMs ?? 0,
      patch.currentWordCount ?? null,
      patch.maxWordCount ?? 0,
      patch.currentTaskId ?? null,
      stamp,
      sessionId,
    );
}

/**
 * Abandonment is a server-side judgement, not a client event: a session that started
 * writing but never submitted and has gone quiet counts as abandoned.
 */
export function markAbandonedSessions(quietMs: number, now = nowIso()): number {
  const database = getAdminDb();
  const cutoff = isoAgo(quietMs, Date.parse(now));
  const result = database
    .prepare(
      `UPDATE writer_sessions
       SET status = 'abandoned', updated_at = ?
       WHERE status IN ('writing', 'ready_for_email', 'ready_for_submission', 'submitted')
         AND last_activity_at < ?`,
    )
    .run(now, cutoff);
  return result.changes;
}

/* -------------------------------------------------------------------- events */

export type EventInsertResult = { inserted: boolean; eventId: string };

/** Idempotent on eventId: a replayed beacon never inflates a counter. */
export function insertWriterEvent(event: WriterEventInput, context: WriterContext, serverNowMs = Date.now()): EventInsertResult {
  const database = getAdminDb();
  const occurredAt = normalizeOccurredAt(event.occurredAt, serverNowMs);
  const metadata = eventMetadata(event);
  const result = database
    .prepare(
      `INSERT OR IGNORE INTO writer_events
         (id, session_id, event_name, occurred_at, locale, task_id, word_count, metadata_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      event.eventId,
      event.sessionId,
      event.event,
      occurredAt,
      context.locale,
      event.taskId ?? context.taskId ?? null,
      event.wordCount ?? null,
      JSON.stringify(metadata),
    );
  return { inserted: result.changes > 0, eventId: event.eventId };
}

/**
 * Server-originated event (report opened, e-mail resent from admin): no client beacon involved.
 * Events are session-scoped, so a sessionless submission writes nothing here — its report row
 * and delivery row still carry the open count and the send, which is what analytics reads.
 */
export function insertServerEvent(input: {
  sessionId: string | null;
  event: WriterEventName;
  locale?: string | null;
  taskId?: string | null;
  metadata?: Record<string, string | number>;
}): string | null {
  if (!input.sessionId) return null;
  const id = crypto.randomUUID();
  getAdminDb()
    .prepare(
      `INSERT INTO writer_events (id, session_id, event_name, occurred_at, locale, task_id, word_count, metadata_json)
       VALUES (?, ?, ?, ?, ?, ?, NULL, ?)`,
    )
    .run(id, input.sessionId, input.event, nowIso(), input.locale ?? null, input.taskId ?? null, JSON.stringify(input.metadata ?? {}));
  return id;
}

export function listSessionEvents(sessionId: string): WriterEventRow[] {  return getAdminDb()
    .prepare(`SELECT * FROM writer_events WHERE session_id = ? ORDER BY occurred_at, received_at`)
    .all(sessionId) as WriterEventRow[];
}

/* --------------------------------------------------------------- submissions */

export type NewSubmissionInput = {
  id: string;
  sessionId: string | null;
  email: string;
  locale: string;
  taskId: string | null;
  text: string;
  wordCount: number;
};

export function createSubmission(input: NewSubmissionInput): WritingSubmissionRow {
  const database = getAdminDb();
  const stamp = nowIso();
  database
    .prepare(
      `INSERT INTO writing_submissions
         (id, session_id, email, email_normalized, locale, task_id, essay_text, word_count, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
    )
    .run(
      input.id,
      input.sessionId,
      input.email.trim(),
      normalizeEmail(input.email),
      input.locale,
      input.taskId,
      input.text,
      input.wordCount,
      stamp,
      stamp,
    );
  return getSubmission(input.id) as WritingSubmissionRow;
}

export function setSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  error?: { code?: string; message?: string },
): void {
  const database = getAdminDb();
  if (status === "completed") {
    database
      .prepare(`UPDATE writing_submissions SET status = ?, completed_at = ?, updated_at = ?, error_code = NULL, error_message = NULL WHERE id = ?`)
      .run(status, nowIso(), nowIso(), id);
    return;
  }
  database
    .prepare(`UPDATE writing_submissions SET status = ?, updated_at = ?, error_code = ?, error_message = ? WHERE id = ?`)
    .run(status, nowIso(), error?.code ?? null, safeErrorText(error?.message), id);
}

export function completeSubmission(
  id: string,
  result: {
    analysisJson: string;
    celpeLevel: string | null;
    scoresJson: string | null;
    provider: string | null;
    model: string | null;
    mock: boolean;
    analysisDurationMs: number;
  },
): void {
  getAdminDb()
    .prepare(
      `UPDATE writing_submissions
       SET status = 'completed', analysis_json = ?, celpe_level = ?, scores_json = ?,
           provider = ?, model = ?, mock = ?, analysis_duration_ms = ?,
           completed_at = ?, updated_at = ?, error_code = NULL, error_message = NULL
       WHERE id = ?`,
    )
    .run(
      result.analysisJson,
      result.celpeLevel,
      result.scoresJson,
      result.provider,
      result.model,
      result.mock ? 1 : 0,
      Math.max(0, Math.round(result.analysisDurationMs)),
      nowIso(),
      nowIso(),
      id,
    );
}

export function setArchiveResult(id: string, status: ArchiveStatus, path: string | null, error?: string): void {
  getAdminDb()
    .prepare(`UPDATE writing_submissions SET archive_status = ?, archive_path = ?, archive_error = ?, updated_at = ? WHERE id = ?`)
    .run(status, path, error ? safeErrorText(error) : null, nowIso(), id);
}

export function getSubmission(id: string): WritingSubmissionRow | undefined {
  return getAdminDb().prepare(`SELECT * FROM writing_submissions WHERE id = ?`).get(id) as
    | WritingSubmissionRow
    | undefined;
}

export function getReportForSubmission(submissionId: string): WritingReportRow | undefined {
  return getAdminDb()
    .prepare(`SELECT * FROM writing_reports WHERE submission_id = ?`)
    .get(submissionId) as WritingReportRow | undefined;
}

export function getDeliveryForSubmission(submissionId: string): EmailDeliveryRow | undefined {
  return getAdminDb()
    .prepare(`SELECT * FROM email_deliveries WHERE submission_id = ?`)
    .get(submissionId) as EmailDeliveryRow | undefined;
}

/* ------------------------------------------------------------------- reports */

export function createReport(submissionId: string, tokenHash: string, ttlDays: number): WritingReportRow {
  const database = getAdminDb();
  const stamp = nowIso();
  const id = crypto.randomUUID();
  database
    .prepare(
      `INSERT INTO writing_reports (id, submission_id, token_hash, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(submission_id) DO UPDATE SET token_hash = excluded.token_hash, expires_at = excluded.expires_at`,
    )
    .run(id, submissionId, tokenHash, isoDaysFromNow(ttlDays), stamp);
  return getReportForSubmission(submissionId) as WritingReportRow;
}

export function findReportByTokenHash(tokenHash: string): WritingReportRow | undefined {
  return getAdminDb().prepare(`SELECT * FROM writing_reports WHERE token_hash = ?`).get(tokenHash) as
    | WritingReportRow
    | undefined;
}

/** Coalesces double renders/refresh spam, so the counter stays predictable. */
export function markReportOpened(reportId: string, now = nowIso()): boolean {
  const database = getAdminDb();
  const row = database
    .prepare(`SELECT first_opened_at, last_opened_at FROM writing_reports WHERE id = ?`)
    .get(reportId) as { first_opened_at: string | null; last_opened_at: string | null } | undefined;
  if (!row) return false;

  const lastMs = row.last_opened_at ? Date.parse(row.last_opened_at) : 0;
  if (row.last_opened_at && nowEpochMs(now) - lastMs < REPORT_OPEN_DEDUPE_MS) return false;

  database
    .prepare(
      `UPDATE writing_reports
       SET first_opened_at = COALESCE(first_opened_at, ?), last_opened_at = ?, open_count = open_count + 1
       WHERE id = ?`,
    )
    .run(now, now, reportId);
  return true;
}

function nowEpochMs(iso: string): number {
  const parsed = Date.parse(iso);
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

/* ------------------------------------------------------------ email delivery */

/** One row per submission; attempt_count only grows when an attempt actually concludes (sent/failed). */
export function createDelivery(input: {
  submissionId: string;
  recipient: string;
  provider: string | null;
  status: EmailDeliveryStatus;
  error?: string;
}): EmailDeliveryRow {
  const database = getAdminDb();
  const stamp = nowIso();
  const id = crypto.randomUUID();
  database
    .prepare(
      `INSERT INTO email_deliveries (id, submission_id, recipient, provider, status, attempt_count, last_error, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(submission_id) DO UPDATE SET
         recipient = excluded.recipient,
         provider = excluded.provider,
         status = excluded.status,
         last_error = excluded.last_error,
         updated_at = excluded.updated_at`,
    )
    .run(
      id,
      input.submissionId,
      normalizeEmail(input.recipient),
      input.provider,
      input.status,
      0,
      input.error ? safeErrorText(input.error) : null,
      stamp,
      stamp,
    );
  return getDeliveryForSubmission(input.submissionId) as EmailDeliveryRow;
}

export function markDeliverySent(submissionId: string, providerMessageId: string | null): void {
  const stamp = nowIso();
  getAdminDb()
    .prepare(
      `UPDATE email_deliveries
       SET status = 'sent', provider_message_id = ?, last_error = NULL, sent_at = ?, attempt_count = attempt_count + 1, updated_at = ?
       WHERE submission_id = ?`,
    )
    .run(providerMessageId, stamp, stamp, submissionId);
}

export function markDeliveryFailed(submissionId: string, error: string, status: EmailDeliveryStatus = "failed"): void {
  const stamp = nowIso();
  getAdminDb()
    .prepare(
      `UPDATE email_deliveries
       SET status = ?, last_error = ?, attempt_count = attempt_count + 1, updated_at = ?
       WHERE submission_id = ?`,
    )
    .run(status, safeErrorText(error), stamp, submissionId);
}

/* ---------------------------------------------------------------- destruction */

/** Erase a submission and everything attached to it (LGPD/GDPR request). */
export function deleteSubmissionCascade(submissionId: string): {
  submission: number;
  report: number;
  delivery: number;
  events: number;
  session: number;
  emails: number;
} {
  const database = getAdminDb();
  const row = getSubmission(submissionId);
  const sessionId = row?.session_id ?? null;
  const email = row?.email_normalized ?? null;

  const report = database.prepare(`DELETE FROM writing_reports WHERE submission_id = ?`).run(submissionId);
  const delivery = database.prepare(`DELETE FROM email_deliveries WHERE submission_id = ?`).run(submissionId);
  const submission = database.prepare(`DELETE FROM writing_submissions WHERE id = ?`).run(submissionId);

  let events = { changes: 0 };
  let session = { changes: 0 };
  if (sessionId) {
    // A session can carry several submissions (the candidate resubmitted): its trail only goes
    // once nothing else still needs it, or erasing one candidate would blind another's report.
    const remaining = database
      .prepare(`SELECT COUNT(*) AS c FROM writing_submissions WHERE session_id = ?`)
      .get(sessionId) as { c: number };
    if (remaining.c === 0) {
      events = database.prepare(`DELETE FROM writer_events WHERE session_id = ?`).run(sessionId);
      session = database.prepare(`DELETE FROM writer_sessions WHERE id = ?`).run(sessionId);
    }
  }

  // The legacy address book is a second copy of the same PII, so an erasure has to reach it —
  // but only once no other submission still needs the address.
  const emails = email
    ? database
        .prepare(
          `DELETE FROM writing_emails
           WHERE lower(email) = ?
             AND NOT EXISTS (SELECT 1 FROM writing_submissions WHERE email_normalized = ?)`,
        )
        .run(email, email).changes
    : 0;

  return {
    submission: submission.changes,
    report: report.changes,
    delivery: delivery.changes,
    events: events.changes,
    session: session.changes,
    emails,
  };
}

/* ----------------------------------------------------------------- aggregates */

export function countEventsByName(sinceIso: string, untilIso: string, names: WriterEventName[]): number {
  if (!names.length) return 0;
  const placeholders = names.map(() => "?").join(",");
  const row = getAdminDb()
    .prepare(
      `SELECT COUNT(*) AS c FROM writer_events
       WHERE event_name IN (${placeholders}) AND occurred_at >= ? AND occurred_at <= ?`,
    )
    .get(...names, sinceIso, untilIso) as { c: number };
  return row.c;
}

/** Never let raw driver/LLM strings reach storage: they can leak keys or PII. */
export function safeErrorText(message: string | undefined | null, max = 300): string | null {
  if (!message) return null;
  const single = String(message).replace(/\s+/g, " ").trim();
  const scrubbed = single
    .replace(/sk-[A-Za-z0-9_-]{10,}/g, "sk-***")
    .replace(/[^\s]+@[^\s]+/g, "***@***")
    .slice(0, max);
  return scrubbed || null;
}
