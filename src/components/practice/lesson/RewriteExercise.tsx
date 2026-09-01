"use client";

import { useId, useState } from "react";
import { includesAllFragments } from "@/content/practice/lesson-utils";
import type { RewriteExerciseData } from "@/content/practice/types";

type Props = {
  exercise: RewriteExerciseData;
  onComplete?: () => void;
};

export function RewriteExercise({ exercise, onComplete }: Props) {
  const fieldId = useId();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const valid = includesAllFragments(value, exercise.requiredFragments);

  function handleCheck() {
    setChecked(true);
    if (valid && !done) {
      setDone(true);
      onComplete?.();
    }
  }

  return (
    <div className="lesson-rewrite">
      <h3 className="lesson-rewrite__prompt">{exercise.prompt}</h3>
      <p className="lesson-rewrite__instruction">{exercise.instruction}</p>
      <blockquote className="lesson-rewrite__source">
        A empresa vendeu mais no último trimestre. A empresa melhorou o atendimento ao cliente.
      </blockquote>

      <label htmlFor={fieldId} className="lesson-rewrite__label">
        Sua frase
      </label>
      <textarea
        id={fieldId}
        className="lesson-rewrite__input"
        rows={4}
        value={value}
        placeholder={exercise.placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          setChecked(false);
        }}
        aria-describedby={`${fieldId}-status`}
      />

      <div className="lesson-rewrite__actions">
        <button type="button" className="practice-btn practice-btn-primary" onClick={handleCheck}>
          {exercise.checkLabel}
        </button>
        <button
          type="button"
          className="practice-btn practice-btn-secondary"
          onClick={() => setRevealed((v) => !v)}
          aria-expanded={revealed}
        >
          {exercise.revealLabel}
        </button>
      </div>

      {checked ? (
        <p
          id={`${fieldId}-status`}
          className={`lesson-rewrite__feedback${valid ? " is-success" : " is-neutral"}`}
          aria-live="polite"
        >
          {valid ? exercise.successMessage : exercise.partialMessage}
        </p>
      ) : null}

      {revealed ? (
        <div className="lesson-rewrite__model" aria-live="polite">
          <span className="lesson-rewrite__model-label">Resposta-modelo</span>
          <p>{exercise.modelAnswer}</p>
        </div>
      ) : null}
    </div>
  );
}
