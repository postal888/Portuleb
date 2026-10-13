/** Single source of truth for SEO / GEO (canonical, OG, sitemap, JSON-LD). */
export const SITE = {
  url: "https://celpe-depe.com",
  name: "Celpe-Dê Pé",
  shortName: "Celpe-Dê Pé",
  titleDefault: "Celpe-Dê Pé — Preparação para o Celpe-Bras",
  titleTemplate: "%s — Celpe-Dê Pé",
  description:
    "Preparação gratuita para o Celpe-Bras: descubra seu nível de escrita, estude teoria e prática, resolva provas anteriores e leia análises.",
  locale: "pt_BR",
  ogImage: "/images/og-default.png",
  twitter: "",
} as const;

export function buildSitePath(...segments: (string | undefined | null)[]): string {
  const path = segments
    .filter((segment): segment is string => Boolean(segment?.trim()))
    .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
    .join("/");
  return path ? `/${path}` : "/";
}

/**
 * Origin for links we hand to a reader. A loopback address or a raw IP in the
 * environment is the machine Next is bound to, not the public site, so those
 * fall back to the canonical origin.
 */
export function publicOrigin(): string {
  const configured = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";
  if (!configured) return SITE.url;
  try {
    const url = new URL(configured);
    const host = url.hostname.replace(/^\[|\]$/g, "");
    const bareIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
    const local = host === "localhost" || host === "127.0.0.1" || host === "::1";
    if (bareIp || local) return SITE.url;
    return url.origin;
  } catch {
    return SITE.url;
  }
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}
