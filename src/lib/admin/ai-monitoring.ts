import type { PerplexityCitation } from "@/lib/perplexity/client";

export const AI_MONITORING_TARGET_HOST = "celpe-depe.com";

export type AiVisibilityQueryPack = {
  id: string;
  label: string;
  description: string;
  queries: readonly string[];
};

/** Curated query sets for batch visibility checks in Sonar. */
export const AI_VISIBILITY_QUERY_PACKS: AiVisibilityQueryPack[] = [
  {
    id: "core",
    label: "Core — preparação gratuita",
    description: "Consultas genéricas sobre estudo gratuito ao Celpe-Bras.",
    queries: [
      "Como se preparar para o Celpe-Bras de graça?",
      "Quais os melhores sites gratuitos para praticar Celpe-Bras?",
      "Onde encontrar provas anteriores do Celpe-Bras online?",
      "Como treinar compreensão auditiva para o Celpe-Bras?",
      "Análise da Tarefa 1 do Celpe-Bras — onde estudar?",
      "Portal gratuito de preparação para o Celpe-Bras em português",
    ],
  },
  {
    id: "provas-materiais",
    label: "Provas & materiais",
    description: "Intenção de download/prática com provas anteriores.",
    queries: [
      "provas anteriores Celpe-Bras PDF grátis",
      "Celpe-Bras prova 2026-1 download",
      "simulado Celpe-Bras online grátis",
      "gabarito Celpe-Bras prova anterior",
      "onde baixar provas Celpe-Bras Inep",
    ],
  },
  {
    id: "tarefas",
    label: "Tarefas do exame",
    description: "Leitura, escrita, oral e auditiva.",
    queries: [
      "como treinar produção escrita Celpe-Bras",
      "compreensão oral Celpe-Bras prática",
      "compreensão de leitura Celpe-Bras exercícios",
      "dicas entrevista oral Celpe-Bras",
      "Tarefa 2 Celpe-Bras exemplos",
    ],
  },
  {
    id: "international",
    label: "EN / RU",
    description: "Consultas em inglês e russo sobre preparação.",
    queries: [
      "Celpe-Bras free preparation website",
      "Celpe-Bras listening practice with Portuguese subtitles",
      "how to prepare for Celpe-Bras exam for free",
      "Бесплатная подготовка к Celpe-Bras — где практиковать?",
      "экзамен Celpe-Bras как подготовиться бесплатно",
    ],
  },
  {
    id: "brand",
    label: "Marca & descoberta",
    description: "Busca direta por nome do portal e alternativas.",
    queries: [
      "celpe-depe.com",
      "Celpe Dê Pé preparação",
      "celpe de pe site preparação",
      "alternativas gratuitas Celpe-Bras além do Inep",
    ],
  },
];

export const DEFAULT_AI_MONITORING_PACK_ID = "core";

export const DEFAULT_AI_MONITORING_PROMPTS = AI_VISIBILITY_QUERY_PACKS.find(
  (p) => p.id === DEFAULT_AI_MONITORING_PACK_ID,
)!.queries;

export function getAiVisibilityQueryPack(packId: string): AiVisibilityQueryPack | undefined {
  return AI_VISIBILITY_QUERY_PACKS.find((p) => p.id === packId);
}

export function resolveVisibilityQueries(input: {
  packId?: string | null;
  prompts?: string[] | null;
  queriesText?: string | null;
  max?: number;
}): { packId: string | null; queries: string[] } {
  const max = input.max ?? 12;
  const pack = input.packId ? getAiVisibilityQueryPack(input.packId) : undefined;
  if (pack) {
    return { packId: pack.id, queries: [...pack.queries].slice(0, max) };
  }

  if (input.queriesText?.trim()) {
    return { packId: null, queries: parseQueryList(input.queriesText, max) };
  }

  const custom = parseQueryList((input.prompts ?? []).join("\n"), max);
  return { packId: null, queries: custom };
}

