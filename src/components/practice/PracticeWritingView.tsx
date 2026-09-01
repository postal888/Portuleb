import { getPracticeHub } from "@/content/pratica";
import type { Locale } from "@/i18n/locales";
import { PracticeAreaShell } from "./PracticeAreaShell";

export function PracticeWritingView({ locale }: { locale: Locale }) {
  const { writingSteps } = getPracticeHub(locale);

  const title = locale === "en" ? "Write" : locale === "ru" ? "Письмо" : "Escrever";
  const lead =
    locale === "en"
      ? "Written production with feedback aligned to Celpe-Bras criteria."
      : locale === "ru"
        ? "Письменная работа с обратной связью по критериям Celpe-Bras."
        : "Produção de texto com avaliação alinhada aos critérios do Celpe-Bras.";

  return (
    <PracticeAreaShell locale={locale} title={title} kicker="Output" lead={lead}>
      <section className="practice-section">
        <article className="practice-card practice-panel">
          <div className="practice-stack">
            {writingSteps.map((step) => (
              <div key={step.name} className="practice-step-row">
                <div className="practice-step-name">{step.name}</div>
                <p className="practice-muted">{step.description}</p>
                <span className="practice-pill">{step.pill}</span>
              </div>
            ))}
          </div>
          <p className="practice-muted" style={{ marginTop: "1.25rem" }}>
            {locale === "en"
              ? "Interactive writing tasks will be linked here soon."
              : locale === "ru"
                ? "Интерактивные задания на письмо появятся здесь позже."
                : "Tarefas interativas de escrita serão ligadas em breve."}
          </p>
        </article>
      </section>
    </PracticeAreaShell>
  );
}
