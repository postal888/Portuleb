import { requireAdmin } from "@/lib/admin/auth";
import {
  listAiRuns,
  summarizeAiRunCosts,
  type AiRunAction,
  type AiRunStatus,
} from "@/lib/admin/ai-runs";
import { isPerplexityConfigured } from "@/lib/perplexity/client";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const url = new URL(request.url);
  const limitRaw = Number(url.searchParams.get("limit") ?? "40");
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 40;
  const actionParam = url.searchParams.get("action") ?? "all";
  const statusParam = url.searchParams.get("status") ?? "all";
  const daysRaw = Number(url.searchParams.get("days") ?? "30");
  const days = Number.isFinite(daysRaw) ? Math.min(Math.max(daysRaw, 1), 365) : 30;

  const action =
    actionParam === "research" || actionParam === "brief" || actionParam === "audit"
      ? (actionParam as AiRunAction)
      : "all";
  const status =
    statusParam === "ok" || statusParam === "error" ? (statusParam as AiRunStatus) : "all";

  return Response.json({
    configured: isPerplexityConfigured(),
    history: listAiRuns({ action, status, limit }),
    costs: summarizeAiRunCosts(days),
  });
}
