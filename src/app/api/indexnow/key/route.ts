import { getIndexNowKey } from "@/lib/seo/indexnow";

export async function GET() {
  const key = getIndexNowKey();
  if (!key) {
    return new Response("Not configured", { status: 404 });
  }
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
