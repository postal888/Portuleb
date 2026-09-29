-- 004_writer_observability.sql
--
-- Writer observability: sessions, events, submissions, report tokens, email deliveries.
--
-- СТАТУС: REFERENCE / документация для оператора. Это НЕ исполняемый в приложении файл.
--
-- ВАЖНО. Источником истины по схеме является код: src/lib/writer/schema-ddl.ts выполняет
-- тот же DDL через migrateWriterObservability() при каждом открытии БД
-- (src/lib/admin/db.ts :: runAdminMigrations). Причина: deploy/deploy.ps1 синхронизирует
-- на сервер только src/, public/ и конфиги — каталог migrations/ на сервер не попадает,
-- а migrations 001 и 002 в репозитории потеряны. Этот файл — документация для оператора
-- и ручной запасной путь, если захотите применить схему сами.
--
-- Соответствие проверяет тест tests/writer/schema-parity.test.ts: он строит две базы в
-- памяти (из кода и из этого файла) и сверяет таблицы, колонки и индексы. Порознь эти два
-- текста поддерживать не нужно — расхождение падает в npm test.
--
-- Идемпотентен: повторный запуск безопасен, существующие таблицы и колонки не меняются.
-- Применение к живой базе:
--   sqlite3 data/admin/admin.db < migrations/004_writer_observability.sql
-- Откат не требуется: новые таблицы изолированы, старые (writing_emails) не тронуты.
-- BEFORE: сделайте резервную копию data/admin/admin.db, admin.db-wal, admin.db-shm.

PRAGMA foreign_keys = OFF;

BEGIN;

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

COMMIT;
