"use client";

import { useId, useState } from "react";
import type { MultipleChoiceBlock } from "@/content/practice/types";

type Props = {
  block: MultipleChoiceBlock;
  onComplete?: () => void;
};

export function MultipleChoiceExercise({ block, onComplete }: Props) {
  const groupId = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const chosen = block.options.find((o) => o.id === selected);
  const isCorrect = !!chosen?.correct;

  function choose(optionId: string) {
    if (done) return;
    setSelected(optionId);
    const opt = block.options.find((o) => o.id === optionId);
    if (opt?.correct) {
      setDone(true);
      onComplete?.();
    }
  }

  return (
    <fieldset className="lesson-quiz" aria-labelledby={`${groupId}-q`}>
      <legend id={`${groupId}-q`} className="lesson-quiz__question">
        {block.question}
      </legend>
      {block.hint ? <p className="lesson-quiz__hint">{block.hint}</p> : null}

      <div className="lesson-quiz__options" role="radiogroup" aria-labelledby={`${groupId}-q`}>
        {block.options.map((opt) => {
          const active = selected === opt.id;
          const showResult = active && selected !== null;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              className={`lesson-quiz__option${active ? " is-active" : ""}${showResult ? (opt.correct ? " is-correct" : " is-wrong") : ""}`}
              onClick={() => choose(opt.id)}
              disabled={done && !opt.correct}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {chosen ? (
        <p
          className={`lesson-quiz__feedback${isCorrect ? " is-success" : " is-neutral"}`}
          aria-live="polite"
        >
          {chosen.feedback}
        </p>
      ) : null}
    </fieldset>
  );
}
