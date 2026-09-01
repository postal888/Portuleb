import type { AnnotatedTextBlock } from "@/content/practice/types";
import { normalizeAnnotatedSegments } from "@/lib/practice/annotated-text-spacing";

type Props = {
  sectionTitle: string;
  intro: string;
  blocks: AnnotatedTextBlock[];
};

export function AnnotatedTextSection({ sectionTitle, intro, blocks }: Props) {
  return (
    <section className="lesson-section" aria-labelledby="lesson-text-heading">
      <div className="lesson-section__head">
        <h2 id="lesson-text-heading" className="practice-section-title">
          {sectionTitle}
        </h2>
        <p className="practice-section-copy">{intro}</p>
      </div>

      {blocks.map((block) => (
        <article key={block.id} className="lesson-annotated" aria-labelledby={`${block.id}-title`}>
          <header className="lesson-annotated__head">
            <h3 id={`${block.id}-title`} className="lesson-annotated__title">
              {block.title}
            </h3>
            {block.context ? (
              <p className="lesson-annotated__context">{block.context}</p>
            ) : null}
          </header>
          <div className="lesson-annotated__body">
            <p className="lesson-annotated__text">
              {normalizeAnnotatedSegments(block.segments).map((seg, i) =>
                seg.highlight ? (
                  <mark
                    key={i}
                    className="lesson-highlight"
                    {...(seg.expressionId
                      ? { id: `expr-ref-${seg.expressionId}` }
                      : {})}
                  >
                    {seg.text}
                  </mark>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
