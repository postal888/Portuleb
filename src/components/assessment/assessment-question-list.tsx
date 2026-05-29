"use client";

import type { AssessmentQuestionPublic } from "@/lib/assessment/types";

type AssessmentQuestionListProps = {
  questions: AssessmentQuestionPublic[];
  answers: Record<string, number>;
  disabled?: boolean;
  onAnswer: (questionId: string, selectedIndex: number) => void;
};

export function AssessmentQuestionList({
  questions,
  answers,
  disabled,
  onAnswer,
}: AssessmentQuestionListProps) {
  return (
    <fieldset className="assessment-questions" disabled={disabled}>
      <legend className="assessment-questions-legend">Questões</legend>
      <ol className="assessment-questions-list">
        {questions.map((question, index) => {
          const groupName = `q-${question.id}`;
          const selected = answers[question.id];

          return (
            <li key={question.id} className="assessment-question-item">
              <p className="assessment-question-prompt">
                <span className="assessment-question-num">{index + 1}.</span> {question.prompt}
              </p>
              <div className="assessment-options" role="radiogroup" aria-label={question.prompt}>
                {question.options.map((option, optIndex) => {
                  const id = `${groupName}-opt-${optIndex}`;
                  const checked = selected === optIndex;
                  return (
                    <label
                      key={id}
                      htmlFor={id}
                      className={`assessment-option${checked ? " assessment-option-selected" : ""}`}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={groupName}
                        value={optIndex}
                        checked={checked}
                        onChange={() => onAnswer(question.id, optIndex)}
                        className="assessment-option-input"
                      />
                      <span className="assessment-option-letter" aria-hidden>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="assessment-option-text">{option}</span>
                    </label>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </fieldset>
  );
}
