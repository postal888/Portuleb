import { recordPageView } from "@/lib/admin/db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { path?: string };
    if (!body.path || body.path.startsWith("/admin") || body.path.startsWith("/api")) {
      return Response.json({ ok: true });
    }
    const referrer = request.headers.get("referer");
    const userAgent = request.headers.get("user-agent");
    recordPageView(body.path, referrer, userAgent);
  } catch {
    // ignore
  }
  return Response.json({ ok: true });
}
