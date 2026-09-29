import { requireAdmin } from "@/lib/admin/auth";
import { listContactMessages, markContactMessageRead } from "@/lib/admin/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const rows = listContactMessages();
  return Response.json(
    {
      ok: true,
      total: rows.length,
      unread: rows.filter((row) => row.status === "new").length,
      messages: rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        locale: row.locale,
        status: row.status,
        createdAt: row.created_at,
      })),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const id = typeof body === "object" && body && "id" in body ? Number((body as { id: unknown }).id) : NaN;
  if (!Number.isFinite(id) || id <= 0) {
    return Response.json({ ok: false, error: "id inválido." }, { status: 400 });
  }

  const updated = markContactMessageRead(id);
  return Response.json({ ok: true, updated }, { headers: { "Cache-Control": "no-store" } });
}
