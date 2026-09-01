import type { ExpressionCardData } from "@/content/practice/types";

export function ExpressionCard({
  card,
  meaningLabel = "Significado",
}: {
  card: ExpressionCardData;
  meaningLabel?: string;
}) {
  return (
    <article className="lesson-expr-card" id={`expr-${card.id}`} aria-labelledby={`expr-${card.id}-title`}>
      <header className="lesson-expr-card__head">
        <h3 id={`expr-${card.id}-title`} className="lesson-expr-card__expression">
          {card.expression}
        </h3>
        <span className="lesson-expr-card__register">{card.register}</span>
      </header>
      <dl className="lesson-expr-card__dl">
        <div>
          <dt>{meaningLabel}</dt>
          <dd>{card.meaning}</dd>
        </div>
        <div>
          <dt>Quando usar</dt>
          <dd>{card.whenToUse}</dd>
        </div>
        <div>
          <dt>Exemplo</dt>
          <dd className="lesson-expr-card__example">{card.example}</dd>
        </div>
        {card.note ? (
          <div>
            <dt>Observação</dt>
            <dd>{card.note}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export function ExpressionCardGrid({
  sectionTitle,
  intro,
  cards,
  meaningLabel,
}: {
  sectionTitle: string;
  intro: string;
  cards: ExpressionCardData[];
  meaningLabel?: string;
}) {
  return (
    <section className="lesson-section" aria-labelledby="lesson-expr-heading">
      <div className="lesson-section__head">
        <h2 id="lesson-expr-heading" className="practice-section-title">
          {sectionTitle}
        </h2>
        <p className="practice-section-copy">{intro}</p>
      </div>
      <div className="lesson-expr-grid">
        {cards.map((card) => (
          <ExpressionCard key={card.id} card={card} meaningLabel={meaningLabel} />
        ))}
      </div>
    </section>
  );
}
