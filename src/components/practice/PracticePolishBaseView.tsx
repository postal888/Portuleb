import Link from "next/link";
import { getPracticeHub } from "@/content/pratica";
import { listPracticeLessonSummaries } from "@/content/practice";
import type { Locale } from "@/i18n/locales";
import { getExerciciosMessages } from "@/content/pratica/exercicios-messages";
import { ExerciseExplorer } from "@/components/pratica/ExerciseExplorer";
import { PracticeAreaShell } from "./PracticeAreaShell";

export function PracticePolishBaseView({ locale }: { locale: Locale }) {
  const hub = getPracticeHub(locale);
  const { polishBaseSteps } = hub;
  const exr = getExerciciosMessages(locale);
  const lessonSummaries = locale === "pt-br" ? listPracticeLessonSummaries() : [];

  const title =
    locale === "en" ? "Strengthen the basics" : locale === "ru" ? "Полировка базы" : "Polir a base";

  return (
    <PracticeAreaShell locale={locale} title={title} kicker="Foundation" lead={exr.copy}>
      <section className="practice-section">
        <article className="practice-card practice-panel">
          <div className="practice-stack" style={{ marginBottom: "1.75rem" }}>
            {polishBaseSteps.map((step) => (
              <div key={step.name} className="practice-step-row">
                <div className="practice-step-name">{step.name}</div>
                <p className="practice-muted">{step.description}</p>
                <span className="practice-pill">{step.pill}</span>
              </div>
            ))}
          </div>

          {lessonSummaries.length > 0 ? (
            <>
              <h2 className="practice-section-title practice-section-title-sm" style={{ marginBottom: "0.75rem" }}>
                Lições guiadas
              </h2>
              <div
                className="practice-grid-4"
                style={{ marginBottom: "1.75rem", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
              >
                {lessonSummaries.map((lesson) => (
                  <Link key={lesson.slug} href={lesson.href} className="lesson-card-link">
                    <div className="lesson-card-link__badge">{lesson.badge}</div>
                    <h3 className="lesson-card-link__title">{lesson.title}</h3>
                    <p className="lesson-card-link__meta">{lesson.meta}</p>
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          <h2 className="practice-section-title practice-section-title-sm" style={{ marginBottom: "1rem" }}>
            {exr.title}
          </h2>
          <ExerciseExplorer locale={locale} />
        </article>
      </section>
    </PracticeAreaShell>
  );
}
