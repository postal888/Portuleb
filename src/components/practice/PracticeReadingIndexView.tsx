import Link from "next/link";
import { listReadingArticleSummaries } from "@/content/practice/reading";
import { PracticeAreaShell } from "@/components/practice/PracticeAreaShell";

export function PracticeReadingIndexView() {
  const articles = listReadingArticleSummaries();

  return (
    <PracticeAreaShell
      locale="pt-br"
      title="Ler"
      kicker="Input"
      lead="Textos e questões de compreensão, com foco em extrair sentido e preparar a produção escrita."
    >
      <section className="practice-section">
        <article className="practice-card practice-panel">
          <h2 className="practice-section-title practice-section-title-sm" style={{ marginBottom: "0.75rem" }}>
            Textos anotados
          </h2>
          <p className="practice-section-copy" style={{ marginBottom: "1.25rem" }}>
            Leituras com expressões destacadas e glossário — clique para abrir o texto completo.
          </p>
          <div
            className="practice-grid-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {articles.map((article) => (
              <Link key={article.slug} href={article.href} className="lesson-card-link">
                <div className="lesson-card-link__badge">{article.badge}</div>
                <h3 className="lesson-card-link__title">{article.title}</h3>
                <p className="lesson-card-link__meta">{article.meta}</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </PracticeAreaShell>
  );
}
