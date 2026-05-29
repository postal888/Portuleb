import { requireAdmin } from "@/lib/admin/auth";
import { getBlogPostBySlug, saveBlogPostJson, deleteBlogPostJson } from "@/lib/blog/loader";
import type { BlogPost } from "@/content/blog/types";
import { publishBlogPost } from "@/lib/admin/blog-publish";

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: Request, { params }: Params) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return Response.json({ error: "Não encontrado" }, { status: 404 });
  return Response.json({ post });
}

export async function PUT(request: Request, { params }: Params) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { slug: oldSlug } = await params;
  const body = (await request.json()) as { post?: BlogPost };
  if (!body.post) return Response.json({ error: "post obrigatório" }, { status: 400 });

  if (body.post.slug !== oldSlug) {
    deleteBlogPostJson(oldSlug);
  }
  publishBlogPost(body.post);
  return Response.json({ ok: true, slug: body.post.slug, created: true });
}

export async function DELETE(request: Request, { params }: Params) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  const removed = deleteBlogPostJson(slug);
  return Response.json({ ok: removed });
}
