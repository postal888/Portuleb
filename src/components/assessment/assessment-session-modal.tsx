"use client";

import type {
  AssessmentSessionPublic,
  AssessmentStepAnswer,
  AssessmentSubmitResult,
} from "@/lib/assessment/types";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AssessmentProgress } from "./assessment-progress";
import { AssessmentResult } from "./assessment-result";
import { AssessmentTextStep } from "./assessment-text-step";

type ModalPhase = "loading" | "active" | "submitting" | "result" | "error";

type StepState = {
  unknownTokenIds: Set<string>;
  answers: Record<string, number>;
};

type AssessmentSessionModalProps = {
  open: boolean;
  excludeSessionIds: string[];
  onClose: () => void;
  onSessionSeen: (sessionId: string) => void;
};

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      <div className="h-3 w-full rounded bg-[var(--site-border)]" />
      <div className="h-24 rounded-lg bg-[var(--site-border)]" />
      <div className="h-20 rounded-lg bg-[var(--site-border)]" />
    </div>
  );
}

export function AssessmentSessionModal({
  open,
  excludeSessionIds,
  onClose,
  onSessionSeen,
}: AssessmentSessionModalProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [phase, setPhase] = useState<ModalPhase>("loading");
  const [session, setSession] = useState<AssessmentSessionPublic | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStates, setStepStates] = useState<StepState[]>([]);
  const [result, setResult] = useState<AssessmentSubmitResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSession = useCallback(async () => {
    setPhase("loading");
    setSession(null);
    setCurrentStep(0);
    setStepStates([]);
    setResult(null);
    setErrorMsg("");

    const qs =
      excludeSessionIds.length > 0
        ? `?exclude=${encodeURIComponent(excludeSessionIds.join(","))}`
        : "";

    try {
      const res = await fetch(`/api/assessment/next${qs}`, { cache: "no-store" });
      const data = (await res.json()) as { session?: AssessmentSessionPublic; error?: string };
      if (!res.ok || !data.session) {
        setErrorMsg(data.error ?? "Não foi possível carregar o teste.");
        setPhase("error");
        return;
      }
      setSession(data.session);
      setStepStates(
        data.session.steps.map(() => ({ unknownTokenIds: new Set(), answers: {} })),
      );
      onSessionSeen(data.session.sessionId);
      setPhase("active");
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
      setPhase("error");
    }
  }, [excludeSessionIds, onSessionSeen]);

  useEffect(() => {
    if (!open) return;
    void fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const activeStep = session?.steps[currentStep];
  const activeState = stepStates[currentStep];

  const toggleWord = (tokenId: string) => {
    setStepStates((prev) => {
      const next = [...prev];
      const state = next[currentStep];
      if (!state) return prev;
      const ids = new Set(state.unknownTokenIds);
      if (ids.has(tokenId)) ids.delete(tokenId);
      else ids.add(tokenId);
      next[currentStep] = { ...state, unknownTokenIds: ids };
      return next;
    });
  };

  const handleAnswer = (questionId: string, selectedIndex: number) => {
    setStepStates((prev) => {
      const next = [...prev];
      const state = next[currentStep];
      if (!state) return prev;
      next[currentStep] = {
        ...state,
        answers: { ...state.answers, [questionId]: selectedIndex },
      };
      return next;
    });
  };

  const stepComplete =
    activeStep != null &&
    activeState != null &&
    activeStep.article.questions.every((q) => activeState.answers[q.id] !== undefined);

  const handleNext = () => {
    if (!session || !stepComplete) return;
    if (currentStep < session.totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }
    void handleSubmit();
  };

  const handleSubmit = async () => {
    if (!session) return;
    setPhase("submitting");

    const payload: AssessmentStepAnswer[] = session.steps.map((step, i) => ({
      articleId: step.article.id,
      answers: step.article.questions.map((q) => ({
        questionId: q.id,
        selectedIndex: stepStates[i]?.answers[q.id] ?? -1,
      })),
      unknownTokenIds: [...(stepStates[i]?.unknownTokenIds ?? [])],
    }));

    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ sessionId: session.sessionId, steps: payload }),
      });
      const data = (await res.json()) as { result?: AssessmentSubmitResult; error?: string };
      if (!res.ok || !data.result) {
        setErrorMsg(data.error ?? "Erro ao enviar respostas.");
        setPhase("error");
        return;
      }
      setResult(data.result);
      setPhase("result");
    } catch {
      setErrorMsg("Erro de conexão ao enviar.");
      setPhase("error");
    }
  };

  if (!open) return null;

  const isLastStep = session != null && currentStep === session.totalSteps - 1;

  return (
    <div className="assessment-overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="assessment-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="assessment-dialog-header">
          <div className="min-w-0 flex-1">
            {activeStep ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                  {activeStep.article.cefrTargetMin}–{activeStep.article.cefrTargetMax} · Leitura
                </p>
                <h2 id={titleId} className="mt-1 text-lg font-semibold text-charcoal">
                  {activeStep.article.title}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  {activeStep.article.sourceLabel}
                  {activeStep.article.sourceDate ? ` · ${activeStep.article.sourceDate}` : ""}
                </p>
              </>
            ) : (
              <h2 id={titleId} className="text-lg font-semibold text-charcoal">
                {phase === "error" ? "Teste indisponível" : "Carregando teste…"}
              </h2>
            )}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="assessment-close-btn"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        <div className="assessment-dialog-body">
          {phase === "loading" && <LoadingSkeleton />}

          {phase === "error" && (
            <div className="assessment-error" role="alert">
              <p>{errorMsg}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={() => void fetchSession()}>
                  Tentar novamente
                </button>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Fechar
                </button>
              </div>
            </div>
          )}

          {(phase === "active" || phase === "submitting") && session && activeStep && activeState && (
            <>
              <AssessmentProgress
                currentStep={currentStep}
                totalSteps={session.totalSteps}
                phase="questions"
              />
              <AssessmentTextStep
                step={activeStep}
                unknownTokenIds={activeState.unknownTokenIds}
                answers={activeState.answers}
                disabled={phase === "submitting"}
                onToggleWord={toggleWord}
                onAnswer={handleAnswer}
              />
              <div className="assessment-actions">
                <button
                  type="button"
                  className="btn-primary w-full sm:w-auto"
                  disabled={!stepComplete || phase === "submitting"}
                  onClick={handleNext}
                >
                  {phase === "submitting"
                    ? "Enviando…"
                    : isLastStep
                      ? "Ver resultado"
                      : "Próximo texto"}
                </button>
              </div>
            </>
          )}

          {phase === "result" && result && (
            <AssessmentResult
              result={result}
              onAnother={() => void fetchSession()}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
