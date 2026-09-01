import type { MultipleChoiceBlock } from "@/content/practice/types";

/**
 * Meta for a standalone theory topic page under /pt-br/teoria/{slug}.
 * `keyword` is the phrase as people actually search it — slug, H1 and seoTitle
 * must stay free of the "celpe-bras" suffix so the page can rank for the bare
 * term. The exam angle lives in `examAngle`, at the end of the page.
 */
export type TheoryTopicMeta = {
  slug: string;
  keyword: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  axis: "gramatica" | "vocabulario" | "generos";
  level: string;
  readingTime: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
};

export type ProseSection = {
  kind: "prose";
  id: string;
  title: string;
  paragraphs: string[];
};

export type RuleSection = {
  kind: "rule";
  id: string;
  title: string;
  intro?: string;
  items: { label: string; text: string; example?: string }[];
};

export type TableSection = {
  kind: "table";
  id: string;
  title: string;
  intro?: string;
  caption?: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type ExamplesSection = {
  kind: "examples";
  id: string;
  title: string;
  intro?: string;
  items: { text: string; note?: string }[];
};

/** Side-by-side pairs — for topics built on a confusion ("mais ou mas"). */
export type ContrastSection = {
  kind: "contrast";
  id: string;
  title: string;
  intro?: string;
  pairs: { left: string; leftGloss: string; right: string; rightGloss: string; test: string }[];
};

export type MistakesSection = {
  kind: "mistakes";
  id: string;
  title: string;
  intro?: string;
  items: { wrong: string; right: string; why: string }[];
};

export type TheorySection =
  | ProseSection
  | RuleSection
  | TableSection
  | ExamplesSection
  | ContrastSection
  | MistakesSection;

export type TheoryTopic = {
  meta: TheoryTopicMeta;
  hero: {
    kicker: string;
    title: string;
    lead: string;
    /** Two or three sentences that answer the query on their own. */
    quickAnswer: string;
  };
  sections: TheorySection[];
  quiz: MultipleChoiceBlock[];
  /** How the topic shows up in the exam — deliberately after the grammar. */
  examAngle: {
    title: string;
    body: string;
    bullets: string[];
  };
  faq: { question: string; answer: string }[];
  related: { label: string; href: string; description: string }[];
};
