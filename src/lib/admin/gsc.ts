import { GoogleAuth } from "google-auth-library";
import {
  GSC_TOPIC_QUERY_FETCH_LIMIT,
  GSC_TOPIC_QUERY_LIMIT,
  buildGscTopicFilterGroups,
  mergeTopicQueryRows,
  type GscQueryRow,
} from "./gsc-topic";

/** Google Search Console Search Analytics (optional). */

export const GSC_TOP_QUERIES_LIMIT = 30;
export const GSC_TOP_PAGES_LIMIT = 15;

export type GscMetricRow = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscOverview = {
  siteUrl: string;
  days: number;
  totals: GscMetricRow;
  daily: ({ date: string } & GscMetricRow)[];
  topQueries: ({ query: string } & GscMetricRow)[];
  topicQueries: ({ query: string } & GscMetricRow)[];
  topPages: ({ page: string } & GscMetricRow)[];
};

type GscApiRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

type GscQueryResponse = {
  rows?: GscApiRow[];
};

export function isGscConfigured(): boolean {
  return Boolean(process.env.GSC_SITE_URL && process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

function formatUtcDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function rowMetrics(row: GscApiRow): GscMetricRow {
  return {
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  };
}

function sumTotals(rows: GscMetricRow[]): GscMetricRow {
  const clicks = rows.reduce((n, r) => n + r.clicks, 0);
  const impressions = rows.reduce((n, r) => n + r.impressions, 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position =
    rows.length > 0 ? rows.reduce((n, r) => n + r.position, 0) / rows.length : 0;
  return { clicks, impressions, ctr, position };
}

async function gscQuery(body: Record<string, unknown>): Promise<GscQueryResponse> {
  const auth = new GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const client = await auth.getClient();
  const siteUrl = encodeURIComponent(process.env.GSC_SITE_URL!);
  const res = await client.request<GscQueryResponse>({
    url: `https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`,
    method: "POST",
    data: body,
  });
  return res.data ?? {};
}

function mapQueryRows(rows: GscApiRow[]): GscQueryRow[] {
  return rows
    .map((row) => ({
      query: row.keys?.[0] ?? "",
      ...rowMetrics(row),
    }))
    .filter((r) => r.query);
}

async function fetchTopicQueries(range: {
  startDate: string;
  endDate: string;
}): Promise<GscQueryRow[]> {
  try {
    const filteredRes = await gscQuery({
      ...range,
      dimensions: ["query"],
      dimensionFilterGroups: buildGscTopicFilterGroups(),
      rowLimit: GSC_TOPIC_QUERY_FETCH_LIMIT,
    });
    const merged = mergeTopicQueryRows(mapQueryRows(filteredRes.rows ?? []));
    if (merged.length >= GSC_TOPIC_QUERY_LIMIT) return merged;

    const broadRes = await gscQuery({
      ...range,
      dimensions: ["query"],
      rowLimit: 5000,
    });
    return mergeTopicQueryRows([
      ...merged,
      ...mapQueryRows(broadRes.rows ?? []),
    ]);
  } catch (err) {
    console.error("[gsc] topic queries", err);
    return [];
  }
}

export async function fetchGscOverview(days: number): Promise<GscOverview | null> {
  if (!isGscConfigured()) return null;

  const siteUrl = process.env.GSC_SITE_URL!;
  const end = new Date();
  const start = new Date();
  start.setUTCDate(start.getUTCDate() - days);

  const range = {
    startDate: formatUtcDate(start),
    endDate: formatUtcDate(end),
  };

  try {
    const [totalsRes, dailyRes, queriesRes, topicQueries, pagesRes] = await Promise.all([
      gscQuery({ ...range, dimensions: [] }),
      gscQuery({ ...range, dimensions: ["date"] }),
      gscQuery({
        ...range,
        dimensions: ["query"],
        rowLimit: GSC_TOP_QUERIES_LIMIT,
      }),
      fetchTopicQueries(range),
      gscQuery({ ...range, dimensions: ["page"], rowLimit: GSC_TOP_PAGES_LIMIT }),
    ]);

    const totalsRow = totalsRes.rows?.[0];
    const dailyRows = dailyRes.rows ?? [];
    const queryRows = queriesRes.rows ?? [];
    const pageRows = pagesRes.rows ?? [];

    const daily = dailyRows
      .map((row) => ({
        date: row.keys?.[0] ?? "",
        ...rowMetrics(row),
      }))
      .filter((r) => r.date)
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      siteUrl,
      days,
      totals: totalsRow ? rowMetrics(totalsRow) : sumTotals(daily),
      daily,
      topQueries: mapQueryRows(queryRows),
      topicQueries,
      topPages: pageRows.map((row) => ({
        page: row.keys?.[0] ?? "",
        ...rowMetrics(row),
      })),
    };
  } catch (err) {
    console.error("[gsc]", err);
    return null;
  }
}
