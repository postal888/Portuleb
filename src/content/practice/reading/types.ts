import type { AnnotatedTextBlock } from "../types";

export type ReadingExpressionGuideEntry = {
  id: string;
  portuguese: string;
  english: string;
  /** Optional Russian gloss (shown via EN/RU toggle in the lesson panel). */
  russian?: string;
  example: string;
  explanation: string;
};

export type ReadingExpressionGuide = {
  sectionTitle: string;
  intro: string;
  entries: ReadingExpressionGuideEntry[];
};

export type ReadingSourceCredits = {
  originalTitle: string;
  author: string;
  publication: string;
  sourceUrl: string;
};

/** Timed caption line for video lessons (preloaded under the player). */
export type ReadingSubtitleCue = {
  startMs: number;
  endMs: number;
  text: string;
  /** Optional full-line English translation. */
  en?: string;
  /** Optional full-line Russian translation. */
  ru?: string;
};

/** Word-level caption token for karaoke-style highlight. */
export type ReadingSubtitleWord = {
  startMs: number;
  endMs: number;
  text: string;
};

/** Reading article — annotated text + expression guide below. */
export type ReadingArticle = {
  meta: {
    slug: string;
    categoryPath: string;
    title: string;
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    level: string;
    duration: string;
    tags: string[];
  };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    objectives: string[];
  };
  annotatedText: {
    sectionTitle: string;
    intro: string;
    blocks: AnnotatedTextBlock[];
  };
  expressionGuide: ReadingExpressionGuide;
  media?: {
    /** YouTube video id for pronunciation (e.g. dQw4w9WgXcQ). */
    youtubeVideoId?: string;
    /** Full caption track shown under the player when present. */
    subtitles?: ReadingSubtitleCue[];
    subtitlesLabel?: string;
    /** Optional word timings for karaoke highlight while listening. */
    words?: ReadingSubtitleWord[];
  };
  didacticDisclaimer: string;
  adaptationNote: string;
  sourceCredits: ReadingSourceCredits;
  closingNote: {
    title: string;
    body: string;
    links: { label: string; href: string }[];
  };
};

export type ReadingArticleSummary = {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
};
