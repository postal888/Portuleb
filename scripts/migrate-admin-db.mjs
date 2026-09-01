import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const DB_PATH = path.join(DATA_DIR, "admin.db");

if (!fs.existsSync(DB_PATH)) {
  console.log("No admin.db at", DB_PATH);
  process.exit(0);
}

const db = new Database(DB_PATH);

function migrateAiMonitoringRuns() {
  const cols = db.prepare("PRAGMA table_info(ai_monitoring_runs)").all();
  if (!cols.some((c) => c.name === "provider")) {
    db.exec(
      "ALTER TABLE ai_monitoring_runs ADD COLUMN provider TEXT NOT NULL DEFAULT 'sonar'",
    );
    console.log("Added provider column to ai_monitoring_runs");
  } else {
    console.log("provider column already exists");
  }
  db.exec(
    "CREATE INDEX IF NOT EXISTS idx_ai_monitoring_provider ON ai_monitoring_runs(provider)",
  );
}

migrateAiMonitoringRuns();
console.log(
  "Schema:",
  JSON.stringify(db.prepare("PRAGMA table_info(ai_monitoring_runs)").all()),
);
