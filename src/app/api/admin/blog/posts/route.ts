import { requireAdmin } from "@/lib/admin/auth";
import { listScheduledPosts } from "@/lib/admin/db";
import { loadAllBlogPosts, saveBlogPostJson } from "@/lib/blog/loader";
import type { BlogPost } from "@/content/blog/types";
import { publishBlogPost } from "@/lib/admin/blog-publish";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const published = loadAllBlogPosts();
  const scheduled = listScheduledPosts();

  return Response.json({ published, scheduled });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const body = (await request.json()) as { post?: BlogPost; publishNow?: boolean };
  if (!body.post?.slug || !body.post?.title) {
    return Response.json({ error: "post.slug e post.title são obrigatórios" }, { status: 400 });
  }

  if (body.publishNow !== false) {
    publishBlogPost(body.post);
  }

  return Response.json({ ok: true, slug: body.post.slug });
}
