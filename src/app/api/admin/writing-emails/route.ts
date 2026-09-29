import { requireAdmin } from "@/lib/admin/auth";
import { listWritingEmails } from "@/lib/admin/db";
import { listWritingArchives } from "@/lib/essay/archive";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const rows = listWritingEmails();
  return Response.json(
    {
      ok: true,
      total: rows.length,
      emails: rows.map((row) => ({
        id: row.id,
        email: row.email,
        submissions: row.submissions,
        firstSeen: row.first_seen,
        lastSeen: row.last_seen,
      })),
      archives: listWritingArchives(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
