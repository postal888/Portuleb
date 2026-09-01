"use client";

import { useMemo, useState } from "react";
import type { ChartSeriesInput, DayValue } from "@/lib/admin/chart-data";
import { fillDaySeries } from "@/lib/admin/chart-data";

type Props = {
  title: string;
  subtitle?: string;
  days: number;
  series: ChartSeriesInput[];
  height?: number;
  valueFormatter?: (n: number) => string;
};

const DEFAULT_COLORS = ["#0d7377", "#437a22", "#964219", "#5c6bc0"];

function fmtCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(1)}k`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}

function formatDateLabel(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

export function TrafficChart({
  title,
  subtitle,
  days,
  series,
  height = 240,
  valueFormatter = fmtCompact,
}: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const prepared = useMemo(() => {
    return series.map((s, i) => ({
      ...s,
      color: s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      points: fillDaySeries(s.points, days),
    }));
  }, [series, days]);

  const dates = prepared[0]?.points.map((p) => p.date) ?? [];
  const maxY = Math.max(1, ...prepared.flatMap((s) => s.points.map((p) => p.value)));

  const width = 720;
  const pad = { top: 18, right: 16, bottom: 40, left: 48 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const xAt = (index: number) =>
    pad.left + (dates.length <= 1 ? chartW / 2 : (index / (dates.length - 1)) * chartW);
  const yAt = (value: number) => pad.top + chartH - (value / maxY) * chartH;

  const linePath = (points: DayValue[]) =>
    points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(2)} ${yAt(p.value).toFixed(2)}`)
      .join(" ");

  const areaPath = (points: DayValue[]) => {
    if (points.length === 0) return "";
    const base = pad.top + chartH;
    return `${linePath(points)} L ${xAt(points.length - 1).toFixed(2)} ${base} L ${xAt(0).toFixed(2)} ${base} Z`;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * maxY);
  const labelStep = dates.length <= 10 ? 1 : dates.length <= 20 ? 2 : Math.ceil(dates.length / 8);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const rel = (x - pad.left) / chartW;
    const idx = Math.round(rel * (dates.length - 1));
    setHoverIndex(Math.max(0, Math.min(dates.length - 1, idx)));
  };

  const hoverDate = hoverIndex != null ? dates[hoverIndex] : null;

  return (
    <div className="traffic-chart">
      <div className="traffic-chart-head">
        <div>
          <h3 className="traffic-chart-title">{title}</h3>
          {subtitle ? <p className="traffic-chart-sub">{subtitle}</p> : null}
        </div>
        {hoverDate ? (
          <div className="traffic-chart-tooltip" aria-live="polite">
            <div className="traffic-chart-tooltip-date">{formatDateLabel(hoverDate)}</div>
            {prepared.map((s) => {
              const v = s.points[hoverIndex!]?.value ?? 0;
              return (
                <div key={s.id} className="traffic-chart-tooltip-row">
                  <span className="traffic-chart-dot" style={{ background: s.color }} />
                  {s.label}: <strong>{valueFormatter(v)}</strong>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="traffic-chart-legend">
        {prepared.map((s) => (
          <span key={s.id} className="traffic-chart-legend-item">
            <span className="traffic-chart-dot" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <svg
        className="traffic-chart-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={yAt(tick)}
              y2={yAt(tick)}
              className="traffic-chart-grid"
            />
            <text x={pad.left - 8} y={yAt(tick) + 4} textAnchor="end" className="traffic-chart-axis">
              {valueFormatter(tick)}
            </text>
          </g>
        ))}

        {prepared.length === 1 ? (
          <path d={areaPath(prepared[0].points)} fill={prepared[0].color} className="traffic-chart-area" />
        ) : null}

        {prepared.map((s) => (
          <path
            key={s.id}
            d={linePath(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth={2.25}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {hoverIndex != null ? (
          <line
            x1={xAt(hoverIndex)}
            x2={xAt(hoverIndex)}
            y1={pad.top}
            y2={pad.top + chartH}
            className="traffic-chart-cursor"
          />
        ) : null}

        {dates.map((date, i) =>
          i % labelStep === 0 || i === dates.length - 1 ? (
            <text
              key={date}
              x={xAt(i)}
              y={height - 10}
              textAnchor="middle"
              className="traffic-chart-axis"
            >
              {formatDateLabel(date)}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  );
}
