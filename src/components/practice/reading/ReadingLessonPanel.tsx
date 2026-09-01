"use client";

import { useMemo, useState } from "react";
import type { AnnotatedTextBlock } from "@/content/practice/types";
import type {
  ReadingExpressionGuideEntry,
  ReadingSubtitleCue,
  ReadingSubtitleWord,
} from "@/content/practice/reading/types";
import {
  collectInlineExpressions,
  glossFor,
  resolveExpression,
  type GlossLang,
} from "@/lib/practice/reading-expression-lookup";
import { normalizeAnnotatedSegments } from "@/lib/practice/annotated-text-spacing";
import { ReadingVideoWithSubtitles } from "@/components/practice/reading/ReadingVideoWithSubtitles";

type Props = {
  blocks: AnnotatedTextBlock[];
  expressions: ReadingExpressionGuideEntry[];
  youtubeVideoId?: string;
  subtitles?: ReadingSubtitleCue[];
  subtitlesLabel?: string;
  words?: ReadingSubtitleWord[];
};

export function ReadingLessonPanel({
  blocks,
  expressions,
  youtubeVideoId,
  subtitles,
  subtitlesLabel = "Legendas",
  words,
}: Props) {
  const [plainMode, setPlainMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [glossLang, setGlossLang] = useState<GlossLang>("en");

  const inlineExpressions = useMemo(
    () => collectInlineExpressions(blocks, expressions),
    [blocks, expressions],
  );

  const hasRussian = inlineExpressions.some((item) => Boolean(item.russian));
  const hasSubtitles = Boolean(subtitles && subtitles.length > 0);
  const videoFirst = Boolean(youtubeVideoId && hasSubtitles);

  return (
    <section className="reading-lesson" aria-label="Leitura interativa">
      <ol className="reading-lesson__steps" aria-label="Etapas da lição">
        <li
          className={`reading-lesson__step${videoFirst ? " reading-lesson__step--active" : " reading-lesson__step--muted"}`}
        >
          <span className="reading-lesson__step-num">1</span>
          Ouvir
        </li>
        <li
          className={`reading-lesson__step${!videoFirst ? " reading-lesson__step--active" : ""}`}
        >
          <span className="reading-lesson__step-num">2</span>
          Ler
        </li>
        <li className="reading-lesson__step reading-lesson__step--muted">
          <span className="reading-lesson__step-num">3</span>
          Ler de novo
        </li>
      </ol>

      {videoFirst && youtubeVideoId && subtitles ? (
        <ReadingVideoWithSubtitles
          youtubeVideoId={youtubeVideoId}
          subtitles={subtitles}
          subtitlesLabel={subtitlesLabel}
          words={words}
        />
      ) : null}

      <div className="reading-lesson__layout">
        <div className="reading-lesson__main">
          <article className="reading-lesson__text-card">
            {blocks.map((block) => {
              const lineTranslation =
                glossLang === "ru" ? block.ru || block.en : block.en || block.ru;
              return (
                <div key={block.id} className="reading-lesson__block">
                  {block.title ? (
                    <h3 className="reading-lesson__block-title">{block.title}</h3>
                  ) : null}
                  <p className="reading-lesson__paragraph">
                    {normalizeAnnotatedSegments(block.segments).map((segment, index) => {
                      if (plainMode || !segment.highlight) {
                        return <span key={index}>{segment.text}</span>;
                      }

                      const resolved = segment.expressionId
                        ? resolveExpression(segment.expressionId, segment.text, expressions)
                        : {
                            id: `seg-${index}`,
                            portuguese: segment.text,
                            english: segment.text,
                          };

                      return (
                        <span
                          key={index}
                          id={segment.expressionId ? `expr-${segment.expressionId}` : undefined}
                          className={`reading-term${activeId === segment.expressionId ? " reading-term--active" : ""}`}
                          tabIndex={0}
                          onMouseEnter={() =>
                            segment.expressionId && setActiveId(segment.expressionId)
                          }
                          onMouseLeave={() => setActiveId(null)}
                          onFocus={() => segment.expressionId && setActiveId(segment.expressionId)}
                          onBlur={() => setActiveId(null)}
                        >
                          {segment.text}
                          <span className="reading-term__tip" role="tooltip">
                            {glossFor(resolved, glossLang)}
                          </span>
                        </span>
                      );
                    })}
                  </p>
                  {!plainMode && lineTranslation ? (
                    <p className="reading-lesson__line-translation" lang={glossLang === "ru" ? "ru" : "en"}>
                      {lineTranslation}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </article>

          <div className="reading-lesson__actions">
            {youtubeVideoId ? (
              <a
                className="reading-lesson__btn reading-lesson__btn--youtube"
                href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no YouTube
              </a>
            ) : (
              <button type="button" className="reading-lesson__btn reading-lesson__btn--youtube" disabled>
                Ouvir no YouTube — em breve
              </button>
            )}
            <button
              type="button"
              className="reading-lesson__btn reading-lesson__btn--plain"
              onClick={() => setPlainMode((value) => !value)}
              aria-pressed={plainMode}
            >
              {plainMode ? "Mostrar traduções" : "Ler sem traduções"}
            </button>
          </div>

          {!videoFirst ? (
            youtubeVideoId ? (
              <div className="reading-lesson__video">
                <iframe
                  title="Pronúncia das expressões"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="reading-lesson__video-placeholder" aria-hidden>
                Espaço reservado para vídeo de pronúncia no YouTube
              </div>
            )
          ) : null}
        </div>

        <aside className="reading-lesson__sidebar" aria-label="Expressões da lição">
          <div className="reading-expr-sidebar">
            <header className="reading-expr-sidebar__head">
              <span className="reading-expr-sidebar__icon" aria-hidden>
                📖
              </span>
              <div className="reading-expr-sidebar__head-text">
                <h2 className="reading-expr-sidebar__title">Expressões da lição</h2>
                {hasRussian ? (
                  <div className="reading-expr-sidebar__lang" role="group" aria-label="Idioma da tradução">
                    <button
                      type="button"
                      className={`reading-expr-sidebar__lang-btn${glossLang === "en" ? " is-active" : ""}`}
                      onClick={() => setGlossLang("en")}
                      aria-pressed={glossLang === "en"}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      className={`reading-expr-sidebar__lang-btn${glossLang === "ru" ? " is-active" : ""}`}
                      onClick={() => setGlossLang("ru")}
                      aria-pressed={glossLang === "ru"}
                    >
                      RU
                    </button>
                  </div>
                ) : null}
              </div>
            </header>

            <ul className="reading-expr-sidebar__list">
              {inlineExpressions.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#expr-${item.id}`}
                    className={`reading-expr-sidebar__item${activeId === item.id ? " reading-expr-sidebar__item--active" : ""}`}
                    onMouseEnter={() => setActiveId(item.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <span className="reading-expr-sidebar__terms">
                      <strong>{item.portuguese}</strong>
                      <em>{glossFor(item, glossLang)}</em>
                    </span>
                    <span
                      className="reading-expr-sidebar__play"
                      aria-label="Áudio em breve"
                      title="Áudio em breve"
                    >
                      ▶
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
