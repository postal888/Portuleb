import { OFFICIAL_DOMAINS, callSonar, type SonarResult } from "@/lib/perplexity/client";
import { fetchAndExtractText } from "@/lib/admin/fetch-page-text";

export const CELPE_AUDIT_MODEL = "sonar-pro";

const SYSTEM_PROMPT =
  "Você audita conteúdo do celpe-depe.com contra fontes oficiais. " +
  "Seja específico e cite a fonte de cada correção sugerida. " +
  "Responda em português do Brasil.";

export async function runCelpePageAudit(rawUrl: string): Promise<
  SonarResult & {
    url: string;
    domains: string[];
    extractedChars: number;
    truncated: boolean;
  }
> {
  const page = await fetchAndExtractText(rawUrl);
  const domains = [...OFFICIAL_DOMAINS];

  const result = await callSonar({
    systemPrompt: SYSTEM_PROMPT,
    userPrompt:
      `URL: ${page.url}\n` +
      `Conteúdo atual da página:\n---\n${page.text}\n---\n` +
      `Compare com as fontes oficiais mais recentes. Liste:\n` +
      `1. Informações desatualizadas ou incorretas\n` +
      `2. Fatos importantes ausentes\n` +
      `3. Sugestões de atualização, cada uma com a fonte oficial correspondente`,
    domains,
    model: CELPE_AUDIT_MODEL,
    maxTokens: 2500,
    temperature: 0.15,
  });

  return {
    ...result,
    url: page.url,
    domains,
    extractedChars: page.text.length,
    truncated: page.truncated,
  };
}
