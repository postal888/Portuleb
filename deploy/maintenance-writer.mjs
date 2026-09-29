#!/usr/bin/env node
/**
 * Daily writer maintenance: applies the retention policy from deploy/writer-retention.mjs.
 *
 *   node deploy/maintenance-writer.mjs              # delete what the policy allows
 *   node deploy/maintenance-writer.mjs --dry-run    # same numbers, nothing written
 *
 * Cron (daily 04:55, i.e. after the 04:40 backup):
 *   55 4 * * * cd /var/www/celpe-de-pe && /usr/bin/node deploy/maintenance-writer.mjs >> /var/log/celpe-maintenance-writer.log 2>&1
 *
 * Guards, all deliberate:
 *   - refuses to touch anything unless a backup folder from the last 26 hours exists;
 *   - never deletes submissions, reports or e-mail deliveries — those go only with an admin erase;
 *   - never runs VACUUM: reclaiming pages is an operator decision on a live database;
 *   - logs aggregates only — no addresses, no essay text, no report tokens, no ids;
 *   - non-zero exit code on any failure, so cron mail shows the problem.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { backupsRoot, databasePath } from "./writer-paths.mjs";
import { WRITER_RETENTION, runWriterRetention } from "./writer-retention.mjs";

const FRESH_BACKUP_MS = 26 * 60 * 60 * 1000;
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

function newestBackup() {
  const root = backupsRoot();
  if (!fs.existsSync(root)) return null;
  const days = fs
    .readdirSync(root)
    .filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name))
    .sort()
    .reverse();
  for (const day of days) {
    const file = path.join(root, day, "admin.db");
    if (fs.existsSync(file)) return { day, mtimeMs: fs.statSync(file).mtimeMs };
  }
  return null;
}

function main() {
  if (args.includes("--help")) {
    console.log(
      `usage: node deploy/maintenance-writer.mjs [--dry-run]\n` +
        `retention: events ${WRITER_RETENTION.eventsDays}d, terminal sessions ${WRITER_RETENTION.terminalSessionDays}d, abandoned ${WRITER_RETENTION.abandonedSessionDays}d\n` +
        `refuses to run without a fresh backup; never vacuums; never deletes submissions/reports/deliveries`,
    );
    return 0;
  }

  const databaseFile = databasePath();
  if (!fs.existsSync(databaseFile)) {
    console.log(`maintenance-writer: нет базы ${databaseFile} — делать нечего`);
    return 0;
  }

  const backup = newestBackup();
  const backupAge = backup ? Date.now() - backup.mtimeMs : Number.POSITIVE_INFINITY;
  if (backupAge > FRESH_BACKUP_MS) {
    console.error(
      `maintenance-writer: свежей резервной копии нет (последняя: ${backup ? backup.day : "отсутствует"}). ` +
        `Сначала node deploy/backup-writer.mjs — prune без копии не запускается.`,
    );
    return 1;
  }

  const database = new Database(databaseFile);
  try {
    const result = runWriterRetention(database, { dryRun });
    const label = dryRun ? "проброс (dry-run, ничего не удалено)" : "готово";
    console.log(`maintenance-writer: ${label}; копия ${backup.day}`);
    console.log(
      `  границы: события < ${result.cutoffs.events}, финальные сессии < ${result.cutoffs.terminalSessions}, ` +
        `брошенные < ${result.cutoffs.abandonedSessions}`,
    );
    if (result.skipped) {
      console.log(`  ${result.skipped} — ничего не делаем`);
      return 0;
    }
    for (const [step, count] of Object.entries(result.deleted)) console.log(`  удалено ${step}: ${count}`);
    const left = result.remaining;
    console.log(
      `  осталось: сессий ${left.sessions} (из них в работе ${left.inFlight}), событий ${left.events}, ` +
        `отправок ${left.submissions}, отчётов ${left.reports}, писем ${left.deliveries}`,
    );
    const freePages = Number(database.pragma("freelist_count", { simple: true }));
    if (freePages > 10_000) {
      console.log(`  свободных страниц: ${freePages} — VACUUM сознательно не запускается, решение за оператором`);
    }
    return 0;
  } finally {
    database.close();
  }
}

try {
  process.exit(main());
} catch (error) {
  console.error(`maintenance-writer: ошибка — ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
