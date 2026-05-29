import { requireAdmin } from "@/lib/admin/auth";
import { createScheduledPost } from "@/lib/admin/db";
import type { BlogPost } from "@/content/blog/types";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const body = (await request.json()) as {
    post?: BlogPost;
    publishAtUtc?: string;
  };

  if (!body.post?.slug || !body.post?.title || !body.publishAtUtc) {
    return Response.json(
      { error: "post, publishAtUtc são obrigatórios" },
      { status: 400 },
    );
  }

  const id = createScheduledPost({
    slug: body.post.slug,
    title: body.post.title,
    payloadJson: JSON.stringify(body.post),
    publishAtUtc: body.publishAtUtc,
    createdBy: "admin",
  });

  return Response.json({ ok: true, id });
}
