import { requireAdmin } from "@/lib/admin/auth";
import { mapAiRouteError } from "@/lib/admin/ai-action-log";
import { listAiRuns, logAiRun } from "@/lib/admin/ai-runs";
import {
  CELPE_RESEARCH_MODEL,
  OFFICIAL_DOMAINS,
  runCelpeOfficialResearch,
} from "@/lib/admin/ai-research";
import { isPerplexityConfigured } from "@/lib/perplexity/client";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isPerplexityConfigured(),
    model: CELPE_RESEARCH_MODEL,
    domains: [...OFFICIAL_DOMAINS],
    accepts: ["topic"],
    history: listAiRuns({ action: "research", limit: 20 }),
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

  const body = (await request.json().catch(() => null)) as { topic?: unknown } | null;
  const topic = typeof body?.topic === "string" ? body.topic : "";
  if (!topic.trim()) {
    return Response.json({ ok: false, error: "Campo obrigatório: topic" }, { status: 400 });
  }

  try {
    const result = await runCelpeOfficialResearch(topic);
    logAiRun({
      action: "research",
      inputTopic: result.topic,
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
      topic: result.topic,
    });
  } catch (err) {
    const mapped = mapAiRouteError(err);
    logAiRun({
      action: "research",
      inputTopic: topic.trim(),
      model: CELPE_RESEARCH_MODEL,
      domains: [...OFFICIAL_DOMAINS],
      status: "error",
      errorMessage: mapped.error,
    });
    return Response.json({ ok: false, error: mapped.error }, { status: mapped.status });
  }
}
