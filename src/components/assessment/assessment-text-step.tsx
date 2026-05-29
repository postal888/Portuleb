"use client";

import type { AssessmentStepPublic } from "@/lib/assessment/types";
import { AssessmentQuestionList } from "./assessment-question-list";
import { AssessmentWordToken } from "./assessment-word-token";

type AssessmentTextStepProps = {
  step: AssessmentStepPublic;
  unknownTokenIds: Set<string>;
  answers: Record<string, number>;
  disabled?: boolean;
  onToggleWord: (tokenId: string) => void;
  onAnswer: (questionId: string, selectedIndex: number) => void;
};

export function AssessmentTextStep({
  step,
  unknownTokenIds,
  answers,
  disabled,
  onToggleWord,
  onAnswer,
}: AssessmentTextStepProps) {
  const { article } = step;

  return (
    <div className="assessment-text-step">
      <p className="assessment-word-hint text-xs text-muted">
        Clique nas palavras que você não conhece — isso ajuda a estimar seu vocabulário receptivo.
      </p>

      <article className="assessment-text surface-card-muted mt-3 p-4 sm:p-5">
        {article.paragraphs.map((paragraph, pIdx) => (
          <p key={pIdx} className="assessment-paragraph">
            {paragraph.tokens.map((token) => (
              <AssessmentWordToken
                key={token.id}
                id={token.id}
                surface={token.surface}
                clickable={token.clickable}
                marked={unknownTokenIds.has(token.id)}
                disabled={disabled}
                onToggle={onToggleWord}
              />
            ))}
          </p>
        ))}
      </article>

      <AssessmentQuestionList
        questions={article.questions}
        answers={answers}
        disabled={disabled}
        onAnswer={onAnswer}
      />
    </div>
  );
}
