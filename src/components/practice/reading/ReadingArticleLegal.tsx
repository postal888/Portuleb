import type { ReadingSourceCredits } from "@/content/practice/reading/types";

type Props = {
  didacticDisclaimer: string;
  adaptationNote: string;
  sourceCredits: ReadingSourceCredits;
  variant?: "full" | "disclaimer-only" | "credits-only";
};

export function ReadingArticleLegal({
  didacticDisclaimer,
  adaptationNote,
  sourceCredits,
  variant = "full",
}: Props) {
  const { originalTitle, author, publication, sourceUrl } = sourceCredits;
  const showDisclaimer = variant === "full" || variant === "disclaimer-only";
  const showCredits = variant === "full" || variant === "credits-only";

  return (
    <div className="reading-legal">
      {showDisclaimer ? (
        <p className="didatic-disclaimer">{didacticDisclaimer}</p>
      ) : null}

      {showCredits ? (
        <section className="article-credits" aria-labelledby="article-credits-heading">
          <h2 id="article-credits-heading">Créditos da matéria original</h2>
          <p>
            Este material faz parte de uma atividade didática de leitura e vocabulário. O texto e
            os trechos analisados foram adaptados a partir da reportagem:
          </p>
          <p>
            <strong>&ldquo;{originalTitle}&rdquo;</strong>, de <strong>{author}</strong>, publicada
            em <strong>{publication}</strong>.
          </p>
          <p>{adaptationNote}</p>
          <p>
            Matéria original disponível em:{" "}
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {sourceUrl}
            </a>
          </p>
        </section>
      ) : null}
    </div>
  );
}
