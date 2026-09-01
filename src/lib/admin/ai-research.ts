import { OFFICIAL_DOMAINS, callSonar, type SonarResult } from "@/lib/perplexity/client";

export { OFFICIAL_DOMAINS };

export const CELPE_RESEARCH_MODEL = "sonar-pro";

const SYSTEM_PROMPT =
  "Você pesquisa informações para celpe-depe.com. " +
  "Use apenas fontes oficiais. Responda em português do Brasil. " +
  "Diferencie fatos confirmados de dados não encontrados. " +
  "Não invente datas, requisitos ou valores.";

export async function runCelpeOfficialResearch(topic: string): Promise<
  SonarResult & { topic: string; domains: string[] }
> {
  const cleaned = topic.trim();
  if (!cleaned) throw new Error("Informe um tema para pesquisar");
  if (cleaned.length > 500) throw new Error("Tema muito longo (máx. 500 caracteres)");

  const domains = [...OFFICIAL_DOMAINS];
  const result = await callSonar({
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `Pesquise sobre: ${cleaned}`,
    domains,
    model: CELPE_RESEARCH_MODEL,
    maxTokens: 2048,
    temperature: 0.1,
  });

  return { ...result, topic: cleaned, domains };
}
