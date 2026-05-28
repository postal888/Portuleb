/** Single source of truth for SEO / GEO (canonical, OG, sitemap, JSON-LD). */
export const SITE = {
  url: "https://celpe-depe.com",
  name: "Celpe-Dê Pé",
  shortName: "Celpe-Dê Pé",
  titleDefault: "Celpe-Dê Pé — Preparação para o Celpe-Bras",
  titleTemplate: "%s — Celpe-Dê Pé",
  description:
    "Preparação para o Celpe-Bras: teoria, prática, provas anteriores e análises — um passo de cada vez.",
  locale: "pt_BR",
  ogImage: "/images/og-default.png",
  twitter: "",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
