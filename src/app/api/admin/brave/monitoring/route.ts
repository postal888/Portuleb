import { requireAdmin } from "@/lib/admin/auth";
import {
  AI_MONITORING_TARGET_HOST,
  AI_VISIBILITY_QUERY_PACKS,
  DEFAULT_AI_MONITORING_PACK_ID,
  getAiMonitoringSiteUrl,
} from "@/lib/admin/ai-monitoring";
import { runBraveVisibilityBatch } from "@/lib/admin/brave-monitoring";
import { listAiMonitoringRuns } from "@/lib/admin/db";
import { isBraveConfigured } from "@/lib/brave/client";

function mapHistory() {
  return listAiMonitoringRuns(30, "brave").map((row) => {
    let matchedUrls: string[] = [];
    try {
      matchedUrls = JSON.parse(row.matched_urls_json) as string[];
    } catch {
      matchedUrls = [];
    }
    return {
      id: row.id,
      prompt: row.prompt,
      mentioned: Boolean(row.mentioned),
      error: row.error_message,
      matchedUrls,
      ranAt: row.created_at,
    };
  });
}

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({
    configured: isBraveConfigured(),
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
    history: mapHistory(),
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!isBraveConfigured()) {
    return Response.json({ error: "BRAVE_API_KEY não configurada" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    pack?: unknown;
    packId?: unknown;
    queriesText?: unknown;
  } | null;

  const packId =
    (typeof body?.pack === "string" && body.pack) ||
    (typeof body?.packId === "string" && body.packId) ||
    null;
  const queriesText = typeof body?.queriesText === "string" ? body.queriesText : null;

  const batch = await runBraveVisibilityBatch({ packId, queriesText });
  if (batch.queries.length === 0) {
    return Response.json({ error: "Informe um pack ou lista de queries" }, { status: 400 });
  }

  return Response.json({
    ...batch,
    history: mapHistory(),
  });
}
