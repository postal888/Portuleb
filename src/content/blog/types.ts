export type ArticleBlock =
  | { type: "p"; content: string; lead?: boolean; leadLabel?: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; content: string }
  | { type: "scale"; title: string; content: string }
  | { type: "lexGrid"; columns: { title: string; items: string[] }[] };

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  category: string;
  readTime: string;
  featured: boolean;
  publishedAt: string;
  tags: string[];
  sidebar: {
    summary: string;
    facts?: { title: string; items: string[] };
    audienceHeading?: string;
    audience: string[];
    links: { label: string; href: string; hint: string }[];
  };
  blocks: ArticleBlock[];
};
