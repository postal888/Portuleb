import { requireAdmin } from "@/lib/admin/auth";
import { AI_VISIBILITY_QUERY_PACKS, DEFAULT_AI_MONITORING_PACK_ID } from "@/lib/admin/ai-monitoring";
import { runBraveSingleSearch } from "@/lib/admin/brave-monitoring";
import { isBraveConfigured, BraveApiError } from "@/lib/brave/client";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isBraveConfigured(),
    targetHost: "celpe-depe.com",
    defaultCount: 10,
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!isBraveConfigured()) {
    return Response.json({ ok: false, error: "BRAVE_API_KEY não configurada" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    q?: unknown;
    query?: unknown;
    count?: unknown;
  } | null;

  const q =
    (typeof body?.q === "string" && body.q) ||
    (typeof body?.query === "string" && body.query) ||
    "";

  if (!q.trim()) {
    return Response.json({ ok: false, error: "Campo obrigatório: q" }, { status: 400 });
  }

  const countRaw = Number(body?.count ?? 10);
  const count = Number.isFinite(countRaw) ? Math.min(Math.max(countRaw, 1), 20) : 10;

  try {
    const result = await runBraveSingleSearch(q, count);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof BraveApiError ? err.message : "Falha na busca Brave";
    const status = err instanceof BraveApiError && err.statusCode === 429 ? 429 : 502;
    return Response.json({ ok: false, error: message }, { status });
  }
}
