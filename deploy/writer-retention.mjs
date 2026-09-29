/**
 * Writer retention — the SQL lives here and nowhere else, so the cron script and the tests
 * run literally the same statements.
 *
 * Policy (agreed for production):
 *   - writer_events                     : 180 days by occurred_at;
 *   - terminal sessions (submitted/completed/failed) with no needed links : 180 days;
 *   - abandoned sessions with no submission                               : 90 days;
 *   - writing_submissions, writing_reports, email_deliveries               : never deleted here;
 *   - email_deliveries go away only with their submission (admin erase).
 *
 * Sessions still in flight (opened/writing/ready_*) are left alone even when ancient: that is
 * not this policy's call, and the count of them is reported so the operator can see the residue.
 *
 * Everything runs in one transaction: a failure halfway leaves the base exactly as it was.
 * Timestamps in these tables are always canonical UTC ISO with milliseconds (nowIso /
 * normalizeOccurredAt), which is why plain string comparison against the cutoff is safe.
 */

export const WRITER_RETENTION = {
  eventsDays: 180,
  terminalSessionDays: 180,
  abandonedSessionDays: 90,
};

const TERMINAL_STATUSES = ["submitted", "completed", "failed"];
const ABANDONED_STATUS = "abandoned";

/** A session is still needed while any submission points at it from either side. */
const STILL_REFERENCED = `EXISTS (
  SELECT 1 FROM writing_submissions s
  WHERE s.session_id = writer_sessions.id OR s.id = writer_sessions.submission_id
)`;

class DryRunRollback extends Error {}

export function hasWriterSchema(database) {
  const found = database
    .prepare(`SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name IN ('writer_sessions','writer_events','writing_submissions')`)
    .get();
  return Number(found.c) === 3;
}

export function retentionCutoffs(nowMs = Date.now(), policy = WRITER_RETENTION) {
  const iso = (days) => new Date(nowMs - days * 86_400_000).toISOString();
  return {
    events: iso(policy.eventsDays),
    terminalSessions: iso(policy.terminalSessionDays),
    abandonedSessions: iso(policy.abandonedSessionDays),
  };
}

function steps(cutoffs) {
  const placeholders = TERMINAL_STATUSES.map(() => "?").join(", ");
  return [
    {
      label: "events",
      sql: `DELETE FROM writer_events WHERE occurred_at < ?`,
      params: [cutoffs.events],
    },
    {
      label: "abandonedSessions",
      sql: `DELETE FROM writer_sessions
            WHERE status = ? AND opened_at < ? AND last_activity_at < ? AND NOT ${STILL_REFERENCED}`,
      params: [ABANDONED_STATUS, cutoffs.abandonedSessions, cutoffs.abandonedSessions],
    },
    {
      label: "terminalSessions",
      sql: `DELETE FROM writer_sessions
            WHERE status IN (${placeholders}) AND opened_at < ? AND last_activity_at < ? AND NOT ${STILL_REFERENCED}`,
      params: [...TERMINAL_STATUSES, cutoffs.terminalSessions, cutoffs.terminalSessions],
    },
    {
      // Whatever a deleted session still owned.
      label: "orphanEvents",
      sql: `DELETE FROM writer_events
            WHERE session_id IS NOT NULL
              AND session_id NOT IN (SELECT id FROM writer_sessions)`,
      params: [],
    },
  ];
}

export function countRemaining(database) {
  if (!hasWriterSchema(database)) return null;
  const one = (sql, ...params) => Number(database.prepare(sql).get(...params).c);
  return {
    sessions: one(`SELECT COUNT(*) AS c FROM writer_sessions`),
    inFlight: one(
      `SELECT COUNT(*) AS c FROM writer_sessions WHERE status NOT IN (?, ?, ?, ?)`,
      ...TERMINAL_STATUSES,
      ABANDONED_STATUS,
    ),
    events: one(`SELECT COUNT(*) AS c FROM writer_events`),
    submissions: one(`SELECT COUNT(*) AS c FROM writing_submissions`),
    reports: one(`SELECT COUNT(*) AS c FROM writing_reports`),
    deliveries: one(`SELECT COUNT(*) AS c FROM email_deliveries`),
  };
}

/**
 * Deletes what the policy allows and reports aggregate numbers only — no addresses, no essay
 * text, no tokens, not even session or event ids.
 *
 * @param {any} database better-sqlite3 handle opened on the writer tables
 * @param {{ nowMs?: number, dryRun?: boolean, policy?: typeof WRITER_RETENTION }} [options]
 * @returns {{ dryRun: boolean, cutoffs: Record<string, string>, deleted: Record<string, number>, remaining: Record<string, number> | null, skipped?: string }}
 */
export function runWriterRetention(database, { nowMs = Date.now(), dryRun = false, policy = WRITER_RETENTION } = {}) {
  const cutoffs = retentionCutoffs(nowMs, policy);
  if (!hasWriterSchema(database)) {
    return { dryRun, cutoffs, deleted: {}, remaining: null, skipped: "нет writer-таблиц" };
  }

  /** @type {Record<string, number>} */
  const deleted = {};
  const rollback = new DryRunRollback();
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const step of steps(cutoffs)) {
      deleted[step.label] = database.prepare(step.sql).run(...step.params).changes;
    }
    if (dryRun) throw rollback;
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    if (error !== rollback) throw error;
  }

  return { dryRun, cutoffs, deleted, remaining: countRemaining(database) };
}
