import Link from "next/link";
import {
  polishBaseSteps,
  practiceHero,
  practiceTiles,
  writingSteps,
} from "@/content/pratica/hub";

function tileClass(variant: (typeof practiceTiles)[number]["variant"]) {
  if (variant === "highlight") return "practice-tile practice-tile-highlight";
  if (variant === "support") return "practice-tile practice-tile-support";
  return "practice-tile";
}

function badgeClass(variant: "primary" | "gold") {
  return variant === "gold" ? "practice-badge practice-badge-gold" : "practice-badge";
}

export function PracticeHubView() {
  return (
    <div className="practice-hub">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/pt-br">Início</Link>
          <span aria-hidden> / </span>
          <span>Prática</span>
        </nav>

        <section className="practice-hero">
          <div className="practice-eyebrow">{practiceHero.eyebrow}</div>
          <div className="practice-hero-grid">
            <article className="practice-card practice-hero-main">
              <div className="practice-kicker">{practiceHero.kicker}</div>
              <h1 className="practice-title">{practiceHero.title}</h1>
              <p className="practice-lead">{practiceHero.lead}</p>
              <div className="practice-actions">
                <a href="#habilidades" className="practice-btn practice-btn-primary">
                  Ver habilidades
                </a>
                <Link href="/pt-br/teoria" className="practice-btn practice-btn-secondary">
                  Ir para Teoria
                </Link>
              </div>
            </article>
            <aside className="practice-card practice-hero-side" aria-label="Resumo">
              {practiceHero.stats.map((stat) => (
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

        <section className="practice-section" id="habilidades">
          <article className="practice-card practice-panel">
            <div className="practice-section-head">
              <div>
                <div className="practice-kicker">Áreas de prática</div>
                <h2 className="practice-section-title">Habilidades</h2>
              </div>
              <p className="practice-section-copy">
                Ouvir, ler, escrever ou reforçar a base com drills — sem leituras longas de teoria
                nesta página.
              </p>
            </div>
            <div className="practice-grid-4">
              {practiceTiles.map((tile) => (
                <article key={tile.id} id={tile.id} className={tileClass(tile.variant)}>
                  <div className="practice-icon" aria-hidden>
                    {tile.icon}
                  </div>
                  <span className={badgeClass(tile.badgeVariant)}>{tile.badge}</span>
                  <h3>{tile.title}</h3>
                  <p className="practice-muted">{tile.description}</p>
                  <div className="practice-meta">
                    <span>{tile.meta}</span>
                    <a href={tile.href} className="practice-meta-link">
                      Abrir
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="practice-section" aria-label="Detalhes da prática">
          <div className="practice-grid-2">
            <article className="practice-card practice-split-card" id="polir-a-base-detalhe">
              <div className="practice-section-head" style={{ marginBottom: "0.625rem" }}>
                <div>
                  <div className="practice-kicker">Dentro de Prática</div>
                  <h2 className="practice-section-title practice-section-title-sm">
                    Polir a base
                  </h2>
                </div>
              </div>
              <div className="practice-stack">
                {polishBaseSteps.map((step) => (
                  <div key={step.name} className="practice-step-row">
                    <div className="practice-step-name">{step.name}</div>
                    <p className="practice-muted">{step.description}</p>
                    <span className="practice-pill">{step.pill}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="practice-card practice-split-card" id="escrever-detalhe">
              <div className="practice-section-head" style={{ marginBottom: "0.625rem" }}>
                <div>
                  <div className="practice-kicker">Dentro de Prática</div>
                  <h2 className="practice-section-title practice-section-title-sm">Escrever</h2>
                </div>
              </div>
              <div className="practice-stack">
                {writingSteps.map((step) => (
                  <div key={step.name} className="practice-step-row">
                    <div className="practice-step-name">{step.name}</div>
                    <p className="practice-muted">{step.description}</p>
                    <span className="practice-pill">{step.pill}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <p className="practice-muted" style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
          Para revisar regras e fazer testes por tema, use a seção{" "}
          <Link href="/pt-br/teoria" className="practice-linkline">
            Teoria →
          </Link>
          . Conteúdos interativos serão ligados em breve.{" "}
          <Link href="/pt-br/provas-anteriores" className="practice-linkline">
            Explorar provas anteriores →
          </Link>
        </p>
      </div>
    </div>
  );
}
