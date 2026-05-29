"use client";

import type { AssessmentSubmitResult } from "@/lib/assessment/types";

type AssessmentResultProps = {
  result: AssessmentSubmitResult;
  onAnother: () => void;
  onClose: () => void;
};

const confidenceLabel: Record<AssessmentSubmitResult["confidence"], string> = {
  baixa: "Baixa",
  média: "Média",
  alta: "Alta",
};

export function AssessmentResult({ result, onAnother, onClose }: AssessmentResultProps) {
  const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;

  return (
    <div className="assessment-result">
      <div className="assessment-result-score">
        <p className="text-sm font-medium text-muted">Compreensão (3 textos)</p>
        <p className="assessment-result-fraction" aria-live="polite">
          <span className="assessment-result-correct">{result.correct}</span>
          <span className="text-muted"> / {result.total}</span>
        </p>
        <p className="text-sm text-muted">{pct}% de acertos</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="surface-card-muted p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-teal">Leitura estimada</h3>
          <p className="mt-1 text-lg font-semibold text-charcoal">{result.readingRange}</p>
        </div>
        <div className="surface-card-muted p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-teal">Vocabulário receptivo estimado</h3>
          <p className="mt-1 text-lg font-semibold text-charcoal">{result.vocabularyRange}</p>
        </div>
      </div>

      <div className="surface-card-muted mt-4 p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-teal">Confiança da estimativa</h3>
        <p className="mt-1 text-sm text-charcoal">{confidenceLabel[result.confidence]}</p>
        <p className="mt-2 text-xs text-muted">
          Faixas agregadas a partir de três textos — nenhum texto isolado define o nível final.
        </p>
      </div>

      <div className="surface-card-muted mt-4 p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-teal">Próximo passo recomendado</h3>
        <p className="mt-1 text-sm leading-relaxed text-charcoal">{result.recommendation}</p>
      </div>

      {result.stepFeedback.some((s) => s.feedback.some((f) => f.explanation)) && (
        <details className="assessment-feedback-details mt-5">
          <summary className="cursor-pointer text-sm font-semibold text-teal">
            Ver explicações por texto
          </summary>
          <div className="mt-3 space-y-4">
            {result.stepFeedback.map((step, si) => (
              <div key={step.articleId}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Texto {si + 1} · {step.correct}/{step.total}
                </p>
                <ul className="mt-2 space-y-2">
                  {step.feedback.map((item, i) => (
                    <li
                      key={item.questionId}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        item.correct
                          ? "border-green-200 bg-green-50/80"
                          : "border-amber-200 bg-amber-50/80"
                      }`}
                    >
                      <span className="font-medium">
                        Q{i + 1}: {item.correct ? "Correto" : "Incorreto"}
                      </span>
                      {item.explanation ? (
                        <p className="mt-1 text-muted">{item.explanation}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      )}

      <div className="assessment-actions mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn-primary w-full sm:w-auto" onClick={onAnother}>
          Fazer outro teste
        </button>
        <button type="button" className="btn-secondary w-full sm:w-auto" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
