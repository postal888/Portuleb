import { requireAdmin } from "@/lib/admin/auth";
import { cancelScheduledPost, getScheduledPost } from "@/lib/admin/db";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, { params }: Params) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const row = getScheduledPost(Number(id));
  if (!row) return Response.json({ error: "Não encontrado" }, { status: 404 });
  cancelScheduledPost(Number(id));
  return Response.json({ ok: true });
}
