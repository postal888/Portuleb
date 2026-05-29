"use client";

type AssessmentProgressProps = {
  currentStep: number;
  totalSteps: number;
  phase: "reading" | "questions";
};

export function AssessmentProgress({ currentStep, totalSteps, phase }: AssessmentProgressProps) {
  const pct = totalSteps > 0 ? Math.round(((currentStep + (phase === "questions" ? 0.5 : 0)) / totalSteps) * 100) : 0;

  return (
    <div className="assessment-progress" aria-label={`Progresso: texto ${currentStep + 1} de ${totalSteps}`}>
      <div className="assessment-progress-label">
        <span>
          Texto {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-muted">{phase === "reading" ? "Leitura" : "Questões"}</span>
      </div>
      <div className="assessment-progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="assessment-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
