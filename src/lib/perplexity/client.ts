/**
 * Shared Perplexity Sonar client for admin AI actions.
 * Key order: PERPLEXITY_API_KEY_CELPE → PERPLEXITY_API_KEY.
 */

const PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions";
const MAX_DOMAIN_FILTER = 20;
const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_MODEL = "sonar-pro";

export const OFFICIAL_DOMAINS = [
  "gov.br",
  "inep.gov.br",
  "mec.gov.br",
  "portal.inep.gov.br",
] as const;

export type PerplexityUsage = Record<string, unknown>;

export type SonarResult = {
  model: string;
  answer: string;
  citations: string[];
  usage: PerplexityUsage;
};

export class PerplexityApiError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.name = "PerplexityApiError";
    this.statusCode = statusCode;
    this.code = code ?? `perplexity_error_${statusCode}`;
  }
}

export function getPerplexityApiKey(): string | null {
  return (
    process.env.PERPLEXITY_API_KEY_CELPE?.trim() ||
    process.env.PERPLEXITY_API_KEY?.trim() ||
    null
  );
}

export function isPerplexityConfigured(): boolean {
  return Boolean(getPerplexityApiKey());
}

export function normalizeSearchDomainFilter(domains: string[]): string[] {
  const cleaned = domains.map((d) => d.trim()).filter(Boolean);
  if (cleaned.length === 0) return [];
  if (cleaned.length > MAX_DOMAIN_FILTER) {
    throw new Error(`search_domain_filter supports at most ${MAX_DOMAIN_FILTER} entries`);
  }
  const hasAllow = cleaned.some((d) => !d.startsWith("-"));
  const hasDeny = cleaned.some((d) => d.startsWith("-"));
  if (hasAllow && hasDeny) {
    throw new Error("search_domain_filter cannot mix allowlist and denylist in one request");
  }
  return cleaned;
}

function extractCitationUrls(data: Record<string, unknown>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (url: string) => {
    const cleaned = url.trim();
    if (!cleaned || seen.has(cleaned)) return;
    seen.add(cleaned);
    out.push(cleaned);
  };

  if (Array.isArray(data.citations)) {
    for (const item of data.citations) {
      if (typeof item === "string") push(item);
      else if (item && typeof item === "object") {
        const row = item as { url?: string };
        if (row.url) push(row.url);
      }
    }
  }

  if (Array.isArray(data.search_results)) {
    for (const item of data.search_results) {
      if (!item || typeof item !== "object") continue;
      const row = item as { url?: string };
      if (row.url) push(row.url);
    }
  }

  return out;
}

function extractUsage(data: Record<string, unknown>): PerplexityUsage {
  const usage = data.usage;
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return {};
  return { ...(usage as Record<string, unknown>) };
}

/** Thin wrapper used by research / brief / audit. */
export async function callSonar(options: {
  systemPrompt: string;
  userPrompt: string;
  domains?: readonly string[] | string[] | null;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
}): Promise<SonarResult> {
  const apiKey = getPerplexityApiKey();
  if (!apiKey) {
    throw new PerplexityApiError(503, "PERPLEXITY_API_KEY_CELPE / PERPLEXITY_API_KEY is not configured", "not_configured");
  }

  const model = options.model ?? DEFAULT_MODEL;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const payload: Record<string, unknown> = {
    model,
    search_type: "auto",
    messages: [
      { role: "system", content: options.systemPrompt },
      { role: "user", content: options.userPrompt },
    ],
    temperature: options.temperature ?? 0.2,
    max_tokens: options.maxTokens ?? 2048,
  };

  if (options.domains?.length) {
    payload.search_domain_filter = normalizeSearchDomainFilter([...options.domains]);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(PERPLEXITY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new PerplexityApiError(504, `Perplexity timeout after ${timeoutMs}ms`, "timeout");
    }
    throw new PerplexityApiError(
      502,
      err instanceof Error ? err.message : "Network error calling Perplexity",
      "network_error",
    );
  } finally {
    clearTimeout(timer);
  }

  const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;

  if (res.status === 429) {
    throw new PerplexityApiError(429, "rate_limited", "rate_limited");
  }
  if (res.status === 401) {
    throw new PerplexityApiError(401, "Perplexity unauthorized (401)", "unauthorized");
  }
  if (res.status >= 400) {
    const apiMsg =
      data && typeof data.error === "object" && data.error && "message" in data.error
        ? String((data.error as { message?: string }).message ?? "")
        : "";
    throw new PerplexityApiError(
      res.status,
      apiMsg || `perplexity_error_${res.status}`,
      `perplexity_error_${res.status}`,
    );
  }

  const choices = data?.choices;
  const answer =
    Array.isArray(choices) &&
    choices[0] &&
    typeof choices[0] === "object" &&
    (choices[0] as { message?: { content?: string } }).message?.content?.trim();

  if (!answer) {
    throw new PerplexityApiError(502, "Perplexity returned an empty response", "empty_response");
  }

  return {
    model: typeof data?.model === "string" ? data.model : model,
    answer,
    citations: data ? extractCitationUrls(data) : [],
    usage: data ? extractUsage(data) : {},
  };
}

/** @deprecated Prefer callSonar for new admin AI actions. Kept for visibility monitoring. */
export type PerplexityMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type PerplexityChatOptions = {
  model?: string;
  messages: PerplexityMessage[];
  temperature?: number;
  maxTokens?: number;
  searchDomainFilter?: string[];
  searchType?: string;
  timeoutMs?: number;
};

export type PerplexityCitation = { url: string; title?: string };

export type PerplexityChatResult = {
  content: string;
  model: string;
  citationUrls: string[];
  citations: PerplexityCitation[];
  usage: PerplexityUsage;
  httpStatus: number;
  raw: unknown;
};

export async function perplexityChat(
  options: PerplexityChatOptions,
): Promise<PerplexityChatResult> {
  const system = options.messages.find((m) => m.role === "system")?.content ?? "";
  const userParts = options.messages.filter((m) => m.role === "user").map((m) => m.content);
  const result = await callSonar({
    systemPrompt: system || "You are a helpful research assistant.",
    userPrompt: userParts.join("\n\n") || "Hello",
    domains: options.searchDomainFilter,
    model: options.model ?? "sonar",
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    timeoutMs: options.timeoutMs,
  });

  return {
    content: result.answer,
    model: result.model,
    citationUrls: result.citations,
    citations: result.citations.map((url) => ({ url })),
    usage: result.usage,
    httpStatus: 200,
    raw: result,
  };
}
