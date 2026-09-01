/**
 * Brave Search API (Web Search). Server-side only.
 * Key: BRAVE_API_KEY or BRAVE_API_KEY_CELPE
 */

const BRAVE_WEB_SEARCH_URL = "https://api.search.brave.com/res/v1/web/search";
const DEFAULT_TIMEOUT_MS = 20_000;
const BRAVE_COUNTRIES = new Set([
  "AR", "AU", "AT", "BE", "BR", "CA", "CL", "DK", "FI", "FR", "DE", "GR", "HK", "IN", "ID",
  "IT", "JP", "KR", "MY", "MX", "NL", "NZ", "NO", "CN", "PL", "PT", "PH", "RU", "SA", "ZA",
  "ES", "SE", "CH", "TW", "TR", "GB", "US", "ALL",
]);

function normalizeBraveCountry(country?: string): string {
  const upper = (country ?? "BR").trim().toUpperCase();
  return BRAVE_COUNTRIES.has(upper) ? upper : "BR";
}

/** Brave expects BCP-47-ish codes (e.g. pt-br), not bare ISO 639-1 (pt → 422). */
function normalizeBraveSearchLang(lang?: string): string {
  const raw = (lang ?? "pt-br").trim().toLowerCase().replace("_", "-");
  if (raw === "pt") return "pt-br";
  return raw;
}

function braveErrorMessage(status: number, raw: unknown): string {
  if (raw && typeof raw === "object") {
    const err = (raw as { error?: { detail?: string; meta?: { errors?: { msg?: string }[] } } }).error;
    const detail = err?.detail?.trim();
    const validation = err?.meta?.errors?.map((e) => e.msg).filter(Boolean).join("; ");
    if (detail && validation) return `Brave Search HTTP ${status}: ${detail} (${validation})`;
    if (detail) return `Brave Search HTTP ${status}: ${detail}`;
    if (validation) return `Brave Search HTTP ${status}: ${validation}`;
  }
  return `Brave Search HTTP ${status}`;
}

export type BraveWebResult = {
  title: string;
  url: string;
  description?: string;
};

export type BraveSearchResponse = {
  query: string;
  results: BraveWebResult[];
  raw: unknown;
};

export class BraveApiError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "BraveApiError";
    this.statusCode = statusCode;
  }
}

export function getBraveApiKey(): string | null {
  return (
    process.env.BRAVE_API_KEY_CELPE?.trim() ||
    process.env.BRAVE_API_KEY?.trim() ||
    null
  );
}

export function isBraveConfigured(): boolean {
  return Boolean(getBraveApiKey());
}

export async function braveWebSearch(
  query: string,
  options?: {
    count?: number;
    country?: string;
    searchLang?: string;
    timeoutMs?: number;
  },
): Promise<BraveSearchResponse> {
  const apiKey = getBraveApiKey();
  if (!apiKey) {
    throw new BraveApiError(503, "BRAVE_API_KEY is not configured");
  }

  const cleaned = query.trim();
  if (!cleaned) {
    throw new BraveApiError(400, "Empty search query");
  }

  const url = new URL(BRAVE_WEB_SEARCH_URL);
  url.searchParams.set("q", cleaned);
  url.searchParams.set("count", String(options?.count ?? 10));
  url.searchParams.set("country", normalizeBraveCountry(options?.country));
  url.searchParams.set("search_lang", normalizeBraveSearchLang(options?.searchLang));

  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": apiKey,
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new BraveApiError(504, `Brave Search timeout after ${timeoutMs}ms`);
    }
    throw new BraveApiError(
      502,
      err instanceof Error ? err.message : "Network error calling Brave Search",
    );
  } finally {
    clearTimeout(timer);
  }

  const raw = await res.json().catch(() => null);

  if (res.status === 401) {
    throw new BraveApiError(401, "Brave Search: invalid API key (401)");
  }
  if (res.status === 429) {
    throw new BraveApiError(429, "Brave Search: rate limit (429)");
  }
  if (!res.ok) {
    throw new BraveApiError(res.status, braveErrorMessage(res.status, raw));
  }

  const web = (raw as { web?: { results?: unknown[] } })?.web;
  const items = Array.isArray(web?.results) ? web!.results! : [];
  const results: BraveWebResult[] = [];

  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const row = item as { title?: string; url?: string; description?: string };
    if (row.url && row.title) {
      results.push({
        title: row.title,
        url: row.url,
        description: row.description?.trim() || undefined,
      });
    }
  }

  return { query: cleaned, results, raw };
}

export function formatBraveResultsAnswer(results: BraveWebResult[]): string {
  if (results.length === 0) return "Nenhum resultado na SERP Brave.";
  return results
    .map((r, i) => {
      const desc = r.description ? `\n   ${r.description}` : "";
      return `${i + 1}. ${r.title}\n   ${r.url}${desc}`;
    })
    .join("\n\n");
}
