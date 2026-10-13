import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import Database from "better-sqlite3";
import { migrateWriterObservability } from "@/lib/writer/schema-ddl";

/**
 * src/lib/writer/schema-ddl.ts is the only executable source of truth for the writer schema.
 * migrations/004_writer_observability.sql is operator documentation — it never reaches the
 * server (deploy/rsync copies src, public and configs only). These tests are what keeps the
 * documented copy from drifting away from the one that actually runs.
 */

const REFERENCE_SQL = path.join(process.cwd(), "migrations", "004_writer_observability.sql");

const TABLES = [
  "writer_sessions",
  "writer_events",
  "writing_submissions",
  "writing_reports",
  "email_deliveries",
  "writer_login_links",
  "writer_accounts",
  "writer_cabinet_sessions",
];

function fromCode(): Database.Database {
  const database = new Database(":memory:");
  migrateWriterObservability(database);
  return database;
}

function fromReferenceFile(): Database.Database {
  const database = new Database(":memory:");
  database.exec(fs.readFileSync(REFERENCE_SQL, "utf8"));
  return database;
}

/** SQLite stores the statement text as typed, so only indentation can differ between the two. */
function normalize(sql: string | null): string {
  return (sql ?? "").replace(/\s+/g, " ").trim();
}

type Row = Record<string, unknown>;
const rows = (value: unknown): Row[] => value as Row[];

function statements(database: Database.Database) {
  return rows(
    database
      .prepare(`SELECT type, name, sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type, name`)
      .all(),
  ).map((row) => ({ type: String(row.type), name: String(row.name), sql: normalize(row.sql as string) }));
}

function columns(database: Database.Database, table: string) {
  return rows(
    database
      .prepare(`SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info(?) ORDER BY cid`)
      .all(table),
  ).map((row) => Object.values(row));
}

function indexes(database: Database.Database, table: string) {
  return rows(
    database.prepare(`SELECT name, "unique" FROM pragma_index_list(?) ORDER BY name`).all(table),
  ).map((index) => {
    const name = String(index.name);
    return {
      name,
      unique: Number(index.unique),
      columns: rows(
        database.prepare(`SELECT name FROM pragma_index_info(?) ORDER BY seqno`).all(name),
      ).map((column) => column.name as string | null),
    };
  });
}

describe("исполняемая схема и справочный SQL", () => {
  it("файл 004 объявлен справочным, а не вторым источником истины", () => {
    const text = fs.readFileSync(REFERENCE_SQL, "utf8");
    expect(text).toContain("src/lib/writer/schema-ddl.ts");
    expect(text.toLowerCase()).toMatch(/документаци|reference/);
  });

  it("DDL из кода и из файла дают одинаковый набор объектов", () => {
    const code = fromCode();
    const file = fromReferenceFile();
    try {
      const expected = statements(code);
      expect(expected.length).toBeGreaterThan(5);
      expect(statements(file)).toEqual(expected);
      for (const table of TABLES) {
        expect(expected.some((row) => row.name === table), `нет таблицы ${table} в DDL`).toBe(true);
      }
    } finally {
      code.close();
      file.close();
    }
  });

  it("колонки совпадают по имени, типу, NOT NULL, умолчанию и pk", () => {
    const code = fromCode();
    const file = fromReferenceFile();
    try {
      for (const table of TABLES) {
        expect(columns(file, table), `расхождение по колонкам ${table}`).toEqual(columns(code, table));
      }
    } finally {
      code.close();
      file.close();
    }
  });

  it("индексы совпадают по составу и уникальности", () => {
    const code = fromCode();
    const file = fromReferenceFile();
    try {
      for (const table of TABLES) {
        expect(indexes(file, table), `расхождение по индексам ${table}`).toEqual(indexes(code, table));
      }
    } finally {
      code.close();
      file.close();
    }
  });

  it("справочная копия идемпотентна, как и код", () => {
    const database = new Database(":memory:");
    try {
      const first = statements(database);
      expect(first).toHaveLength(0);
      migrateWriterObservability(database);
      migrateWriterObservability(database);
      const afterCode = statements(database);
      database.exec(fs.readFileSync(REFERENCE_SQL, "utf8"));
      database.exec(fs.readFileSync(REFERENCE_SQL, "utf8"));
      expect(statements(database)).toEqual(afterCode);
    } finally {
      database.close();
    }
  });

  it("в справочной копии нет данных и нет разрушающих операторов", () => {
    const body = fs
      .readFileSync(REFERENCE_SQL, "utf8")
      .split(/\r?\n/)
      .filter((line) => !line.trimStart().startsWith("--"))
      .join("\n")
      .toUpperCase();
    expect(body).not.toMatch(/\bINSERT\s+INTO\b/);
    expect(body).not.toMatch(/\bUPDATE\b/);
    expect(body).not.toMatch(/\bDELETE\s+FROM\b/);
    expect(body).not.toMatch(/\bDROP\b/);
    expect(body).not.toMatch(/\bALTER\b/);
  });
});
