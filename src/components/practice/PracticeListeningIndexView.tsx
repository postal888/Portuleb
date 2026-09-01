import Link from "next/link";
import { listListeningLessonSummaries } from "@/content/practice/reading";
import { PracticeAreaShell } from "@/components/practice/PracticeAreaShell";

export function PracticeListeningIndexView() {
  const lessons = listListeningLessonSummaries();

  return (
    <PracticeAreaShell
      locale="pt-br"
      title="Ouvir"
      kicker="Input"
      lead="Vídeos e áudios com legendas, glossário e expressões — treino de compreensão oral no ritmo real do português brasileiro."
    >
      <section className="practice-section">
        <article className="practice-card practice-panel">
          <h2 className="practice-section-title practice-section-title-sm" style={{ marginBottom: "0.75rem" }}>
            Vídeos anotados
          </h2>
          <p className="practice-section-copy" style={{ marginBottom: "1.25rem" }}>
            Assista com legendas sincronizadas, pause nas expressões e alterne as traduções EN/RU.
          </p>
          {lessons.length === 0 ? (
            <p className="practice-section-copy">Materiais serão adicionados em breve.</p>
          ) : (
            <div
              className="practice-grid-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
            >
              {lessons.map((lesson) => (
                <Link key={lesson.slug} href={lesson.href} className="lesson-card-link">
                  <div className="lesson-card-link__badge">{lesson.badge}</div>
                  <h3 className="lesson-card-link__title">{lesson.title}</h3>
                  <p className="lesson-card-link__meta">{lesson.meta}</p>
                </Link>
              ))}
            </div>
          )}
        </article>
      </section>
    </PracticeAreaShell>
  );
}
