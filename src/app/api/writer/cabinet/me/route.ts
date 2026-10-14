import { sessionFromToken } from "@/lib/writer/cabinet";
import { tokenFrom } from "@/lib/writer/cabinet-http";

export const dynamic = "force-dynamic";

/** Whether the browser already holds a cabinet session. The address is returned only to that session. */
export async function GET(request: Request) {
  const email = sessionFromToken(tokenFrom(request));
  const body = email ? { signedIn: true, email } : { signedIn: false };
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
