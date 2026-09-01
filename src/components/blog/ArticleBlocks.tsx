import Link from "next/link";
import type { ArticleBlock } from "@/content/blog/types";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

export function ArticleBlocks({ blocks, locale }: { blocks: ArticleBlock[]; locale: Locale }) {
  const ui = getUi(locale).blog;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index}>
                {block.lead ? (
                  <strong>{block.leadLabel ?? ui.leadDefault}. </strong>
                ) : null}
                {block.content}
              </p>
            );
          case "examArtifact": {
            const label =
              block.title ??
              ui.examArtifact[block.kind === "modelAnswer" ? "modelAnswer" : block.kind];
            return (
              <div key={index} className="blog-callout blog-exam-artifact">
                <p className="blog-exam-artifact__label">{label}</p>
                <p className="blog-exam-artifact__content">{block.content}</p>
              </div>
            );
          }
          case "lexGrid":
            return (
              <div key={index} className="blog-lex-grid">
                {locale !== "pt-br" && block.lang === "pt" ? (
                  <p className="text-sm text-muted mb-2">{ui.examArtifact.transcript}</p>
                ) : null}
                {block.columns.map((col) => (
                  <div key={col.title} className="blog-lex-card">
                    <h4>{col.title}</h4>
                    <ul>
                      {col.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case "h2":
            return <h2 key={index}>{block.content}</h2>;
          case "h3":
            return <h3 key={index}>{block.content}</h3>;
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div key={index} className="blog-callout">
                <p>
                  <strong>{block.title}</strong> {block.content}
                </p>
              </div>
            );
          case "scale":
            return (
              <div key={index} className="blog-scale">
                <strong>{block.title}</strong>
                <p>{block.content}</p>
              </div>
            );
          case "video":
            return (
              <figure key={index} className="blog-video">
                {block.title ? <p className="blog-video__label">{block.title}</p> : null}
                <video
                  src={block.src}
                  controls
                  preload="none"
                  className="blog-video__player"
                  title={block.title ?? block.caption}
                >
                  {locale === "en"
                    ? "Your browser does not support HTML5 video."
                    : locale === "ru"
                      ? "Ваш браузер не поддерживает HTML5-видео."
                      : "Seu navegador não suporta vídeo HTML5."}
                </video>
                {block.caption ? (
                  <figcaption className="blog-video__caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "geoBox":
            return (
              <div
                key={index}
                className={
                  block.variant === "learn" ? "blog-geo-box blog-geo-box--learn" : "blog-geo-box"
                }
              >
                <p className="blog-geo-box__title">{block.title}</p>
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          case "internalLinks":
            return (
              <ul key={index} className="blog-internal-links">
                {block.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
