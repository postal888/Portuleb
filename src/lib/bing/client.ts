/**
 * Bing Webmaster Tools API (JSON). Server-side only.
 * Key from Bing Webmaster → Settings → API Access (not Azure Web Search).
 */

const DEFAULT_API_BASE = "https://ssl.bing.com/webmaster/api.svc/json";
const DEFAULT_SITE_URL = "https://celpe-depe.com/";
const DEFAULT_TIMEOUT_MS = 30_000;

export type BingQueryStat = {
  query: string;
  clicks: number;
  impressions: number;
  avgClickPosition: number | null;
  avgImpressionPosition: number | null;
  date: string | null;
};

export type BingQueryAggregate = {
  matchedQuery: string;
  clicks: number;
  impressions: number;
  avgImpressionPosition: number | null;
  rows: BingQueryStat[];
};

export class BingApiError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "BingApiError";
    this.statusCode = statusCode;
  }
}

export function getBingWebmasterApiKey(): string | null {
  return (
    process.env.BING_WEBMASTER_API_KEY_CELPE?.trim() ||
    process.env.BING_WEBMASTER_API_KEY?.trim() ||
    process.env.BING_API_KEY_CELPE?.trim() ||
    process.env.BING_API_KEY?.trim() ||
    null
  );
}

export function getBingWebmasterSiteUrl(): string {
  const raw =
    process.env.BING_WEBMASTER_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    DEFAULT_SITE_URL;
  return raw.endsWith("/") ? raw : `${raw}/`;
}

export function getBingWebmasterApiBase(): string {
  const raw = process.env.BING_WEBMASTER_API_BASE?.trim() || DEFAULT_API_BASE;
  return raw.replace(/\/$/, "");
}

export function isBingConfigured(): boolean {
  return Boolean(getBingWebmasterApiKey() && getBingWebmasterSiteUrl());
}

function parseMicrosoftDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = /\/Date\((\d+)/.exec(value);
  if (!match) return value;
  const ms = Number(match[1]);
  if (!Number.isFinite(ms)) return null;
  return new Date(ms).toISOString();
}

function parseQueryStatRow(row: Record<string, unknown>): BingQueryStat | null {
  const query = String(row.Query ?? "").trim();
  if (!query) return null;
  const avgClick = row.AvgClickPosition;
  const avgImpression = row.AvgImpressionPosition;
  return {
    query,
    clicks: Number(row.Clicks ?? 0) || 0,
    impressions: Number(row.Impressions ?? 0) || 0,
    avgClickPosition:
      avgClick != null && Number(avgClick) > 0 ? Number(avgClick) / 10 : null,
    avgImpressionPosition:
      avgImpression != null && Number(avgImpression) > 0 ? Number(avgImpression) / 10 : null,
    date: parseMicrosoftDate(row.Date),
  };
}

function parseQueryStats(raw: unknown): BingQueryStat[] {
  const items = (raw as { d?: unknown[] })?.d;
  if (!Array.isArray(items)) return [];
  const out: BingQueryStat[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const row = parseQueryStatRow(item as Record<string, unknown>);
    if (row) out.push(row);
  }
  return out;
}

function webmasterErrorMessage(status: number, raw: unknown): string {
  if (status === 401 || status === 403) {
    return "Bing Webmaster: chave inválida (401). Use a API key de Bing Webmaster → Settings → API Access e confirme o site.";
  }
  if (raw && typeof raw === "object") {
    const msg = (raw as { Message?: string; message?: string }).Message?.trim()
      || (raw as { message?: string }).message?.trim();
    if (msg) return `Bing Webmaster HTTP ${status}: ${msg}`;
  }
  return `Bing Webmaster HTTP ${status}`;
}

