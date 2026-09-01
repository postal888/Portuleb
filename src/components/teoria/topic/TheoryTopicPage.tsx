import Link from "next/link";
import type { TheoryTopic } from "@/content/teoria/topics/types";
import { TheorySectionBlocks } from "./TheorySectionBlocks";
import { TheoryTopicQuiz } from "./TheoryTopicQuiz";

export function TheoryTopicPage({ topic }: { topic: TheoryTopic }) {
  const { meta, hero, sections, quiz, examAngle, faq, related } = topic;

  return (
    <main className="practice-hub lesson-hub">
      <div className="practice-wrap">
        <header className="lesson-hero">
          <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/pt-br">Início</Link>
            <span aria-hidden> / </span>
            <Link href="/pt-br/teoria">Teoria</Link>
            <span aria-hidden> / </span>
            <span>{meta.title}</span>
          </nav>

          <div className="lesson-hero__eyebrow">{meta.eyebrow}</div>
          <div className="lesson-hero__grid">
            <div className="lesson-hero__main">
              <p className="practice-kicker">{hero.kicker}</p>
              <h1 className="lesson-hero__title">{hero.title}</h1>
              <p className="lesson-hero__lead">{hero.lead}</p>
              <div className="theory-quick-answer">
                <p className="theory-quick-answer__label">Resposta curta</p>
                <p className="theory-quick-answer__text">{hero.quickAnswer}</p>
              </div>
            </div>
            <aside className="lesson-hero__aside" aria-label="Informações do tema">
              <div className="lesson-meta-row">
                <span className="lesson-meta-label">Nível</span>
                <span>{meta.level}</span>
              </div>
              <div className="lesson-meta-row">
                <span className="lesson-meta-label">Leitura</span>
                <span>{meta.readingTime}</span>
              </div>
              <nav className="theory-toc" aria-label="Nesta página">
                <p className="lesson-meta-label">Nesta página</p>
                <ul>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.title}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#teste">Teste rápido</a>
                  </li>
                  <li>
                    <a href="#perguntas">Perguntas frequentes</a>
                  </li>
                </ul>
              </nav>
              <div className="lesson-meta-tags">
                {meta.tags.map((tag) => (
                  <span key={tag} className="practice-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <TheorySectionBlocks sections={sections} />

        <TheoryTopicQuiz blocks={quiz} />

        <section className="lesson-section" id="exame" aria-labelledby="theory-exam-heading">
          <article className="theory-exam-angle">
            <h2 id="theory-exam-heading" className="theory-exam-angle__title">
              {examAngle.title}
            </h2>
            <p className="theory-exam-angle__body">{examAngle.body}</p>
            <ul className="theory-exam-angle__list">
              {examAngle.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="lesson-section" id="perguntas" aria-labelledby="theory-faq-heading">
          <div className="lesson-section__head">
            <h2 id="theory-faq-heading" className="practice-section-title">
              Perguntas frequentes
            </h2>
          </div>
          <div className="theory-faq">
            {faq.map((item) => (
              <details key={item.question} className="theory-faq__item">
                <summary className="theory-faq__question">{item.question}</summary>
                <p className="theory-faq__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside className="lesson-footer-note" aria-labelledby="theory-related-heading">
          <h2 id="theory-related-heading" className="lesson-footer-note__title">
            Continuar daqui
          </h2>
          <div className="theory-related">
            {related.map((link) => (
              <Link key={link.href} href={link.href} className="lesson-card-link">
                <p className="lesson-card-link__title">{link.label}</p>
                <p className="lesson-card-link__meta">{link.description}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
