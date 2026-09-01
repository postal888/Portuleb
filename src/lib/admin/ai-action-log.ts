import { PerplexityApiError } from "@/lib/perplexity/client";

export function mapAiRouteError(err: unknown): { status: number; error: string } {
  if (err instanceof PerplexityApiError) {
    if (err.code === "rate_limited" || err.statusCode === 429) {
      return { status: 429, error: "rate_limited" };
    }
    if (err.statusCode === 503) return { status: 503, error: err.message };
    if (err.statusCode === 504) return { status: 504, error: err.message };
    return { status: 502, error: err.message };
  }
  if (err instanceof Error) {
    if (/obrigat|informe|inválid|permitido|muito long|não foi possível|falha ao buscar/i.test(err.message)) {
      return { status: 400, error: err.message };
    }
    return { status: 502, error: err.message };
  }
  return { status: 502, error: "Falha na ação de AI" };
}
