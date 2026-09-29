import { requireAdmin } from "@/lib/admin/auth";
import { parseWriterFilters } from "@/lib/writer/admin-query";
import { countWriterSubmissions, listWriterSubmissions } from "@/lib/writer/analytics";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const url = new URL(request.url);
  const { filters, limit, problems } = parseWriterFilters(url.searchParams);
  if (problems.length) {
    return Response.json({ ok: false, errorCode: "bad_filters", problems }, { status: 400 });
  }

  const submissions = listWriterSubmissions(filters, limit);
  return Response.json(
    { ok: true, total: countWriterSubmissions(filters), returned: submissions.length, submissions },
    { headers: { "Cache-Control": "no-store" } },
  );
}
