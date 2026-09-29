/** Canonical Inep / Celpe-Bras official URLs for contextual outbound links (GEO). */
export const OFFICIAL_SOURCES = {
  celpeBrasInep:
    "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/celpe-bras",
  postosAplicadores:
    "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/celpe-bras/postos-aplicadores",
  sistemaCelpeBras: "https://celpebras.inep.gov.br",
  /** Landing for edition notices / news — prefer session-specific edital when known. */
  inepCelpeNews:
    "https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/celpe-bras",
} as const;

export type OfficialSourceKey = keyof typeof OFFICIAL_SOURCES;

export type OfficialSourceLink = {
  key: OfficialSourceKey;
  href: string;
  label: string;
};

export const GUIDE_OFFICIAL_LINKS_PT: OfficialSourceLink[] = [
  { key: "celpeBrasInep", href: OFFICIAL_SOURCES.celpeBrasInep, label: "Celpe-Bras no Inep (Gov.br)" },
  {
    key: "sistemaCelpeBras",
    href: OFFICIAL_SOURCES.sistemaCelpeBras,
    label: "Sistema Celpe-Bras (inscrição e resultados)",
  },
  {
    key: "postosAplicadores",
    href: OFFICIAL_SOURCES.postosAplicadores,
    label: "Postos aplicadores oficiais",
  },
];

export const GUIDE_OFFICIAL_LINKS_EN: OfficialSourceLink[] = [
  { key: "celpeBrasInep", href: OFFICIAL_SOURCES.celpeBrasInep, label: "Celpe-Bras on Inep (Gov.br)" },
  {
    key: "sistemaCelpeBras",
    href: OFFICIAL_SOURCES.sistemaCelpeBras,
    label: "Celpe-Bras System (registration and results)",
  },
  {
    key: "postosAplicadores",
    href: OFFICIAL_SOURCES.postosAplicadores,
    label: "Official test centres",
  },
];
