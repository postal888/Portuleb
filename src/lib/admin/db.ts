import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const DB_PATH = path.join(DATA_DIR, "admin.db");

let db: Database.Database | null = null;

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getAdminDb(): Database.Database {
  if (db) return db;
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
  `);
  return db;
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
}) {
  const database = getAdminDb();
  const result = database
    .prepare(
      `INSERT INTO scheduled_blog_posts (slug, title, payload_json, publish_at_utc, created_by)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(input.slug, input.title, input.payloadJson, input.publishAtUtc, input.createdBy ?? "admin");
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
