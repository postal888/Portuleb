import Link from "next/link";
import type { ReadingArticle } from "@/content/practice/reading/types";
import { ReadingLessonPanel } from "@/components/practice/reading/ReadingLessonPanel";
import { ReadingArticleLegal } from "@/components/practice/reading/ReadingArticleLegal";
import { LessonFooterNote } from "@/components/practice/lesson/LessonFooterNote";

type Props = {
  article: ReadingArticle;
};

function levelBadge(level: string): string {
  if (/avançado|advanced|c1|c2/i.test(level)) return "C1";
  if (/intermedi/i.test(level)) return "B2";
  if (/básic|basic|a2/i.test(level)) return "A2";
  return level.split(/\s+/)[0]?.slice(0, 3).toUpperCase() ?? "B2";
}

export function ReadingArticlePage({ article }: Props) {
  const { meta, hero } = article;
  const isListening = meta.categoryPath === "compreensao-auditiva";
  const sectionHref = `/pt-br/pratica/${meta.categoryPath}`;
  const sectionLabel = isListening ? "Ouvir" : "Ler";

  return (
    <main className="practice-hub lesson-hub">
      <div className="practice-wrap">
        <header className="lesson-hero lesson-hero--reading">
          <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/pt-br">Início</Link>
            <span aria-hidden> / </span>
            <Link href="/pt-br/pratica">Prática</Link>
            <span aria-hidden> / </span>
            <Link href={sectionHref}>{sectionLabel}</Link>
            <span aria-hidden> / </span>
            <span>{hero.title}</span>
          </nav>

          <div className="lesson-hero__eyebrow">{meta.eyebrow}</div>
          <h1 className="lesson-hero__title">
            {hero.title}
            <span className="reading-hero-badge">{levelBadge(meta.level)}</span>
          </h1>
          <p className="lesson-hero__lead">{hero.lead}</p>

          <ReadingArticleLegal
            didacticDisclaimer={article.didacticDisclaimer}
            adaptationNote={article.adaptationNote}
            sourceCredits={article.sourceCredits}
            variant="disclaimer-only"
          />
        </header>

        <ReadingLessonPanel
          blocks={article.annotatedText.blocks}
          expressions={article.expressionGuide.entries}
          youtubeVideoId={article.media?.youtubeVideoId}
          subtitles={article.media?.subtitles}
          subtitlesLabel={article.media?.subtitlesLabel}
          words={article.media?.words}
        />

        <ReadingArticleLegal
          didacticDisclaimer={article.didacticDisclaimer}
          adaptationNote={article.adaptationNote}
          sourceCredits={article.sourceCredits}
          variant="credits-only"
        />

        <LessonFooterNote
          title={article.closingNote.title}
          body={article.closingNote.body}
          links={article.closingNote.links}
        />
      </div>
    </main>
  );
}
