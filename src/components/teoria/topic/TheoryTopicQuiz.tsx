"use client";

import { useCallback, useState } from "react";
import { LessonProgress } from "@/components/practice/lesson/LessonProgress";
import { MultipleChoiceExercise } from "@/components/practice/lesson/MultipleChoiceExercise";
import type { MultipleChoiceBlock } from "@/content/practice/types";

export function TheoryTopicQuiz({ blocks }: { blocks: MultipleChoiceBlock[] }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const completedCount = blocks.filter((block) => completed[block.id]).length;

  return (
    <section className="lesson-section" id="teste" aria-labelledby="theory-quiz-heading">
      <div className="lesson-section__head">
        <h2 id="theory-quiz-heading" className="practice-section-title">
          Teste rápido
        </h2>
        <p className="practice-section-copy">
          Três questões sobre o que você acabou de ler. O progresso avança a cada acerto.
        </p>
      </div>

      <LessonProgress total={blocks.length} completed={completedCount} label="Progresso do teste" />

      <div className="lesson-activities">
        {blocks.map((block, index) => (
          <article key={block.id} className="lesson-activity-card">
            <p className="lesson-activity-card__num">Questão {index + 1}</p>
            <MultipleChoiceExercise block={block} onComplete={() => markComplete(block.id)} />
          </article>
        ))}
      </div>
    </section>
  );
}
