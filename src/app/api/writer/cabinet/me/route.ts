import { sessionFromToken } from "@/lib/writer/cabinet";
import { tokenFrom } from "@/lib/writer/cabinet-http";

export const dynamic = "force-dynamic";

/** Whether the browser already holds a cabinet session. The address stays on the server. */
export async function GET(request: Request) {
  const email = sessionFromToken(tokenFrom(request));
  return Response.json({ signedIn: Boolean(email) }, { headers: { "Cache-Control": "no-store" } });
}
