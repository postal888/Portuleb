export type DayValue = { date: string; value: number };

export type ChartSeriesInput = {
  id: string;
  label: string;
  color: string;
  points: DayValue[];
};

const DAY_MS = 86_400_000;

export function parseChartDays(raw: string | null, fallback = 28): number {
  const n = Number(raw);
  return [7, 14, 28, 90].includes(n) ? n : fallback;
}

/** Preenche dias ausentes com zero para o gráfico não “pular”. */
export function fillDaySeries(points: DayValue[], days: number, end = new Date()): DayValue[] {
  const map = new Map(points.map((p) => [p.date, p.value]));
  const out: DayValue[] = [];
  const endUtc = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(endUtc - i * DAY_MS);
    const date = d.toISOString().slice(0, 10);
    out.push({ date, value: map.get(date) ?? 0 });
  }
  return out;
}

export function mapDailyField(rows: { date: string }[], field: string): DayValue[] {
  return rows.map((r) => ({
    date: r.date,
    value: Number((r as Record<string, unknown>)[field] ?? 0),
  }));
}

export function mapLocalViews(rows: { day: string; views: number }[]): DayValue[] {
  return rows.map((r) => ({ date: r.day, value: r.views }));
}
