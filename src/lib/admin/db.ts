import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const DB_PATH = path.join(DATA_DIR, "admin.db");

let db: Database.Database | null = null;

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function runAdminMigrations(database: Database.Database) {
  migrateScheduledBlogPosts(database);
  migrateAiMonitoringRuns(database);
}

export function getAdminDb(): Database.Database {
  if (db) {
    runAdminMigrations(db);
    return db;
  }
  ensureDir();
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
    CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);

    CREATE TABLE IF NOT EXISTS scheduled_blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      publish_at_utc TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      error_message TEXT,
      created_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      published_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_scheduled_status ON scheduled_blog_posts(status, publish_at_utc);

    CREATE TABLE IF NOT EXISTS ai_monitoring_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prompt TEXT NOT NULL,
      model TEXT NOT NULL,
      answer TEXT NOT NULL,
      citations_json TEXT NOT NULL DEFAULT '[]',
      mentioned INTEGER NOT NULL DEFAULT 0,
      in_answer INTEGER NOT NULL DEFAULT 0,
      in_citations INTEGER NOT NULL DEFAULT 0,
      matched_urls_json TEXT NOT NULL DEFAULT '[]',
      error_message TEXT,
      provider TEXT NOT NULL DEFAULT 'sonar',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_ai_monitoring_created ON ai_monitoring_runs(created_at);
    CREATE INDEX IF NOT EXISTS idx_ai_monitoring_provider ON ai_monitoring_runs(provider);

    CREATE TABLE IF NOT EXISTS ai_action_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      input_text TEXT NOT NULL,
      model TEXT NOT NULL,
      domains_json TEXT NOT NULL DEFAULT '[]',
      status_code INTEGER NOT NULL,
      answer TEXT,
      citations_json TEXT NOT NULL DEFAULT '[]',
      usage_json TEXT NOT NULL DEFAULT '{}',
      error_message TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_ai_action_runs_created ON ai_action_runs(created_at);
    CREATE INDEX IF NOT EXISTS idx_ai_action_runs_action ON ai_action_runs(action);

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
  `);
  runAdminMigrations(db);
  return db;
}

function migrateAiMonitoringRuns(database: Database.Database) {
  const cols = database.prepare(`PRAGMA table_info(ai_monitoring_runs)`).all() as {
    name: string;
  }[];
  if (!cols.some((c) => c.name === "provider")) {
    database.exec(`ALTER TABLE ai_monitoring_runs ADD COLUMN provider TEXT NOT NULL DEFAULT 'sonar'`);
    database.exec(`CREATE INDEX IF NOT EXISTS idx_ai_monitoring_provider ON ai_monitoring_runs(provider)`);
  }
}

function migrateScheduledBlogPosts(database: Database.Database) {
  const cols = database.prepare(`PRAGMA table_info(scheduled_blog_posts)`).all() as {
    name: string;
  }[];
  if (!cols.some((c) => c.name === "source_file_path")) {
    database.exec(`ALTER TABLE scheduled_blog_posts ADD COLUMN source_file_path TEXT`);
  }
}

export type ScheduledRow = {
  id: number;
  slug: string;
  title: string;
  payload_json: string;
  publish_at_utc: string;
  status: string;
  error_message: string | null;
  created_by: string | null;
  created_at: string;
  published_at: string | null;
  source_file_path: string | null;
};

export function recordPageView(path: string, referrer: string | null, userAgent: string | null) {
  const database = getAdminDb();
  database
    .prepare(
      `INSERT INTO page_views (path, referrer, user_agent) VALUES (?, ?, ?)`,
    )
    .run(path, referrer ?? null, userAgent ?? null);
}

export function getTrafficStats(days = 7) {
  const database = getAdminDb();
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);
  const sinceIso = since.toISOString();

  const daily = database
    .prepare(
      `SELECT date(created_at) as day, COUNT(*) as views
       FROM page_views WHERE created_at >= ? GROUP BY day ORDER BY day`,
    )
    .all(sinceIso) as { day: string; views: number }[];

  const topPaths = database
    .prepare(
      `SELECT path, COUNT(*) as views FROM page_views
       WHERE created_at >= ? GROUP BY path ORDER BY views DESC LIMIT 15`,
    )
    .all(sinceIso) as { path: string; views: number }[];

  const total = database
    .prepare(`SELECT COUNT(*) as c FROM page_views WHERE created_at >= ?`)
    .get(sinceIso) as { c: number };

  return { daily, topPaths, totalViews: total.c };
}

export function createScheduledPost(input: {
  slug: string;
  title: string;
  payloadJson: string;
  publishAtUtc: string;
  createdBy?: string;
  sourceFilePath?: string;
}) {
  const database = getAdminDb();
  const result = database
    .prepare(
      `INSERT INTO scheduled_blog_posts (slug, title, payload_json, publish_at_utc, created_by, source_file_path)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.slug,
      input.title,
      input.payloadJson,
      input.publishAtUtc,
      input.createdBy ?? "admin",
      input.sourceFilePath ?? null,
    );
  return Number(result.lastInsertRowid);
}

