import { publishDueScheduledPosts } from "@/lib/admin/blog-publish";

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("x-cron-secret");
  if (!secret || header !== secret) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const result = publishDueScheduledPosts();
  return Response.json(result);
}

/** Allow GET for simple cron wget/curl */
export async function GET(request: Request) {
  return POST(request);
}
