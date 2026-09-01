"use client";

import { useCallback, useMemo, useState } from "react";
import type { PracticeLesson } from "@/content/practice/types";
import { LessonProgress } from "./LessonProgress";
import { MultipleChoiceExercise } from "./MultipleChoiceExercise";
import { RewriteExercise } from "./RewriteExercise";

type Props = {
  lesson: PracticeLesson;
};

export function PracticeLessonInteractive({ lesson }: Props) {
  const activityIds = useMemo(
    () => [...lesson.quizBlocks.map((q) => q.id), lesson.transformExercise.id],
    [lesson],
  );
  const total = activityIds.length;

  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const completedCount = activityIds.filter((id) => completed[id]).length;

  return (
    <section className="lesson-section" aria-labelledby="lesson-activities-heading">
      <div className="lesson-section__head">
        <h2 id="lesson-activities-heading" className="practice-section-title">
          Exercícios interativos
        </h2>
        <p className="practice-section-copy">
          Responda às questões e reescreva a frase. O progresso atualiza conforme você acerta cada
          atividade.
        </p>
      </div>

      <LessonProgress total={total} completed={completedCount} />

      <div className="lesson-activities">
        {lesson.quizBlocks.map((block, index) => (
          <article key={block.id} className="lesson-activity-card">
            <p className="lesson-activity-card__num">Questão {index + 1}</p>
            <MultipleChoiceExercise block={block} onComplete={() => markComplete(block.id)} />
          </article>
        ))}

        <article className="lesson-activity-card">
          <p className="lesson-activity-card__num">Reescrita</p>
          <RewriteExercise
            exercise={lesson.transformExercise}
            onComplete={() => markComplete(lesson.transformExercise.id)}
          />
        </article>
      </div>
    </section>
  );
}