/** Parse pasted list: newlines, commas, numbered/bullet lines. Dedupes, caps at max. */
export function parseQueryList(raw: string, max = 12): string[] {
  const text = raw.trim();
  if (!text) return [];

  const out: string[] = [];
  const seen = new Set<string>();

  const push = (item: string) => {
    let cleaned = item.trim();
    cleaned = cleaned.replace(/^[-*•–—]\s+/, "");
    cleaned = cleaned.replace(/^\d+[.)]\s+/, "");
    cleaned = cleaned.replace(/^["']|["']$/g, "");
    if (!cleaned) return;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(cleaned);
  };

  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  if (lines.length === 1 && /[,;|]/.test(lines[0]!)) {
    for (const part of lines[0]!.split(/[,;|]/)) push(part);
    return out.slice(0, max);
  }

  for (const line of lines) {
    if (/[,;|]/.test(line) && !/^\d+[.)]/.test(line)) {
      for (const part of line.split(/[,;|]/)) push(part);
    } else {
      push(line);
    }
  }

  return out.slice(0, max);
}

const BRAND_PATTERNS = [
  /celpe-?de-?pe\.com/i,
  /celpe[\s-]?dê[\s-]?pé/i,
  /celpe[\s-]?de[\s-]?pe/i,
] as const;

export type AiMentionMatch = {
  inAnswer: boolean;
  inCitations: boolean;
  matchedUrls: string[];
  matchedSnippets: string[];
};

export type AiMonitoringQueryResult = {
  prompt: string;
  model: string;
  answer: string;
  citations: PerplexityCitation[];
  mentioned: boolean;
  match: AiMentionMatch;
  error?: string;
  ranAt: string;
};

export function getAiMonitoringSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://celpe-depe.com").replace(/\/$/, "");
}

function normalizeHost(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

export function isTargetHost(urlOrHost: string): boolean {
  try {
    const withProto = /^https?:\/\//i.test(urlOrHost) ? urlOrHost : `https://${urlOrHost}`;
    const host = normalizeHost(new URL(withProto).hostname);
    return host === AI_MONITORING_TARGET_HOST || host.endsWith(`.${AI_MONITORING_TARGET_HOST}`);
  } catch {
    return /celpe-?de-?pe\.com/i.test(urlOrHost);
  }
}

export function textMentionsBrand(text: string): boolean {
  return BRAND_PATTERNS.some((re) => re.test(text));
}

export function analyzeAiVisibility(
  answer: string,
  citations: PerplexityCitation[],
): AiMentionMatch {
  const matchedUrls = citations
    .map((c) => c.url)
    .filter((url) => isTargetHost(url));

  const matchedSnippets: string[] = [];
  if (textMentionsBrand(answer)) {
    const lines = answer.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (textMentionsBrand(line)) matchedSnippets.push(line.slice(0, 220));
      if (matchedSnippets.length >= 3) break;
    }
    if (matchedSnippets.length === 0) {
      matchedSnippets.push(answer.slice(0, 220));
    }
  }

  return {
    inAnswer: matchedSnippets.length > 0,
    inCitations: matchedUrls.length > 0,
    matchedUrls: [...new Set(matchedUrls)],
    matchedSnippets,
  };
}

export function analyzeBraveVisibility(
  results: { title: string; url: string; description?: string }[],
): AiMentionMatch {
  const matchedUrls = results.map((r) => r.url).filter((url) => isTargetHost(url));

  const matchedSnippets: string[] = [];
  for (const row of results) {
    const text = `${row.title} ${row.description ?? ""}`;
    if (textMentionsBrand(text) || isTargetHost(row.url)) {
      matchedSnippets.push(`${row.title} — ${row.url}`.slice(0, 220));
      if (matchedSnippets.length >= 3) break;
    }
  }

  return {
    inAnswer: matchedSnippets.some((s) => textMentionsBrand(s)),
    inCitations: matchedUrls.length > 0,
    matchedUrls: [...new Set(matchedUrls)],
    matchedSnippets,
  };
}

export function summarizeVisibility(results: AiMonitoringQueryResult[]) {
  const total = results.length;
  const mentioned = results.filter((r) => r.mentioned && !r.error).length;
  const errors = results.filter((r) => r.error).length;
  const citationHits = results.filter((r) => r.match.inCitations).length;
  const answerHits = results.filter((r) => r.match.inAnswer).length;
  return { total, mentioned, missing: total - mentioned - errors, errors, citationHits, answerHits };
}
