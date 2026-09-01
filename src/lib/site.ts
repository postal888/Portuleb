/** Single source of truth for SEO / GEO (canonical, OG, sitemap, JSON-LD). */
export const SITE = {
  url: "https://celpe-depe.com",
  name: "Celpe-Dê Pé",
  shortName: "Celpe-Dê Pé",
  titleDefault: "Celpe-Dê Pé — Preparação para o Celpe-Bras",
  titleTemplate: "%s — Celpe-Dê Pé",
  description:
    "Preparação gratuita para o Celpe-Bras: teoria, prática, provas anteriores e análises. Estude de graça e prepare-se para o exame.",
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

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}
