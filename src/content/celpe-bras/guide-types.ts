import type { SectionKey } from "@/i18n/route-map";

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
