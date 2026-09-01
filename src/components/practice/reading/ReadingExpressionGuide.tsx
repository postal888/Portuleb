import type { ReadingExpressionGuideEntry } from "@/content/practice/reading/types";

type Props = {
  sectionTitle: string;
  intro: string;
  entries: ReadingExpressionGuideEntry[];
};

export function ReadingExpressionGuide({ sectionTitle, intro, entries }: Props) {
  return (
    <section className="lesson-section" aria-labelledby="reading-expr-guide-heading">
      <div className="lesson-section__head">
        <h2 id="reading-expr-guide-heading" className="practice-section-title">
          {sectionTitle}
        </h2>
        <p className="practice-section-copy">{intro}</p>
      </div>

      <ol className="reading-expr-list">
        {entries.map((entry, index) => (
          <li key={entry.id} id={`guide-${entry.id}`} className="reading-expr-item">
            <div className="reading-expr-item__head">
              <span className="reading-expr-item__num">{index + 1}</span>
              <div>
                <h3 className="reading-expr-item__pt">{entry.portuguese}</h3>
                <p className="reading-expr-item__en">{entry.english}</p>
              </div>
            </div>
            <blockquote className="reading-expr-item__example">{entry.example}</blockquote>
            <p className="reading-expr-item__explanation">{entry.explanation}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
