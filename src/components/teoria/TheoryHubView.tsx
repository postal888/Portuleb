import Link from "next/link";
import {
  sampleTopics,
  theoryCards,
  theoryFlow,
  theoryHero,
} from "@/content/teoria/hub";

export function TheoryHubView() {
  return (
    <div className="practice-hub">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/pt-br">Início</Link>
          <span aria-hidden> / </span>
          <span>Teoria</span>
        </nav>

        <section className="practice-hero">
          <div className="practice-eyebrow">{theoryHero.eyebrow}</div>
          <div className="practice-hero-grid">
            <article className="practice-card practice-hero-main">
              <div className="practice-kicker">{theoryHero.kicker}</div>
              <h1 className="practice-title">{theoryHero.title}</h1>
              <p className="practice-lead">{theoryHero.lead}</p>
              <div className="practice-actions">
                <a href="#eixos" className="practice-btn practice-btn-primary">
                  Ver eixos
                </a>
                <Link href="/pt-br/pratica" className="practice-btn practice-btn-secondary">
                  Ir para Prática
                </Link>
              </div>
            </article>
            <aside className="practice-card practice-hero-side" aria-label="Resumo">
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

        <section className="practice-section" id="eixos">
          <article className="practice-card practice-panel">
            <div className="practice-section-head">
              <div>
                <div className="practice-kicker">Referência</div>
                <h2 className="practice-section-title">Eixos de teoria</h2>
              </div>
              <p className="practice-section-copy">
                Explicações curtas, tabelas, exemplos e saída para testes — a base antes de aplicar
                na Prática.
              </p>
            </div>
            <div className="practice-grid-3">
              {theoryCards.map((card) => (
                <article key={card.num} className="practice-theory-card" id={card.href.slice(1)}>
                  <div className="practice-num">{card.num}</div>
                  <h3>{card.title}</h3>
                  <p className="practice-muted">{card.description}</p>
                  <a href={card.href} className="practice-linkline">
                    {card.link}
                  </a>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="practice-section" aria-label="Jornada e tópicos">
          <div className="practice-journey">
            <article className="practice-card practice-panel">
              <div className="practice-section-head">
                <div>
                  <div className="practice-kicker">Da teoria à prática</div>
                  <h2 className="practice-section-title practice-section-title-sm">
                    Depois praticar
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
                        Abrir Prática →
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </article>

            <article className="practice-card practice-panel" id="topicos">
              <div className="practice-section-head">
                <div>
                  <div className="practice-kicker">Exemplos de temas</div>
                  <h2 className="practice-section-title practice-section-title-sm">Tópicos</h2>
                </div>
              </div>
              <div className="practice-grid-2">
                {sampleTopics.map((topic) => (
                  <article key={topic.title} className="practice-topic-card">
                    <span className="practice-badge practice-badge-neutral">Teoria + teste</span>
                    <h3>{topic.title}</h3>
                    <p className="practice-muted">{topic.description}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <p className="practice-muted" style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
          Quizzes e páginas por tema serão ligados em breve.{" "}
          <Link href="/pt-br/pratica" className="practice-linkline">
            Ir para Prática →
          </Link>
        </p>
      </div>
    </div>
  );
}
