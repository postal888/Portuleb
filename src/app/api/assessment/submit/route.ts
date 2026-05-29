import { scoreSubmission } from "@/lib/assessment/assessment-service";
import type { AssessmentSubmitRequest } from "@/lib/assessment/types";
import { NO_STORE_HEADERS } from "@/lib/assessment/types";

export async function POST(request: Request) {
  let body: AssessmentSubmitRequest;
  try {
    body = (await request.json()) as AssessmentSubmitRequest;
  } catch {
    return Response.json(
      { error: "Corpo da requisição inválido." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  if (!body.sessionId?.trim()) {
    return Response.json(
      { error: "sessionId é obrigatório." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  if (!Array.isArray(body.steps)) {
    return Response.json(
      { error: "steps deve ser um array." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const result = scoreSubmission(body.sessionId, body.steps);
  if ("error" in result) {
    return Response.json({ error: result.error }, { status: 404, headers: NO_STORE_HEADERS });
  }

  return Response.json({ result }, { headers: NO_STORE_HEADERS });
}
