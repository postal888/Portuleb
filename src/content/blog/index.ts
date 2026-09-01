import type { Locale } from "@/i18n/locales";
import { getBlogPostBySlug, loadAllBlogPosts } from "@/lib/blog/loader";
import type { BlogPost } from "./types";

export type { BlogPost, ArticleBlock, ExamArtifactKind } from "./types";

export function getBlogPosts(locale: Locale = "pt-br"): BlogPost[] {
  return loadAllBlogPosts(locale);
}

/** @deprecated use getBlogPosts(locale) */
export const blogPosts = getBlogPosts("pt-br");

export function getBlogPost(slug: string, locale: Locale = "pt-br"): BlogPost | undefined {
  return getBlogPostBySlug(slug, locale);
}

export function getFeaturedPost(): BlogPost {
  const posts = getBlogPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}
