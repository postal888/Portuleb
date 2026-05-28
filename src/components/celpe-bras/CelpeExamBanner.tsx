export function CelpeExamBanner() {
  return (
    <div className="celpe-exam-banner" role="img" aria-label="Identidade visual inspirada no Caderno de Questões Celpe-Bras 2026/1">
      <div className="celpe-exam-banner-wave" aria-hidden>
        <div className="celpe-wave celpe-wave-red" />
        <div className="celpe-wave celpe-wave-yellow" />
        <div className="celpe-wave celpe-wave-green" />
        <div className="celpe-wave celpe-wave-blue">
          <span className="celpe-chevron-pattern" />
        </div>
      </div>
      <div className="celpe-exam-banner-content">
        <span className="celpe-edition-badge">
          <span className="celpe-edition-badge-label">Edição</span>
          <span className="celpe-edition-badge-value">2026/1</span>
        </span>
        <div className="celpe-banner-title-wrap">
          <p className="celpe-banner-kicker">
            Certificado de Proficiência em Língua Portuguesa para Estrangeiros
          </p>
          <p className="celpe-banner-logo-text">
            <span className="celpe-logo-celpe">Celpe</span>
            <span className="celpe-logo-arrow" aria-hidden>
              →
            </span>
            <span className="celpe-logo-bras">Bras</span>
          </p>
          <p className="celpe-banner-sub">Caderno de Questões — Parte Escrita</p>
        </div>
        <span className="celpe-page-badge">Guia</span>
      </div>
    </div>
  );
}
