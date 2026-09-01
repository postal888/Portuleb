import { estruturasPortuguesNegocios } from "./estruturas-portugues-negocios";
import { practiceLessonPath } from "./lesson-paths";
import type { PracticeLesson } from "./types";

/** All registered pt-BR practice lessons — drives hub cards and sitemap. */
export const practiceLessons: PracticeLesson[] = [estruturasPortuguesNegocios];

export type PracticeLessonSummary = {
  slug: string;
  categoryPath: string;
  href: string;
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
};

export function listPracticeLessonSummaries(): PracticeLessonSummary[] {
  return practiceLessons.map((lesson) => ({
    slug: lesson.meta.slug,
    categoryPath: lesson.meta.categoryPath,
    href: practiceLessonPath(lesson.meta.categoryPath, lesson.meta.slug),
    title: lesson.meta.title,
    subtitle: lesson.hero.lead.slice(0, 120) + (lesson.hero.lead.length > 120 ? "…" : ""),
    meta: `${lesson.meta.level} · ${lesson.meta.duration}`,
    badge: lesson.meta.eyebrow.split("·").pop()?.trim() ?? "Lição",
  }));
}

export function getPracticeLesson(slug: string): PracticeLesson | undefined {
  return practiceLessons.find((l) => l.meta.slug === slug);
}

export function getPracticeLessonByPath(categoryPath: string, slug: string): PracticeLesson | undefined {
  const lesson = getPracticeLesson(slug);
  if (!lesson || lesson.meta.categoryPath !== categoryPath) return undefined;
  return lesson;
}

export type { PracticeLesson } from "./types";
