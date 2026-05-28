import { estrategiaMinimalista } from "./posts/estrategia-minimalista";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [estrategiaMinimalista];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}
