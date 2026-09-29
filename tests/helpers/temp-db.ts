import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export type TempDb = {
  dir: string;
  file: string;
  close: () => void;
};

/**
 * Tests must never touch data/admin/admin.db. db.ts reads ADMIN_DB_PATH at import time,
 * so set the env var before any module that opens the database is imported.
 * WRITER_ARCHIVE_DIR keeps the JSON copies out of data/writing in the working tree.
 */
export function createTempDb(tag = "admin"): TempDb {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `portuleb-${tag}-`));
  const file = path.join(dir, `${tag}.db`);
  process.env.ADMIN_DB_PATH = file;
  process.env.WRITER_ARCHIVE_DIR = path.join(dir, "archive");
  return {
    dir,
    file,
    close: () => {
      fs.rmSync(dir, { recursive: true, force: true });
      delete process.env.ADMIN_DB_PATH;
      delete process.env.WRITER_ARCHIVE_DIR;
    },
  };
}

export async function loadWriterStore() {
  const store = await import("@/lib/writer/store");
  const db = await import("@/lib/admin/db");
  return { store, db, raw: () => db.getAdminDb() };
}