async function bingWebmasterCall(
  method: string,
  extraParams?: Record<string, string>,
): Promise<unknown> {
  const apiKey = getBingWebmasterApiKey();
  if (!apiKey) {
    throw new BingApiError(503, "BING_WEBMASTER_API_KEY is not configured");
  }

  const url = new URL(`${getBingWebmasterApiBase()}/${method}`);
  url.searchParams.set("siteUrl", getBingWebmasterSiteUrl());
  url.searchParams.set("apikey", apiKey);
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      url.searchParams.set(key, value);
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new BingApiError(504, `Bing Webmaster timeout after ${DEFAULT_TIMEOUT_MS}ms`);
    }
    throw new BingApiError(
      502,
      err instanceof Error ? err.message : "Network error calling Bing Webmaster",
    );
  } finally {
    clearTimeout(timer);
  }

  const raw = await res.json().catch(() => null);
  if (!res.ok) {
    throw new BingApiError(res.status, webmasterErrorMessage(res.status, raw));
  }
  return raw;
}

export async function bingGetQueryStats(): Promise<BingQueryStat[]> {
  const raw = await bingWebmasterCall("GetQueryStats");
  return parseQueryStats(raw);
}

export async function bingGetQueryPageStats(query: string): Promise<BingQueryStat[]> {
  const cleaned = query.trim();
  if (!cleaned) {
    throw new BingApiError(400, "Empty query");
  }
  const raw = await bingWebmasterCall("GetQueryPageStats", { query: cleaned });
  return parseQueryStats(raw);
}

export function normalizeQueryForMatch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function queriesMatch(a: string, b: string): boolean {
  const na = normalizeQueryForMatch(a);
  const nb = normalizeQueryForMatch(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 8 && nb.length >= 8 && (na.includes(nb) || nb.includes(na))) return true;
  return false;
}

export function aggregateQueryStats(rows: BingQueryStat[]): BingQueryAggregate[] {
  const groups = new Map<string, BingQueryAggregate>();

  for (const row of rows) {
    const key = normalizeQueryForMatch(row.query);
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        matchedQuery: row.query,
        clicks: row.clicks,
        impressions: row.impressions,
        avgImpressionPosition: row.avgImpressionPosition,
        rows: [row],
      });
      continue;
    }
    existing.clicks += row.clicks;
    existing.impressions += row.impressions;
    existing.rows.push(row);
    const positions = existing.rows
      .map((r) => r.avgImpressionPosition)
      .filter((p): p is number => p != null);
    existing.avgImpressionPosition =
      positions.length > 0
        ? Math.round((positions.reduce((a, b) => a + b, 0) / positions.length) * 10) / 10
        : null;
  }

  return [...groups.values()].sort((a, b) => b.impressions - a.impressions);
}

export function findQueryInStats(
  targetQuery: string,
  aggregates: BingQueryAggregate[],
): BingQueryAggregate | null {
  for (const agg of aggregates) {
    if (queriesMatch(targetQuery, agg.matchedQuery)) return agg;
  }
  return null;
}

export function formatBingQueryStatsAnswer(
  query: string,
  rows: BingQueryStat[],
  aggregate: BingQueryAggregate | null,
): string {
  if (!aggregate || aggregate.impressions === 0) {
    return `Sem dados no Bing Webmaster para "${query}".`;
  }
  const pos =
    aggregate.avgImpressionPosition != null
      ? `pos. média ${aggregate.avgImpressionPosition}`
      : "pos. n/d";
  return [
    `Query BWT: ${aggregate.matchedQuery}`,
    `${aggregate.impressions} impressões, ${aggregate.clicks} cliques, ${pos}`,
    rows.length > 1 ? `${rows.length} registros semanais` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatBingStatsDetail(aggregate: BingQueryAggregate | null): string {
  if (!aggregate || aggregate.impressions === 0) return "—";
  const pos =
    aggregate.avgImpressionPosition != null
      ? `pos ${aggregate.avgImpressionPosition}`
      : "pos n/d";
  return `${pos} · ${aggregate.impressions} imp · ${aggregate.clicks} cliques`;
}
