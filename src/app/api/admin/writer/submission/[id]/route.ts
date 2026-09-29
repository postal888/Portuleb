import { requireAdmin } from "@/lib/admin/auth";
import { getSubmissionDetail } from "@/lib/writer/analytics";

export const dynamic = "force-dynamic";

/** One candidate's whole trail, opened by submission UUID from the panel's table. */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const detail = getSubmissionDetail(id);
  if (!detail) {
    return Response.json({ ok: false, errorCode: "not_found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  return Response.json({ ok: true, ...detail }, { headers: { "Cache-Control": "no-store" } });
}