export function listScheduledPosts(status?: string): ScheduledRow[] {
  const database = getAdminDb();
  if (status) {
    return database
      .prepare(`SELECT * FROM scheduled_blog_posts WHERE status = ? ORDER BY publish_at_utc DESC`)
      .all(status) as ScheduledRow[];
  }
  return database
    .prepare(`SELECT * FROM scheduled_blog_posts ORDER BY publish_at_utc DESC`)
    .all() as ScheduledRow[];
}

export function getScheduledPost(id: number): ScheduledRow | undefined {
  const database = getAdminDb();
  return database.prepare(`SELECT * FROM scheduled_blog_posts WHERE id = ?`).get(id) as
    | ScheduledRow
    | undefined;
}

export function cancelScheduledPost(id: number) {
  const database = getAdminDb();
  database
    .prepare(`UPDATE scheduled_blog_posts SET status = 'cancelled' WHERE id = ? AND status = 'scheduled'`)
    .run(id);
}

export function deleteScheduledPost(id: number): boolean {
  const database = getAdminDb();
  const result = database.prepare(`DELETE FROM scheduled_blog_posts WHERE id = ?`).run(id);
  return result.changes > 0;
}

export function updateScheduledPostTime(id: number, publishAtUtc: string, payloadJson?: string) {
  const database = getAdminDb();
  if (payloadJson) {
    database
      .prepare(
        `UPDATE scheduled_blog_posts SET publish_at_utc = ?, payload_json = ? WHERE id = ? AND status = 'scheduled'`,
      )
      .run(publishAtUtc, payloadJson, id);
    return;
  }
  database
    .prepare(`UPDATE scheduled_blog_posts SET publish_at_utc = ? WHERE id = ? AND status = 'scheduled'`)
    .run(publishAtUtc, id);
}

export function getDueScheduledPosts(): ScheduledRow[] {
  const database = getAdminDb();
  const now = new Date().toISOString();
  return database
    .prepare(
      `SELECT * FROM scheduled_blog_posts WHERE status = 'scheduled' AND publish_at_utc <= ? ORDER BY publish_at_utc`,
    )
    .all(now) as ScheduledRow[];
}

export function markScheduledPublished(id: number) {
  const database = getAdminDb();
  database
    .prepare(
      `UPDATE scheduled_blog_posts SET status = 'published', published_at = datetime('now'), error_message = NULL WHERE id = ?`,
    )
    .run(id);
}

export function markScheduledFailed(id: number, message: string) {
  const database = getAdminDb();
  database
    .prepare(`UPDATE scheduled_blog_posts SET status = 'failed', error_message = ? WHERE id = ?`)
    .run(message, id);
}

