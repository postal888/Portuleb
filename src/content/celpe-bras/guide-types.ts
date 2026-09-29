import type { SectionKey } from "@/i18n/route-map";
import type { OfficialSourceLink } from "@/lib/seo/official-sources";

export type GuideAnchorKey =
  | "booklet"
  | "whatIs"
  | "howWorks"
  | "parts"
  | "criteria"
  | "levels"
  | "registration"
  | "faq";

export type CelpeBrasGuideContent = {
  anchors: Record<GuideAnchorKey, string>;
  /** Visible independence line under the hero (PT/EN). Omit on RU while that URL is rank-frozen. */
  independenceNote?: string;
  /** Last substantive content revision (ISO date) for page-level schema. */
  dateModified?: string;
  datePublished?: string;
  officialSourcesTitle?: string;
  officialSources?: OfficialSourceLink[];
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaBooklet: string;
    ctaPastExams: string;
  };
  booklet: {
    title: string;
    subtitle: string;
    linkLabel: string;
    pastExamSlug: string;
    materialId: string;
  };
  taskStripLabel: string;
  quickFactsTitle: string;
  quickFacts: string[];
  indexTitle: string;
  indexLinks: { anchor: GuideAnchorKey; label: string }[];
  whatIs: { title: string; paragraphs: string[] };
  howWorks: { title: string; paragraphs: string[] };
  parts: {
    title: string;
    cards: { title: string; body: string; variant: "green" | "blue" }[];
  };
  criteria: { title: string; paragraphs: string[] };
  levels: {
    title: string;
    paragraphs: string[];
    validityLabel: string;
    validityText: string;
  };
  registration: { title: string; paragraphs: string[] };
  nextSteps: {
    title: string;
    items: (
      | { type: "anchor"; anchor: GuideAnchorKey; label: string; suffix: string }
      | { type: "link"; section: SectionKey; label: string; suffix: string; slug?: string }
    )[];
  };
  faqTitle: string;
  faq: { question: string; answer: string }[];
};
