import { OFFICIAL_DOMAINS, callSonar, type SonarResult } from "@/lib/perplexity/client";

export const CELPE_BRIEF_MODEL = "sonar-pro";

const SYSTEM_PROMPT =
  "Você é um estrategista de conteúdo SEO/GEO para celpe-depe.com. " +
  "Baseie fatos apenas em fontes oficiais quando citar datas/regras. " +
  "Responda em português do Brasil.";

export async function runCelpeContentBrief(keyword: string): Promise<
  SonarResult & { query: string; domains: string[] }
> {
  const cleaned = keyword.trim();
  if (!cleaned) throw new Error("Informe a query-alvo do brief");
  if (cleaned.length > 500) throw new Error("Query muito longa (máx. 500 caracteres)");

  const domains = [...OFFICIAL_DOMAINS];
  const result = await callSonar({
    systemPrompt: SYSTEM_PROMPT,
    userPrompt:
      `Crie um brief de conteúdo SEO/GEO para uma página sobre: ${cleaned}\n` +
      `Inclua: título H1 sugerido, meta description, estrutura de H2/H3,\n` +
      `perguntas frequentes a responder, dados factuais atuais com fonte,\n` +
      `e lacunas que concorrentes não cobrem.`,
    domains,
    model: CELPE_BRIEF_MODEL,
    maxTokens: 2500,
    temperature: 0.25,
  });

  return { ...result, query: cleaned, domains };
}