export function getDashboardCounts() {
  const database = getAdminDb();
  const scheduled = database
    .prepare(`SELECT COUNT(*) as c FROM scheduled_blog_posts WHERE status = 'scheduled'`)
    .get() as { c: number };
  const failed = database
    .prepare(`SELECT COUNT(*) as c FROM scheduled_blog_posts WHERE status = 'failed'`)
    .get() as { c: number };
  const viewsToday = database
    .prepare(`SELECT COUNT(*) as c FROM page_views WHERE date(created_at) = date('now')`)
    .get() as { c: number };
  return { scheduled: scheduled.c, failed: failed.c, viewsToday: viewsToday.c };
}

export type AiMonitoringRunRow = {
  id: number;
  prompt: string;
  model: string;
  answer: string;
  citations_json: string;
  mentioned: number;
  in_answer: number;
  in_citations: number;
  matched_urls_json: string;
  error_message: string | null;
  provider: string;
  created_at: string;
};

export function saveAiMonitoringRun(input: {
  prompt: string;
  model: string;
  answer: string;
  citationsJson: string;
  mentioned: boolean;
  inAnswer: boolean;
  inCitations: boolean;
  matchedUrlsJson: string;
  errorMessage?: string | null;
  provider?: string;
}): number {
  const database = getAdminDb();
  const result = database
    .prepare(
      `INSERT INTO ai_monitoring_runs
        (prompt, model, answer, citations_json, mentioned, in_answer, in_citations, matched_urls_json, error_message, provider)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.prompt,
      input.model,
      input.answer,
      input.citationsJson,
      input.mentioned ? 1 : 0,
      input.inAnswer ? 1 : 0,
      input.inCitations ? 1 : 0,
      input.matchedUrlsJson,
      input.errorMessage ?? null,
      input.provider ?? "sonar",
    );
  return Number(result.lastInsertRowid);
}

export function listAiMonitoringRuns(limit = 40, provider?: string): AiMonitoringRunRow[] {
  const database = getAdminDb();
  if (provider) {
    return database
      .prepare(
        `SELECT * FROM ai_monitoring_runs WHERE provider = ?
         ORDER BY created_at DESC, id DESC LIMIT ?`,
      )
      .all(provider, limit) as AiMonitoringRunRow[];
  }
  return database
    .prepare(
      `SELECT * FROM ai_monitoring_runs ORDER BY created_at DESC, id DESC LIMIT ?`,
    )
    .all(limit) as AiMonitoringRunRow[];
}

export type AiActionKind = "research" | "brief" | "audit";

export type AiActionRunRow = {
  id: number;
  action: string;
  input_text: string;
  model: string;
  domains_json: string;
  status_code: number;
  answer: string | null;
  citations_json: string;
  usage_json: string;
  error_message: string | null;
  created_at: string;
};

export function saveAiActionRun(input: {
  action: AiActionKind;
  inputText: string;
  model: string;
  domainsJson: string;
  statusCode: number;
  answer?: string | null;
  citationsJson?: string;
  usageJson?: string;
  errorMessage?: string | null;
}): number {
  const database = getAdminDb();
  const result = database
    .prepare(
      `INSERT INTO ai_action_runs
        (action, input_text, model, domains_json, status_code, answer, citations_json, usage_json, error_message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.action,
      input.inputText,
      input.model,
      input.domainsJson,
      input.statusCode,
      input.answer ?? null,
      input.citationsJson ?? "[]",
      input.usageJson ?? "{}",
      input.errorMessage ?? null,
    );
  return Number(result.lastInsertRowid);
}

export function listAiActionRuns(limit = 40, action?: AiActionKind): AiActionRunRow[] {
  const database = getAdminDb();
  if (action) {
    return database
      .prepare(
        `SELECT * FROM ai_action_runs WHERE action = ? ORDER BY created_at DESC, id DESC LIMIT ?`,
      )
      .all(action, limit) as AiActionRunRow[];
  }
  return database
    .prepare(`SELECT * FROM ai_action_runs ORDER BY created_at DESC, id DESC LIMIT ?`)
    .all(limit) as AiActionRunRow[];
}
