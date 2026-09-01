"use client";

type Props = {
  total: number;
  completed: number;
  label?: string;
};

export function LessonProgress({ total, completed, label = "Progresso da lição" }: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="lesson-progress" aria-label={label}>
      <div className="lesson-progress__head">
        <span className="lesson-progress__label">{label}</span>
        <span className="lesson-progress__count" aria-live="polite">
          {completed} / {total} · {pct}%
        </span>
      </div>
      <div
        className="lesson-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-valuetext={`${pct}% concluído`}
      >
        <div className="lesson-progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
