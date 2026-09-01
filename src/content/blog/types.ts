export type ExamArtifactKind = "transcript" | "prompt" | "modelAnswer";

export type ArticleBlock =
  | { type: "p"; content: string; lead?: boolean; leadLabel?: string; lang?: "pt" | "en" }
  | { type: "h2"; content: string; lang?: "pt" | "en" }
  | { type: "h3"; content: string; lang?: "pt" | "en" }
  | { type: "ul"; items: string[]; lang?: "pt" | "en" }
  | { type: "callout"; title: string; content: string; lang?: "pt" | "en" }
  | { type: "scale"; title: string; content: string; lang?: "pt" | "en" }
  | { type: "video"; src: string; title?: string; caption?: string }
  | { type: "geoBox"; title: string; items: string[]; variant?: "summary" | "learn" }
  | { type: "internalLinks"; links: { label: string; href: string }[] }
  | { type: "lexGrid"; columns: { title: string; items: string[] }[]; lang?: "pt" }
  /** Authentic exam source — never translated on EN pages. */
  | { type: "examArtifact"; kind: ExamArtifactKind; content: string; title?: string };

export type BlogFaqItem = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  /** Content locale; EN posts may embed PT exam artifacts. */
  locale?: "pt-br" | "en" | "ru";
  /** PT slug when this post is an English version of a PT article. */
  translationOf?: string;
  title: string;
  subtitle: string;
  seoTitle?: string;
  seoDescription?: string;
  eyebrow: string;
  category: string;
  readTime: string;
  featured: boolean;
  publishedAt: string;
  tags: string[];
  faq?: BlogFaqItem[];
  sidebar: {
    summary: string;
    facts?: { title: string; items: string[] };
    audienceHeading?: string;
    audience: string[];
    links: { label: string; href: string; hint: string }[];
  };
  blocks: ArticleBlock[];
};
