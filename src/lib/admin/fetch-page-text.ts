/**
 * Fetch a published celpe-depe page and extract plain text for audit prompts.
 * Uses live HTML so the model does not guess page content from the URL alone.
 */

const DEFAULT_SITE_HOST = "celpe-depe.com";
const MAX_CHARS = 8000;
const FETCH_TIMEOUT_MS = 20_000;

function allowedHosts(): Set<string> {
  const hosts = new Set<string>([DEFAULT_SITE_HOST, `www.${DEFAULT_SITE_HOST}`]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    try {
      const host = new URL(siteUrl).hostname.toLowerCase();
      hosts.add(host);
      if (host.startsWith("www.")) hosts.add(host.slice(4));
      else hosts.add(`www.${host}`);
    } catch {
      /* ignore bad env */
    }
  }
  return hosts;
}

export function assertCelpeAuditUrl(rawUrl: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    throw new Error("URL inválida");
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("URL deve usar http(s)");
  }
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  const allowed = [...allowedHosts()].map((h) => h.replace(/^www\./, ""));
  if (!allowed.includes(host)) {
    throw new Error(`Audit permitido apenas para ${DEFAULT_SITE_HOST}`);
  }
  return parsed;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCharCode(parseInt(h, 16)));
}

/** Lightweight HTML → plain text (no cheerio dependency). */
export function htmlToPlainText(html: string): string {
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  const main =
    text.match(/<main[\s\S]*?<\/main>/i)?.[0] ||
    text.match(/<article[\s\S]*?<\/article>/i)?.[0] ||
    text;

  text = main
    .replace(/<\/(p|div|h[1-6]|li|tr|section|br|hr)[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ");

  text = decodeEntities(text)
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return text;
}

export async function fetchAndExtractText(rawUrl: string): Promise<{
  url: string;
  text: string;
  truncated: boolean;
}> {
  const parsed = assertCelpeAuditUrl(rawUrl);
  const url = parsed.toString();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "CelpeDePe-AdminAudit/1.0",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Falha ao buscar página (HTTP ${res.status})`);
  }

  const html = await res.text();
  const full = htmlToPlainText(html);
  if (!full || full.length < 40) {
    throw new Error("Não foi possível extrair texto útil da página");
  }

  const truncated = full.length > MAX_CHARS;
  return {
    url,
    text: truncated ? full.slice(0, MAX_CHARS) : full,
    truncated,
  };
}
