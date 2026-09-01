import {
  AI_MONITORING_TARGET_HOST,
  analyzeBraveVisibility,
  getAiMonitoringSiteUrl,
  resolveVisibilityQueries,
  summarizeVisibility,
  type AiMonitoringQueryResult,
} from "@/lib/admin/ai-monitoring";
import {
  braveWebSearch,
  formatBraveResultsAnswer,
  type BraveWebResult,
} from "@/lib/brave/client";
import { saveAiMonitoringRun } from "@/lib/admin/db";

export type BraveSearchHit = BraveWebResult & {
  rank: number;
  isTarget: boolean;
};

export function mapBraveHits(results: BraveWebResult[]): BraveSearchHit[] {
  return results.map((r, i) => ({
    ...r,
    rank: i + 1,
    isTarget: /celpe-?de-?pe\.com/i.test(r.url),
  }));
}

export async function runBraveSingleSearch(query: string, count = 10) {
  const search = await braveWebSearch(query, { count, country: "BR", searchLang: "pt-br" });
  const hits = mapBraveHits(search.results);
  const targetRank = hits.find((h) => h.isTarget)?.rank ?? null;
  return {
    query: search.query,
    hits,
    targetRank,
    targetHost: AI_MONITORING_TARGET_HOST,
  };
}

export async function runBraveVisibilityBatch(input: {
  packId?: string | null;
  prompts?: string[] | null;
  queriesText?: string | null;
}) {
  const resolved = resolveVisibilityQueries(input);
  const results: AiMonitoringQueryResult[] = [];

  for (const prompt of resolved.queries) {
    const ranAt = new Date().toISOString();
    try {
      const search = await braveWebSearch(prompt, { count: 10, country: "BR", searchLang: "pt-br" });
      const citations = search.results.map((r) => ({ url: r.url, title: r.title }));
      const match = analyzeBraveVisibility(search.results);
      const mentioned = match.inAnswer || match.inCitations;
      const result: AiMonitoringQueryResult = {
        prompt,
        model: "brave-web",
        answer: formatBraveResultsAnswer(search.results),
        citations,
        mentioned,
        match,
        ranAt,
      };
      results.push(result);
      saveAiMonitoringRun({
        prompt,
        model: "brave-web",
        answer: result.answer,
        citationsJson: JSON.stringify(citations),
        mentioned,
        inAnswer: match.inAnswer,
        inCitations: match.inCitations,
        matchedUrlsJson: JSON.stringify(match.matchedUrls),
        provider: "brave",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha na busca Brave";
      results.push({
        prompt,
        model: "brave-web",
        answer: "",
        citations: [],
        mentioned: false,
        match: {
          inAnswer: false,
          inCitations: false,
          matchedUrls: [],
          matchedSnippets: [],
        },
        error: message,
        ranAt,
      });
      saveAiMonitoringRun({
        prompt,
        model: "brave-web",
        answer: "",
        citationsJson: "[]",
        mentioned: false,
        inAnswer: false,
        inCitations: false,
        matchedUrlsJson: "[]",
        errorMessage: message,
        provider: "brave",
      });
    }
  }

  return {
    packId: resolved.packId,
    queries: resolved.queries,
    summary: summarizeVisibility(results),
    results,
    siteUrl: getAiMonitoringSiteUrl(),
    targetHost: AI_MONITORING_TARGET_HOST,
  };
}
