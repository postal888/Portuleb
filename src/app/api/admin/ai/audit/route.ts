import { requireAdmin } from "@/lib/admin/auth";
import { mapAiRouteError } from "@/lib/admin/ai-action-log";
import { CELPE_AUDIT_MODEL, runCelpePageAudit } from "@/lib/admin/ai-audit";
import { listAiRuns, logAiRun } from "@/lib/admin/ai-runs";
import { OFFICIAL_DOMAINS, isPerplexityConfigured } from "@/lib/perplexity/client";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isPerplexityConfigured(),
    model: CELPE_AUDIT_MODEL,
    domains: [...OFFICIAL_DOMAINS],
    accepts: ["url"],
    history: listAiRuns({ action: "audit", limit: 20 }),
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

  const body = (await request.json().catch(() => null)) as { url?: unknown } | null;
  const url = typeof body?.url === "string" ? body.url : "";
  if (!url.trim()) {
    return Response.json({ ok: false, error: "Campo obrigatório: url" }, { status: 400 });
  }

  try {
    const result = await runCelpePageAudit(url);
    logAiRun({
      action: "audit",
      inputUrl: result.url,
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
      url: result.url,
      extractedChars: result.extractedChars,
      truncated: result.truncated,
    });
  } catch (err) {
    const mapped = mapAiRouteError(err);
    logAiRun({
      action: "audit",
      inputUrl: url.trim(),
      model: CELPE_AUDIT_MODEL,
      domains: [...OFFICIAL_DOMAINS],
      status: "error",
      errorMessage: mapped.error,
    });
    return Response.json({ ok: false, error: mapped.error }, { status: mapped.status });
  }
}
