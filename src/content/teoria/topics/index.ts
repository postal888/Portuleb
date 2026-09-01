import { pathFor } from "@/i18n/route-map";
import { conectivos } from "./conectivos";
import { crase } from "./crase";
import type { TheoryTopic, TheoryTopicMeta } from "./types";

/** All registered pt-BR theory topics — drives hub cards and sitemap. */
export const theoryTopics: TheoryTopic[] = [conectivos, crase];

export const theoryTopicMetas: TheoryTopicMeta[] = theoryTopics.map((topic) => topic.meta);

export function theoryTopicPath(slug: string): string {
  return pathFor("pt-br", "theoryTopic", { slug });
}

export function getTheoryTopic(slug: string): TheoryTopic | undefined {
  return theoryTopics.find((topic) => topic.meta.slug === slug);
}

export type TheoryTopicSummary = {
  slug: string;
  href: string;
  title: string;
  keyword: string;
  lead: string;
  meta: string;
  axis: TheoryTopicMeta["axis"];
};

export function listTheoryTopicSummaries(): TheoryTopicSummary[] {
  return theoryTopics.map((topic) => ({
    slug: topic.meta.slug,
    href: theoryTopicPath(topic.meta.slug),
    title: topic.meta.title,
    keyword: topic.meta.keyword,
    lead: topic.hero.quickAnswer,
    meta: `${topic.meta.level} · ${topic.meta.readingTime}`,
    axis: topic.meta.axis,
  }));
}

export type { TheoryTopic, TheoryTopicMeta } from "./types";
