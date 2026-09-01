import Link from "next/link";
import type { PracticeLesson } from "@/content/practice/types";

type Props = {
  lesson: PracticeLesson;
  practiceHref: string;
};

export function PracticeLessonHero({ lesson, practiceHref }: Props) {
  const { meta, hero } = lesson;

  return (
    <header className="lesson-hero">
      <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/pt-br">Início</Link>
        <span aria-hidden> / </span>
        <Link href={practiceHref}>Prática</Link>
        <span aria-hidden> / </span>
        <span>{meta.title}</span>
      </nav>

      <div className="lesson-hero__eyebrow">{meta.eyebrow}</div>
      <div className="lesson-hero__grid">
        <div className="lesson-hero__main">
          <p className="practice-kicker">{hero.kicker}</p>
          <h1 className="lesson-hero__title">{hero.title}</h1>
          <p className="lesson-hero__lead">{hero.lead}</p>
          <ul className="lesson-hero__objectives">
            {hero.objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="lesson-hero__aside" aria-label="Informações da lição">
          <div className="lesson-meta-row">
            <span className="lesson-meta-label">Nível</span>
            <span>{meta.level}</span>
          </div>
          <div className="lesson-meta-row">
            <span className="lesson-meta-label">Duração</span>
            <span>{meta.duration}</span>
          </div>
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
  );
}
