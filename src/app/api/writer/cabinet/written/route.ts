import { sessionFromToken, writtenTaskIds } from "@/lib/writer/cabinet";
import { tokenFrom } from "@/lib/writer/cabinet-http";

export const dynamic = "force-dynamic";

/** Task ids this cabinet has already finished. Unsigned visitors get an empty column. */
export async function GET(request: Request) {
  const email = sessionFromToken(tokenFrom(request));
  const body = email
    ? { signedIn: true, taskIds: writtenTaskIds(email) }
    : { signedIn: false, taskIds: [] as string[] };
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
