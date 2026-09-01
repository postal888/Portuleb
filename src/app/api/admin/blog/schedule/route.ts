import { requireAdmin } from "@/lib/admin/auth";
import { createScheduledPost } from "@/lib/admin/db";
import { applyBlogLocaleToPost } from "@/lib/admin/blog-locale";
import { resolveScheduleTimezone, zonedDateTimeInputToUtc } from "@/lib/admin/schedule-timezone";
import { resolveBlogLocale } from "@/lib/blog/locale";
import type { BlogPost } from "@/content/blog/types";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const body = (await request.json()) as {
    post?: BlogPost;
    publishAtLocal?: string;
    publishAtUtc?: string;
    timeZone?: string;
  };

  if (!body.post?.slug || !body.post?.title) {
    return Response.json({ error: "post.slug e post.title são obrigatórios" }, { status: 400 });
  }

  let publishAtUtc = body.publishAtUtc;
  if (body.publishAtLocal) {
    try {
      publishAtUtc = zonedDateTimeInputToUtc(
        body.publishAtLocal,
        resolveScheduleTimezone(body.timeZone),
      );
    } catch (e) {
      return Response.json(
        { error: e instanceof Error ? e.message : "Data/hora inválida" },
        { status: 400 },
      );
    }
  }

  if (!publishAtUtc) {
    return Response.json({ error: "publishAtLocal ou publishAtUtc é obrigatório" }, { status: 400 });
  }

  const post = applyBlogLocaleToPost(
    {
      ...body.post,
      publishedAt: publishAtUtc.slice(0, 10),
    },
    resolveBlogLocale(body.post.locale),
  );

  const id = createScheduledPost({
    slug: post.slug,
    title: post.title,
    payloadJson: JSON.stringify(post),
    publishAtUtc,
    createdBy: "admin",
  });

  return Response.json({ ok: true, id });
}
