import type Database from "better-sqlite3";

/**
 * Writer observability schema — the single executable source of truth. Idempotent: safe to run
 * on an empty or an existing database, and re-run on every process start (the project has no
 * migrations table and migrations 001/002 are missing, so the code is the source of truth).
 *
 * migrations/004_writer_observability.sql repeats this DDL for the operator and is reference
 * only — it never reaches the server. tests/writer/schema-parity.test.ts fails if the two drift.
 */
export const WRITER_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS writer_sessions (
    id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    path TEXT NOT NULL,
    initial_task_id TEXT,
    current_task_id TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    status TEXT NOT NULL DEFAULT 'opened',
    opened_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    first_input_at TEXT,
    last_activity_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    submitted_at TEXT,
    completed_at TEXT,
    active_ms INTEGER NOT NULL DEFAULT 0,
    elapsed_ms INTEGER NOT NULL DEFAULT 0,
    current_word_count INTEGER NOT NULL DEFAULT 0,
    max_word_count INTEGER NOT NULL DEFAULT 0,
    submission_id TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_writer_sessions_opened ON writer_sessions(opened_at);
  CREATE INDEX IF NOT EXISTS idx_writer_sessions_status ON writer_sessions(status, opened_at);
  CREATE INDEX IF NOT EXISTS idx_writer_sessions_locale ON writer_sessions(locale, opened_at);
  CREATE INDEX IF NOT EXISTS idx_writer_sessions_task ON writer_sessions(current_task_id, opened_at);
  CREATE INDEX IF NOT EXISTS idx_writer_sessions_visitor ON writer_sessions(visitor_id);
  CREATE INDEX IF NOT EXISTS idx_writer_sessions_last_activity ON writer_sessions(last_activity_at);

  CREATE TABLE IF NOT EXISTS writer_events (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    occurred_at TEXT NOT NULL,
    received_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    locale TEXT,
    task_id TEXT,
    word_count INTEGER,
    metadata_json TEXT NOT NULL DEFAULT '{}'
  );
  CREATE INDEX IF NOT EXISTS idx_writer_events_session ON writer_events(session_id);
  CREATE INDEX IF NOT EXISTS idx_writer_events_name ON writer_events(event_name);
  CREATE INDEX IF NOT EXISTS idx_writer_events_occurred ON writer_events(occurred_at);
  CREATE INDEX IF NOT EXISTS idx_writer_events_locale ON writer_events(locale, occurred_at);
  CREATE INDEX IF NOT EXISTS idx_writer_events_task ON writer_events(task_id, occurred_at);
  CREATE INDEX IF NOT EXISTS idx_writer_events_name_occurred ON writer_events(event_name, occurred_at);

  CREATE TABLE IF NOT EXISTS writing_submissions (
    id TEXT PRIMARY KEY,
    session_id TEXT,
    email TEXT NOT NULL,
    email_normalized TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'pt-br',
    task_id TEXT,
    essay_text TEXT NOT NULL,
    word_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    analysis_json TEXT,
    celpe_level TEXT,
    scores_json TEXT,
    provider TEXT,
    model TEXT,
    mock INTEGER NOT NULL DEFAULT 0,
    analysis_duration_ms INTEGER,
    archive_status TEXT,
    archive_path TEXT,
    archive_error TEXT,
    error_code TEXT,
    error_message TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    completed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_created ON writing_submissions(created_at);
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_status ON writing_submissions(status, created_at);
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_email ON writing_submissions(email_normalized);
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_session ON writing_submissions(session_id);
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_task ON writing_submissions(task_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_locale ON writing_submissions(locale, created_at);
  CREATE INDEX IF NOT EXISTS idx_writing_submissions_model ON writing_submissions(provider, model);

  CREATE TABLE IF NOT EXISTS writing_reports (
    id TEXT PRIMARY KEY,
    submission_id TEXT NOT NULL UNIQUE,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    first_opened_at TEXT,
    last_opened_at TEXT,
    open_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_writing_reports_token ON writing_reports(token_hash);
  CREATE INDEX IF NOT EXISTS idx_writing_reports_expires ON writing_reports(expires_at);
  CREATE INDEX IF NOT EXISTS idx_writing_reports_submission ON writing_reports(submission_id);

  CREATE TABLE IF NOT EXISTS email_deliveries (
    id TEXT PRIMARY KEY,
    submission_id TEXT NOT NULL UNIQUE,
    recipient TEXT NOT NULL,
    provider TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    provider_message_id TEXT,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    sent_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_email_deliveries_status ON email_deliveries(status, created_at);
  CREATE INDEX IF NOT EXISTS idx_email_deliveries_submission ON email_deliveries(submission_id);

  CREATE TABLE IF NOT EXISTS writer_accounts (
    id TEXT PRIMARY KEY,
    email_normalized TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    verified_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_writer_accounts_email ON writer_accounts(email_normalized);

  CREATE TABLE IF NOT EXISTS writer_login_links (
    id TEXT PRIMARY KEY,
    email_normalized TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    locale TEXT NOT NULL,
    purpose TEXT NOT NULL DEFAULT 'login',
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_writer_login_links_email ON writer_login_links(email_normalized, created_at);

  CREATE TABLE IF NOT EXISTS writer_cabinet_sessions (
    id TEXT PRIMARY KEY,
    email_normalized TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    last_seen_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS idx_writer_cabinet_sessions_email ON writer_cabinet_sessions(email_normalized);
  CREATE INDEX IF NOT EXISTS idx_writer_cabinet_sessions_expires ON writer_cabinet_sessions(expires_at);
`;

export function migrateWriterObservability(database: Database.Database) {
  database.exec(WRITER_SCHEMA_SQL);

  const cols = database.prepare(`PRAGMA table_info(writing_submissions)`).all() as { name: string }[];
  if (!cols.some((c) => c.name === "archive_error")) {
    database.exec(`ALTER TABLE writing_submissions ADD COLUMN archive_error TEXT`);
  }

  const linkCols = database.prepare(`PRAGMA table_info(writer_login_links)`).all() as { name: string }[];
  if (linkCols.length > 0 && !linkCols.some((c) => c.name === "purpose")) {
    database.exec(`ALTER TABLE writer_login_links ADD COLUMN purpose TEXT NOT NULL DEFAULT 'login'`);
  }
}
