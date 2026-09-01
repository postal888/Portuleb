import Link from "next/link";
import { getPracticeHub } from "@/content/pratica";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

function tileClass(variant: "default" | "highlight" | "support") {
  if (variant === "highlight") return "practice-tile practice-tile-highlight";
  if (variant === "support") return "practice-tile practice-tile-support";
  return "practice-tile";
}

function badgeClass(variant: "primary" | "gold") {
  return variant === "gold" ? "practice-badge practice-badge-gold" : "practice-badge";
}

export function PracticeHubView({ locale }: { locale: Locale }) {
  const hub = getPracticeHub(locale);
  const { practiceHero, practiceTiles } = hub;
  const ui = hub.ui;
  const common = getUi(locale);

  const labels = ui ?? {
    home: common.breadcrumb.home,
    practice: locale === "en" ? "Practice" : locale === "ru" ? "Практика" : "Prática",
    seeSkills: "Ver habilidades",
    goTheory: locale === "en" ? "Go to Theory" : locale === "ru" ? "К теории" : "Ir para Teoria",
    practiceAreas: "Áreas de prática",
    skills: "Habilidades",
    skillsCopy:
      "Escolha uma área — ouvir, ler, escrever ou polir a base — para ver materiais e tarefas.",
    open: "Abrir",
    footerTheory: "Para revisar regras e fazer testes por tema, use a seção",
    footerTheoryLink: "Teoria →",
    footerSoon: "Conteúdos interativos serão ligados em breve.",
    footerPast: "Explorar provas anteriores →",
  };

  return (
    <div className="practice-hub">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath(locale, "home")}>{labels.home}</Link>
          <span aria-hidden> / </span>
          <span>{labels.practice}</span>
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
                  {labels.seeSkills}
                </a>
                <Link
                  href={localizedPath(locale, "theory")}
                  className="practice-btn practice-btn-secondary"
                >
                  {labels.goTheory}
                </Link>
              </div>
            </article>
            <aside className="practice-card practice-hero-side" aria-label="Summary">
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
                <div className="practice-kicker">{labels.practiceAreas}</div>
                <h2 className="practice-section-title">{labels.skills}</h2>
              </div>
              <p className="practice-section-copy">{labels.skillsCopy}</p>
            </div>
            <div className="practice-grid-4">
              {practiceTiles.map((tile) => (
                <Link
                  key={tile.id}
                  href={tile.href}
                  className={`${tileClass(tile.variant)} practice-tile-link`}
                >
                  <div className="practice-icon" aria-hidden>
                    {tile.icon}
                  </div>
                  <span className={badgeClass(tile.badgeVariant)}>{tile.badge}</span>
                  <h3>{tile.title}</h3>
                  <p className="practice-muted">{tile.description}</p>
                  <div className="practice-meta">
                    <span>{tile.meta}</span>
                    <span className="practice-meta-link">{labels.open} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </section>

        <p className="practice-muted" style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
          {labels.footerTheory}{" "}
          <Link href={localizedPath(locale, "theory")} className="practice-linkline">
            {labels.footerTheoryLink}
          </Link>{" "}
          {labels.footerSoon}{" "}
          <Link href={localizedPath(locale, "pastExams")} className="practice-linkline">
            {labels.footerPast}
          </Link>
        </p>
      </div>
    </div>
  );
}
