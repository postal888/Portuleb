/** Heuristics: search queries relevant to Celpe-Bras / Portuguese exam prep. */

/** GSC `query contains` filters — each group is OR'd by the API. */
export const GSC_TOPIC_FILTER_EXPRESSIONS = [
  "celpe",
  "depe",
  "portug",
  "profici",
  "naturaliz",
  "inep",
  "certificado",
  "exame",
  "prova",
  "brasileir",
  "visto brasil",
  "aprender portug",
  "teste portug",
  "nivel b",
  "nível b",
  "nivel c",
  "nível c",
  "compreensao",
  "compreensão",
  "escrita",
  "oral",
  "brasil visto",
  "imigr",
];

const TOPIC_TERMS = [
  ...GSC_TOPIC_FILTER_EXPRESSIONS,
  "celpe-bras",
  "celpe bras",
  "celpebras",
  "portuguese",
  "exame de portugues",
  "exame de português",
  "prova de portugues",
  "prova de português",
];

export function buildGscTopicFilterGroups() {
  return GSC_TOPIC_FILTER_EXPRESSIONS.map((expression) => ({
    filters: [{ dimension: "query", operator: "contains", expression }],
  }));
}

function normalizeQuery(q: string): string {
  return q
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function isTopicSearchQuery(query: string): boolean {
  const q = normalizeQuery(query);
  if (!q) return false;
  return TOPIC_TERMS.some((term) => q.includes(normalizeQuery(term)));
}

export const GSC_TOPIC_QUERY_LIMIT = 30;
export const GSC_TOPIC_QUERY_FETCH_LIMIT = 1000;

export type GscQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export function mergeTopicQueryRows(rows: GscQueryRow[]): GscQueryRow[] {
  const byQuery = new Map<string, GscQueryRow>();
  for (const row of rows) {
    if (!row.query) continue;
    const key = normalizeQuery(row.query);
    const existing = byQuery.get(key);
    if (!existing || row.impressions > existing.impressions) {
      byQuery.set(key, row);
    }
  }
  return [...byQuery.values()]
    .filter((row) => isTopicSearchQuery(row.query))
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
    .slice(0, GSC_TOPIC_QUERY_LIMIT);
}
