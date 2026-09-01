import {
  getAiMonitoringSiteUrl,
  resolveVisibilityQueries,
  summarizeVisibility,
  type AiMonitoringQueryResult,
} from "@/lib/admin/ai-monitoring";
import {
  aggregateQueryStats,
  bingGetQueryPageStats,
  bingGetQueryStats,
  findQueryInStats,
  formatBingQueryStatsAnswer,
  formatBingStatsDetail,
  type BingQueryAggregate,
  type BingQueryStat,
} from "@/lib/bing/client";
import { saveAiMonitoringRun } from "@/lib/admin/db";

export type BingQueryLookupResult = {
  query: string;
  siteUrl: string;
  rows: BingQueryStat[];
  aggregate: BingQueryAggregate | null;
  mentioned: boolean;
};

export async function runBingQueryLookup(query: string): Promise<BingQueryLookupResult> {
  const cleaned = query.trim();
  const [pageRows, allRows] = await Promise.all([
    bingGetQueryPageStats(cleaned),
    bingGetQueryStats(),
  ]);

  const aggregates = aggregateQueryStats(allRows);
  const aggregateFromAll = findQueryInStats(cleaned, aggregates);
  const aggregateFromPage =
    pageRows.length > 0
      ? aggregateQueryStats(pageRows)[0] ?? null
      : null;
  const aggregate = aggregateFromPage ?? aggregateFromAll;
  const rows = pageRows.length > 0 ? pageRows : (aggregate?.rows ?? []);

  return {
    query: cleaned,
    siteUrl: getAiMonitoringSiteUrl(),
    rows,
    aggregate,
    mentioned: Boolean(aggregate && aggregate.impressions > 0),
  };
}

export async function runBingVisibilityBatch(input: {
  packId?: string | null;
  prompts?: string[] | null;
  queriesText?: string | null;
}) {
  const resolved = resolveVisibilityQueries(input);
  const allStats = await bingGetQueryStats();
  const aggregates = aggregateQueryStats(allStats);
  const results: (AiMonitoringQueryResult & { bing?: BingQueryAggregate | null })[] = [];

  for (const prompt of resolved.queries) {
    const ranAt = new Date().toISOString();
    try {
      const aggregate = findQueryInStats(prompt, aggregates);
      const mentioned = Boolean(aggregate && aggregate.impressions > 0);
      const answer = formatBingQueryStatsAnswer(prompt, aggregate?.rows ?? [], aggregate);
      const detail = formatBingStatsDetail(aggregate);
      const result: AiMonitoringQueryResult & { bing?: BingQueryAggregate | null } = {
        prompt,
        model: "bing-webmaster",
        answer,
        citations: aggregate
          ? [{ url: aggregate.matchedQuery, title: detail }]
          : [],
        mentioned,
        match: {
          inAnswer: mentioned,
          inCitations: mentioned,
          matchedUrls: aggregate ? [aggregate.matchedQuery] : [],
          matchedSnippets: aggregate ? [detail] : [],
        },
        ranAt,
        bing: aggregate,
      };
      results.push(result);
      saveAiMonitoringRun({
        prompt,
        model: "bing-webmaster",
        answer,
        citationsJson: JSON.stringify(result.citations),
        mentioned,
        inAnswer: mentioned,
        inCitations: mentioned,
        matchedUrlsJson: JSON.stringify(result.match.matchedUrls),
        provider: "bing",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha no Bing Webmaster";
      results.push({
        prompt,
        model: "bing-webmaster",
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
        bing: null,
      });
      saveAiMonitoringRun({
        prompt,
        model: "bing-webmaster",
        answer: "",
        citationsJson: "[]",
        mentioned: false,
        inAnswer: false,
        inCitations: false,
        matchedUrlsJson: "[]",
        errorMessage: message,
        provider: "bing",
      });
    }
  }

  return {
    packId: resolved.packId,
    queries: resolved.queries,
    summary: summarizeVisibility(results),
    results,
    siteUrl: getAiMonitoringSiteUrl(),
    totalQueriesInWebmaster: aggregates.length,
  };
}

export async function runBingTopQueries(limit = 30) {
  const rows = await bingGetQueryStats();
  return aggregateQueryStats(rows).slice(0, limit);
}
