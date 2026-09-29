#!/usr/bin/env node
/**
 * Online backup of everything the writer section owns:
 *   - the SQLite database (sessions, events, submissions, report hashes, delivery log);
 *   - the readable JSON copies under data/writing.
 *
 * Run from the app directory on the server:  node deploy/backup-writer.mjs
 * Cron (daily 04:40):  40 4 * * * cd /var/www/celpe-de-pe && /usr/bin/node deploy/backup-writer.mjs >> /var/log/celpe-backup-writer.log 2>&1
 *
 * Never copies .env.local: a backup of the database is not a backup of the keys.
 * The archive tree is copied as plain files — restorable with cp -r, no tool needed.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { WRITER_TABLES, appDir, archivePath, backupsRoot, databasePath } from "./writer-paths.mjs";

const APP_DIR = appDir();
const KEEP_DAYS = Number(process.env.WRITER_BACKUP_KEEP_DAYS ?? "") || 14;

const databaseFile = databasePath();
const archiveDir = archivePath();

if (!fs.existsSync(databaseFile)) {
  console.log(`backup-writer: нет базы ${databaseFile} — writer ещё ни разу не писал?`);
  process.exit(0);
}

const stamp = new Date().toISOString().slice(0, 10);
const outDir = path.join(APP_DIR, "data", "backups", "writer", stamp);
fs.mkdirSync(outDir, { recursive: true });

// .backup() is the online copy: it takes the WAL with the main file, so no need to stop the app.
const source = new Database(databaseFile, { readonly: true });
const backupFile = path.join(outDir, "admin.db");
try {
  await source.backup(backupFile);
} finally {
  source.close();
}

// Fold the write-ahead log into the single file, then report what was captured. A copy that
// still needs its -wal to open is not a copy an operator can restore at 3 a.m.
const copy = new Database(backupFile);
let sqliteFileSize = 0;
const rowCounts = {};
try {
  copy.pragma("wal_checkpoint(TRUNCATE)");
  for (const table of WRITER_TABLES) {
    const exists = copy.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(table);
    // An old database that never met migration 004 is reported, not guessed at.
    rowCounts[table] = exists ? copy.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get().c : "нет таблицы";
  }
  sqliteFileSize = fs.statSync(backupFile).size;
} finally {
  copy.close();
}

let archiveFiles = 0;
let archiveBytes = 0;
if (fs.existsSync(archiveDir)) {
  const target = path.join(outDir, "writing");
  fs.cpSync(archiveDir, target, { recursive: true });
  for (const entry of fs.readdirSync(target, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    archiveFiles += 1;
    archiveBytes += fs.statSync(path.join(entry.parentPath ?? entry.path, entry.name)).size;
  }
}

// Retention: whole day-folders, oldest first. Only folders this script created are touched.
const root = backupsRoot();
const days = fs
  .readdirSync(root)
  .filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name))
  .sort();
for (const day of days.slice(0, Math.max(0, days.length - KEEP_DAYS))) {
  fs.rmSync(path.join(root, day), { recursive: true, force: true });
  console.log(`backup-writer: удалена старая копия ${day}`);
}

console.log(`backup-writer: копия в ${outDir}`);
console.log(`  admin.db ${(sqliteFileSize / 1024 / 1024).toFixed(2)} МБ`);
for (const [table, count] of Object.entries(rowCounts)) console.log(`  ${table}: ${count}`);
console.log(`  data/writing: ${archiveFiles} файлов, ${(archiveBytes / 1024 / 1024).toFixed(2)} МБ`);
console.log(`  хранится копий: ${Math.min(days.length, KEEP_DAYS)} (KEEP_DAYS=${KEEP_DAYS})`);
