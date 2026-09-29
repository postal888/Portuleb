import { requireAdmin } from "@/lib/admin/auth";
import { parseWriterFilters } from "@/lib/writer/admin-query";
import {
  getWriterBreakdowns,
  getWriterFunnel,
  getWriterKpis,
} from "@/lib/writer/analytics";
import { ABANDON_AFTER_MS } from "@/lib/writer/time";
import { markAbandonedSessions } from "@/lib/writer/store";

export const dynamic = "force-dynamic";

/**
 * Writer funnel, KPIs and breakdowns for one filter window. Aggregates only: no essay text
 * and no e-mail address leaves this route, so the panel can be polled without spreading PII.
 */
export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const url = new URL(request.url);
  const { filters, problems } = parseWriterFilters(url.searchParams);
  if (problems.length) {
    return Response.json({ ok: false, errorCode: "bad_filters", problems }, { status: 400 });
  }

  // Abandonment is a server-side judgement, and this is the moment anyone looks at it.
  const abandonedNow = markAbandonedSessions(ABANDON_AFTER_MS);

  return Response.json(
    {
      ok: true,
      range: { from: filters.sinceIso, to: filters.untilIso },
      abandonedMarked: abandonedNow,
      kpis: getWriterKpis(filters),
      funnel: getWriterFunnel(filters),
      breakdowns: getWriterBreakdowns(filters),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
