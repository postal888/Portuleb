import { parseExcludeParam, pickNextSession } from "@/lib/assessment/assessment-service";
import { NO_STORE_HEADERS } from "@/lib/assessment/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const excludeIds = parseExcludeParam(searchParams.get("exclude"));

  const session = pickNextSession(excludeIds);
  if (!session) {
    return Response.json(
      { error: "Nenhum teste disponível no momento." },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }

  return Response.json({ session }, { headers: NO_STORE_HEADERS });
}
