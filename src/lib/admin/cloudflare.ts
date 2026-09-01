/** Cloudflare GraphQL analytics (optional). */

export function isCloudflareConfigured(): boolean {
  return Boolean(process.env.CF_API_TOKEN && process.env.CF_ZONE_ID);
}

type CfDay = { date: string; requests: number; bytes: number; visits: number };

export async function fetchCloudflareOverview(days: number): Promise<{
  days: CfDay[];
  totals: { requests: number; bytes: number; visits: number };
} | null> {
  if (!isCloudflareConfigured()) return null;

  const token = process.env.CF_API_TOKEN!;
  const zoneId = process.env.CF_ZONE_ID!;
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);

  const query = `
    query ZoneAnalytics($zoneTag: string, $since: Time!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(limit: ${days + 1}, filter: { date_geq: $since }) {
            dimensions { date }
            sum { requests bytes pageViews visits }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { zoneTag: zoneId, since: since.toISOString().slice(0, 10) },
    }),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as {
    data?: {
      viewer?: {
        zones?: {
          httpRequests1dGroups?: {
            dimensions: { date: string };
            sum: { requests: number; bytes: number; pageViews: number; visits: number };
          }[];
        }[];
      };
    };
  };

  const groups = json.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];
  const daysList: CfDay[] = groups.map((g) => ({
    date: g.dimensions.date,
    requests: g.sum.requests ?? 0,
    bytes: g.sum.bytes ?? 0,
    visits: g.sum.visits ?? g.sum.pageViews ?? 0,
  }));

  const totals = daysList.reduce(
    (acc, d) => ({
      requests: acc.requests + d.requests,
      bytes: acc.bytes + d.bytes,
      visits: acc.visits + d.visits,
    }),
    { requests: 0, bytes: 0, visits: 0 },
  );

  return { days: daysList, totals };
}
