/**
 * Path resolution shared by the writer cron scripts (backup + maintenance), so the two agree on
 * which database and which archive folder they act on. Reads only the two keys it needs out of
 * .env.local — never the whole file, never its secrets.
 */
import fs from "node:fs";
import path from "node:path";

export function appDir() {
  return path.resolve(process.cwd());
}

export function envValue(name, directory = appDir()) {
  const fromProcess = process.env[name]?.trim();
  if (fromProcess) return fromProcess;
  const envFile = path.join(directory, ".env.local");
  if (!fs.existsSync(envFile)) return null;
  const line = fs
    .readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${name}=`));
  return line ? line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "") || null : null;
}

/** Same defaults the app uses (src/lib/admin/db.ts, src/lib/writer/archive.ts). */
export function databasePath() {
  return path.resolve(appDir(), envValue("ADMIN_DB_PATH") || path.join("data", "admin", "admin.db"));
}

export function archivePath() {
  return path.resolve(appDir(), envValue("WRITER_ARCHIVE_DIR") || path.join("data", "writing"));
}

export function backupsRoot() {
  return path.join(appDir(), "data", "backups", "writer");
}

export const WRITER_TABLES = [
  "writer_sessions",
  "writer_events",
  "writing_submissions",
  "writing_reports",
  "email_deliveries",
];
