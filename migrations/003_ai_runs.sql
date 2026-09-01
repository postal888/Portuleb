-- migrations/003_ai_runs.sql
-- Shared history for manual AI actions: research | brief | audit

CREATE TABLE IF NOT EXISTS ai_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  action TEXT NOT NULL,
  input_topic TEXT,
  input_url TEXT,
  model TEXT NOT NULL,
  domains_json TEXT,
  answer TEXT,
  citations_json TEXT,
  usage_json TEXT,
  status TEXT NOT NULL DEFAULT 'ok',
  error_message TEXT,
  reviewed_at TEXT,
  reviewed_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_ai_runs_action ON ai_runs(action);
CREATE INDEX IF NOT EXISTS idx_ai_runs_created ON ai_runs(created_at);
