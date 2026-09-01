import Link from "next/link";
import { getTheoryHub } from "@/content/teoria";
import { listTheoryTopicSummaries, type TheoryTopicSummary } from "@/content/teoria/topics";
import type { Locale } from "@/i18n/locales";
import { theoryAnchors } from "@/i18n/anchors";
import { VerbConjugator } from "@/components/teoria/VerbConjugator";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function TheoryHubView({ locale }: { locale: Locale }) {
  const hub = getTheoryHub(locale);
  const { theoryHero, theoryCards, theoryFlow, sampleTopics } = hub;
  const common = getUi(locale);
  const anchors = theoryAnchors(locale);
  /**
   * Topic pages exist in pt-BR only. The axis cards are keyed by the pt-BR
   * anchors (#gramatica, #vocabulario, #generos), so other locales find no
   * match and fall back to the original link line.
   */
  const topics = locale === "pt-br" ? listTheoryTopicSummaries() : [];
  const topicsByAxis = topics.reduce<Record<string, TheoryTopicSummary[]>>((acc, topic) => {
    (acc[topic.axis] ??= []).push(topic);
    return acc;
  }, {});

  const labels = hub.ui ?? {
    home: common.breadcrumb.home,
    theory: locale === "en" ? "Theory" : "Teoria",
    seeAxes: "Ver eixos",
    goPractice: "Ir para Prática",
    reference: "Referência",
    axes: "Eixos de teoria",
    axesCopy:
      "Explicações curtas, tabelas, exemplos e saída para testes — a base antes de aplicar na Prática.",
    journey: "Da teoria à prática",
    thenPractice: "Depois praticar",
    openPractice: "Abrir Prática →",
    sampleThemes: "Exemplos de temas",
    topics: "Tópicos",
    theoryTest: "Teoria + teste",
    footerSoon: "Quizzes e páginas por tema serão ligados em breve.",
    footerPractice: "",
    footerPracticeLink: "Ir para Prática →",
    verbsKicker: "Ferramenta interativa",
    verbsTitle: "Conjugações dos verbos",
    verbsCopy:
      "Filtre por verbo, tempo e pessoa, estude as tabelas de conjugação e teste-se com um quiz rápido.",
  };

  return (
    <div className="practice-hub">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath(locale, "home")}>{labels.home}</Link>
          <span aria-hidden> / </span>
          <span>{labels.theory}</span>
        </nav>

        <section className="practice-hero">
          <div className="practice-eyebrow">{theoryHero.eyebrow}</div>
          <div className="practice-hero-grid">
            <article className="practice-card practice-hero-main">
              <div className="practice-kicker">{theoryHero.kicker}</div>
              <h1 className="practice-title">{theoryHero.title}</h1>
              <p className="practice-lead">{theoryHero.lead}</p>
              <div className="practice-actions">
                <a href={`#${anchors.main}`} className="practice-btn practice-btn-primary">
                  {labels.seeAxes}
                </a>
                <Link
                  href={localizedPath(locale, "practice")}
                  className="practice-btn practice-btn-secondary"
                >
                  {labels.goPractice}
                </Link>
              </div>
            </article>
            <aside className="practice-card practice-hero-side" aria-label="Summary">
              {theoryHero.stats.map((stat) => (
                <div key={stat.value} className="practice-mini">
                  <strong>{stat.value}</strong>
                  {"link" in stat ? (
                    <Link href={stat.link} className="practice-meta-link">
                      {stat.label} →
                    </Link>
                  ) : (
                    <span>{stat.label}</span>
                  )}
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="practice-section" id={anchors.main}>
          <article className="practice-card practice-panel">
            <div className="practice-section-head">
              <div>
                <div className="practice-kicker">{labels.reference}</div>
                <h2 className="practice-section-title">{labels.axes}</h2>
              </div>
              <p className="practice-section-copy">{labels.axesCopy}</p>
            </div>
            <div className="practice-grid-3">
              {theoryCards.map((card) => {
                const axisId = card.href.slice(1);
                const axisTopics = topicsByAxis[axisId] ?? [];
                return (
                  <article key={card.num} className="practice-theory-card" id={axisId}>
                    <div className="practice-num">{card.num}</div>
                    <h3>{card.title}</h3>
                    <p className="practice-muted">{card.description}</p>
                    {axisTopics.length > 0 ? (
                      <ul className="theory-axis-topics">
                        {axisTopics.map((topic) => (
                          <li key={topic.slug}>
                            <Link href={topic.href}>{topic.title}</Link>
                            <span className="theory-axis-topics__meta">{topic.meta}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <a href={card.href} className="practice-linkline">
                        {card.link}
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </article>
        </section>

        <section className="practice-section" id={anchors.verbs}>
          <article className="practice-card practice-panel">
            <div className="practice-section-head">
              <div>
                <div className="practice-kicker">{labels.verbsKicker}</div>
                <h2 className="practice-section-title">{labels.verbsTitle}</h2>
              </div>
              <p className="practice-section-copy">{labels.verbsCopy}</p>
            </div>
            <VerbConjugator locale={locale} />
          </article>
        </section>

        <section className="practice-section" aria-label="Journey and topics">
          <div className="practice-journey">
            <article className="practice-card practice-panel">
              <div className="practice-section-head">
                <div>
                  <div className="practice-kicker">{labels.journey}</div>
                  <h2 className="practice-section-title practice-section-title-sm">
                    {labels.thenPractice}
                  </h2>
                </div>
              </div>
              <div className="practice-grid-3">
                {theoryFlow.map((step) => (
                  <article key={step.num} className="practice-flow-card">
                    <div className="practice-num">{step.num}</div>
                    <h3>{step.title}</h3>
                    <p className="practice-muted">{step.description}</p>
                    {"link" in step && (
                      <Link href={step.link} className="practice-linkline">
                        {labels.openPractice}
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </article>

            <article className="practice-card practice-panel" id="topicos">
              <div className="practice-section-head">
                <div>
                  <div className="practice-kicker">{labels.sampleThemes}</div>
                  <h2 className="practice-section-title practice-section-title-sm">
                    {labels.topics}
                  </h2>
                </div>
              </div>
              <div className="practice-grid-2">
                {sampleTopics.map((topic) => (
                  <article key={topic.title} className="practice-topic-card">
                    <span className="practice-badge practice-badge-neutral">
                      {labels.theoryTest}
                    </span>
                    <h3>{topic.title}</h3>
                    <p className="practice-muted">{topic.description}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <p className="practice-muted" style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
          {topics.length > 0 ? "Novos temas são publicados nesta seção." : labels.footerSoon}{" "}
          <Link href={localizedPath(locale, "practice")} className="practice-linkline">
            {labels.footerPracticeLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
