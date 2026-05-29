"use client";

type AssessmentWordTokenProps = {
  id: string;
  surface: string;
  clickable: boolean;
  marked: boolean;
  disabled?: boolean;
  onToggle: (id: string) => void;
};

export function AssessmentWordToken({
  id,
  surface,
  clickable,
  marked,
  disabled,
  onToggle,
}: AssessmentWordTokenProps) {
  if (!clickable) {
    return <span className="assessment-token-static">{surface}</span>;
  }

  return (
    <button
      type="button"
      className={`assessment-word-token${marked ? " assessment-word-token-marked" : ""}`}
      aria-pressed={marked}
      aria-label={marked ? `Desmarcar palavra: ${surface}` : `Marcar palavra desconhecida: ${surface}`}
      disabled={disabled}
      onClick={() => onToggle(id)}
    >
      {surface}
    </button>
  );
}
