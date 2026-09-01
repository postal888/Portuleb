import { requireAdmin } from "@/lib/admin/auth";
import { deleteScheduledPost, getScheduledPost, updateScheduledPostTime } from "@/lib/admin/db";
import {
  formatZonedDateTimeInput,
  resolveScheduleTimezone,
  zonedDateTimeInputToUtc,
} from "@/lib/admin/schedule-timezone";
import type { BlogPost } from "@/content/blog/types";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const row = getScheduledPost(Number(id));
  if (!row) return Response.json({ error: "Não encontrado" }, { status: 404 });
  if (row.status !== "scheduled") {
    return Response.json({ error: "Somente posts agendados podem ser editados" }, { status: 400 });
  }

  const body = (await request.json()) as {
    publishAtLocal?: string;
    timeZone?: string;
  };

  if (!body.publishAtLocal) {
    return Response.json({ error: "publishAtLocal é obrigatório" }, { status: 400 });
  }

  try {
    const timeZone = resolveScheduleTimezone(body.timeZone);
    const publishAtUtc = zonedDateTimeInputToUtc(body.publishAtLocal, timeZone);
    const post = JSON.parse(row.payload_json) as BlogPost;
    post.publishedAt = publishAtUtc.slice(0, 10);
    updateScheduledPostTime(Number(id), publishAtUtc, JSON.stringify(post));

    return Response.json({
      ok: true,
      publishAtUtc,
      publishAtInput: formatZonedDateTimeInput(publishAtUtc, timeZone),
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Falha ao atualizar horário" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const row = getScheduledPost(Number(id));
  if (!row) return Response.json({ error: "Não encontrado" }, { status: 404 });
  if (!deleteScheduledPost(Number(id))) {
    return Response.json({ error: "Não foi possível excluir" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
