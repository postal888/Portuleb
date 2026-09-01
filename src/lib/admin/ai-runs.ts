import { getAdminDb } from "@/lib/admin/db";
import type { PerplexityUsage } from "@/lib/perplexity/client";

export type AiRunAction = "research" | "brief" | "audit";
export type AiRunStatus = "ok" | "error";

export type AiRunRow = {
  id: number;
  created_at: string;
  action: string;
  input_topic: string | null;
  input_url: string | null;
  model: string;
  domains_json: string | null;
  answer: string | null;
  citations_json: string | null;
  usage_json: string | null;
  status: string;
  error_message: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
};

export type AiRunListFilters = {
  action?: AiRunAction | "all";
  status?: AiRunStatus | "all";
  limit?: number;
};

export function ensureAiRunsTable() {
  const db = getAdminDb();
  db.exec(`
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
}

export function logAiRun(input: {
  action: AiRunAction;
  inputTopic?: string | null;
  inputUrl?: string | null;
  model?: string | null;
  domains?: string[] | null;
  answer?: string | null;
  citations?: string[] | null;
  usage?: PerplexityUsage | null;
  status?: AiRunStatus;
  errorMessage?: string | null;
}): number {
  ensureAiRunsTable();
  const db = getAdminDb();
  const result = db
    .prepare(
      `INSERT INTO ai_runs
        (action, input_topic, input_url, model, domains_json,
         answer, citations_json, usage_json, status, error_message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.action,
      input.inputTopic ?? null,
      input.inputUrl ?? null,
      input.model ?? "sonar-pro",
      JSON.stringify(input.domains ?? []),
      input.answer ?? null,
      JSON.stringify(input.citations ?? []),
      JSON.stringify(input.usage ?? {}),
      input.status ?? "ok",
      input.errorMessage ?? null,
    );
  return Number(result.lastInsertRowid);
}

function parseJsonArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function parseJsonObject(raw: string | null): Record<string, unknown> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

export function mapAiRunRow(row: AiRunRow) {
  return {
    id: row.id,
    createdAt: row.created_at,
    action: row.action as AiRunAction,
    inputTopic: row.input_topic,
    inputUrl: row.input_url,
    model: row.model,
    domains: parseJsonArray(row.domains_json),
    answer: row.answer,
    citations: parseJsonArray(row.citations_json),
    usage: parseJsonObject(row.usage_json),
    status: row.status as AiRunStatus,
    errorMessage: row.error_message,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
  };
}

export function listAiRuns(filters: AiRunListFilters = {}) {
  ensureAiRunsTable();
  const db = getAdminDb();
  const limit = Math.min(Math.max(filters.limit ?? 40, 1), 100);
  const action = filters.action && filters.action !== "all" ? filters.action : null;
  const status = filters.status && filters.status !== "all" ? filters.status : null;

  if (action && status) {
    return (
      db
        .prepare(
          `SELECT * FROM ai_runs WHERE action = ? AND status = ?
           ORDER BY created_at DESC, id DESC LIMIT ?`,
        )
        .all(action, status, limit) as AiRunRow[]
    ).map(mapAiRunRow);
  }
  if (action) {
    return (
      db
        .prepare(
          `SELECT * FROM ai_runs WHERE action = ?
           ORDER BY created_at DESC, id DESC LIMIT ?`,
        )
        .all(action, limit) as AiRunRow[]
    ).map(mapAiRunRow);
  }
  if (status) {
    return (
      db
        .prepare(
          `SELECT * FROM ai_runs WHERE status = ?
           ORDER BY created_at DESC, id DESC LIMIT ?`,
        )
        .all(status, limit) as AiRunRow[]
    ).map(mapAiRunRow);
  }
  return (
    db
      .prepare(`SELECT * FROM ai_runs ORDER BY created_at DESC, id DESC LIMIT ?`)
      .all(limit) as AiRunRow[]
  ).map(mapAiRunRow);
}

function usageCost(usage: Record<string, unknown>): number {
  const cost = usage.cost;
  if (typeof cost === "number" && Number.isFinite(cost)) return cost;
  if (cost && typeof cost === "object" && !Array.isArray(cost)) {
    const total = (cost as { total_cost?: unknown }).total_cost;
    if (typeof total === "number" && Number.isFinite(total)) return total;
  }
  return 0;
}

export function summarizeAiRunCosts(days = 30) {
  ensureAiRunsTable();
  const db = getAdminDb();
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);
  const rows = db
    .prepare(
      `SELECT action, status, usage_json FROM ai_runs
       WHERE created_at >= ? ORDER BY created_at DESC`,
    )
    .all(since.toISOString()) as Pick<AiRunRow, "action" | "status" | "usage_json">[];

  let totalCost = 0;
  let ok = 0;
  let error = 0;
  const byAction: Record<string, { count: number; cost: number }> = {};

  for (const row of rows) {
    const cost = usageCost(parseJsonObject(row.usage_json));
    totalCost += cost;
    if (row.status === "ok") ok += 1;
    else error += 1;
    const bucket = byAction[row.action] ?? { count: 0, cost: 0 };
    bucket.count += 1;
    bucket.cost += cost;
    byAction[row.action] = bucket;
  }

  return {
    days,
    totalRuns: rows.length,
    ok,
    error,
    totalCost,
    byAction,
  };
}
