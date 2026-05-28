import { analiseTarefa12026_1 } from "./posts/analise-tarefa-1-2026-1";
import { estrategiaMinimalista } from "./posts/estrategia-minimalista";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [analiseTarefa12026_1, estrategiaMinimalista].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}
