import { requireAdmin } from "@/lib/admin/auth";
import { runBingQueryLookup } from "@/lib/admin/bing-monitoring";
import { getBingWebmasterSiteUrl, isBingConfigured, BingApiError } from "@/lib/bing/client";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isBingConfigured(),
    siteUrl: getBingWebmasterSiteUrl(),
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!isBingConfigured()) {
    return Response.json(
      { ok: false, error: "BING_WEBMASTER_API_KEY não configurada" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    q?: unknown;
    query?: unknown;
  } | null;

  const q =
    (typeof body?.q === "string" && body.q) ||
    (typeof body?.query === "string" && body.query) ||
    "";

  if (!q.trim()) {
    return Response.json({ ok: false, error: "Campo obrigatório: q" }, { status: 400 });
  }

  try {
    const result = await runBingQueryLookup(q);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof BingApiError ? err.message : "Falha no Bing Webmaster";
    const status = err instanceof BingApiError && err.statusCode >= 400 && err.statusCode < 500
      ? err.statusCode
      : 502;
    return Response.json({ ok: false, error: message }, { status });
  }
}
