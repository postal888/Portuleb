import { requireAdmin } from "@/lib/admin/auth";
import {
  AI_MONITORING_TARGET_HOST,
  AI_VISIBILITY_QUERY_PACKS,
  DEFAULT_AI_MONITORING_PACK_ID,
  analyzeAiVisibility,
  getAiMonitoringSiteUrl,
  resolveVisibilityQueries,
  summarizeVisibility,
  type AiMonitoringQueryResult,
} from "@/lib/admin/ai-monitoring";
import { listAiMonitoringRuns, saveAiMonitoringRun } from "@/lib/admin/db";
import { isPerplexityConfigured, perplexityChat } from "@/lib/perplexity/client";

function mapHistoryRows() {
  return listAiMonitoringRuns(40, "sonar").map((row) => {
    let citations: { url: string; title?: string }[] = [];
    let matchedUrls: string[] = [];
    try {
      citations = JSON.parse(row.citations_json) as { url: string; title?: string }[];
    } catch {
      citations = [];
    }
    try {
      matchedUrls = JSON.parse(row.matched_urls_json) as string[];
    } catch {
      matchedUrls = [];
    }
    const result: AiMonitoringQueryResult = {
      prompt: row.prompt,
      model: row.model,
      answer: row.answer,
      citations,
      mentioned: Boolean(row.mentioned),
      match: {
        inAnswer: Boolean(row.in_answer),
        inCitations: Boolean(row.in_citations),
        matchedUrls,
        matchedSnippets: [],
      },
      error: row.error_message ?? undefined,
      ranAt: row.created_at,
    };
    return { id: row.id, ...result };
  });
}

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isPerplexityConfigured(),
    sonarConfigured: isPerplexityConfigured(),
    model: "sonar",
    targetHost: AI_MONITORING_TARGET_HOST,
    siteUrl: getAiMonitoringSiteUrl(),
    defaultPackId: DEFAULT_AI_MONITORING_PACK_ID,
    packs: AI_VISIBILITY_QUERY_PACKS.map((p) => ({
      id: p.id,
      label: p.label,
      description: p.description,
      queryCount: p.queries.length,
      queries: [...p.queries],
    })),
    defaultPrompts: [...AI_VISIBILITY_QUERY_PACKS.find((p) => p.id === DEFAULT_AI_MONITORING_PACK_ID)!.queries],
    history: mapHistoryRows(),
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!isPerplexityConfigured()) {
    return Response.json(
      { error: "PERPLEXITY_API_KEY não configurada no servidor" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    pack?: unknown;
    packId?: unknown;
    prompts?: unknown;
    queriesText?: unknown;
    model?: unknown;
  } | null;

  const packId =
    (typeof body?.pack === "string" && body.pack) ||
    (typeof body?.packId === "string" && body.packId) ||
    null;

  const promptsRaw = Array.isArray(body?.prompts) ? body.prompts : [];
  const customPrompts = promptsRaw
    .filter((p): p is string => typeof p === "string")
    .map((p) => p.trim())
    .filter(Boolean);

  const queriesText = typeof body?.queriesText === "string" ? body.queriesText : null;

  const resolved = resolveVisibilityQueries({
    packId,
    prompts: customPrompts.length ? customPrompts : null,
    queriesText,
  });

  if (resolved.queries.length === 0) {
    return Response.json(
      { error: "Informe um pack válido ou ao menos uma query" },
      { status: 400 },
    );
  }

  const model =
    typeof body?.model === "string" && body.model.trim() ? body.model.trim() : "sonar";

  const results: AiMonitoringQueryResult[] = [];

  for (const prompt of resolved.queries) {
    const ranAt = new Date().toISOString();
    try {
      const chat = await perplexityChat({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful research assistant. Answer the user question with current web knowledge. " +
              "When recommending Celpe-Bras preparation resources, name specific websites and URLs.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        maxTokens: 900,
      });

      const match = analyzeAiVisibility(chat.content, chat.citations);
      const mentioned = match.inAnswer || match.inCitations;
      const result: AiMonitoringQueryResult = {
        prompt,
        model: chat.model,
        answer: chat.content,
        citations: chat.citations,
        mentioned,
        match,
        ranAt,
      };
      results.push(result);

      saveAiMonitoringRun({
        prompt,
        model: chat.model,
        answer: chat.content,
        citationsJson: JSON.stringify(chat.citations),
        mentioned,
        inAnswer: match.inAnswer,
        inCitations: match.inCitations,
        matchedUrlsJson: JSON.stringify(match.matchedUrls),
        provider: "sonar",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha na consulta Sonar";
      const result: AiMonitoringQueryResult = {
        prompt,
        model,
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
      };
      results.push(result);
      saveAiMonitoringRun({
        prompt,
        model,
        answer: "",
        citationsJson: "[]",
        mentioned: false,
        inAnswer: false,
        inCitations: false,
        matchedUrlsJson: "[]",
        errorMessage: message,
        provider: "sonar",
      });
    }
  }

  return Response.json({
    provider: "sonar",
    packId: resolved.packId,
    queries: resolved.queries,
    summary: summarizeVisibility(results),
    results,
    history: mapHistoryRows(),
  });
}
