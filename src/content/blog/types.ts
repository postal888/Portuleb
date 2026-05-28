export type ArticleBlock =
  | { type: "p"; content: string; lead?: boolean }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; content: string }
  | { type: "scale"; title: string; content: string };

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
    audience: string[];
    links: { label: string; href: string; hint: string }[];
  };
  blocks: ArticleBlock[];
};
