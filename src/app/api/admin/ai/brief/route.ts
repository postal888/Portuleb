import { requireAdmin } from "@/lib/admin/auth";
import { mapAiRouteError } from "@/lib/admin/ai-action-log";
import { listAiRuns, logAiRun } from "@/lib/admin/ai-runs";
import { CELPE_BRIEF_MODEL, runCelpeContentBrief } from "@/lib/admin/ai-brief";
import { OFFICIAL_DOMAINS } from "@/lib/perplexity/client";
import { isPerplexityConfigured } from "@/lib/perplexity/client";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isPerplexityConfigured(),
    model: CELPE_BRIEF_MODEL,
    domains: [...OFFICIAL_DOMAINS],
    accepts: ["query", "keyword"],
    history: listAiRuns({ action: "brief", limit: 20 }),
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!isPerplexityConfigured()) {
    return Response.json(
      { ok: false, error: "PERPLEXITY_API_KEY_CELPE / PERPLEXITY_API_KEY não configurada" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    query?: unknown;
    keyword?: unknown;
  } | null;

  const keyword =
    (typeof body?.keyword === "string" && body.keyword) ||
    (typeof body?.query === "string" && body.query) ||
    "";

  if (!keyword.trim()) {
    return Response.json(
      { ok: false, error: "Campo obrigatório: query (ou keyword)" },
      { status: 400 },
    );
  }

  try {
    const result = await runCelpeContentBrief(keyword);
    logAiRun({
      action: "brief",
      inputTopic: result.query,
      model: result.model,
      domains: result.domains,
      answer: result.answer,
      citations: result.citations,
      usage: result.usage,
      status: "ok",
    });
    return Response.json({
      ok: true,
      model: result.model,
      domains: result.domains,
      answer: result.answer,
      citations: result.citations,
      usage: result.usage,
      query: result.query,
    });
  } catch (err) {
    const mapped = mapAiRouteError(err);
    logAiRun({
      action: "brief",
      inputTopic: keyword.trim(),
      model: CELPE_BRIEF_MODEL,
      domains: [...OFFICIAL_DOMAINS],
      status: "error",
      errorMessage: mapped.error,
    });
    return Response.json({ ok: false, error: mapped.error }, { status: mapped.status });
  }
}
