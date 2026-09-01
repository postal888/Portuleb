import { EN_BLOG_SLUGS, RU_BLOG_SLUGS } from "@/lib/blog/locale";
import { getBlogPostBySlug } from "@/lib/blog/loader";

/** Server-only: bundled slugs + JSON posts on disk. */
export function hasEnglishBlogPost(slug: string): boolean {
  return EN_BLOG_SLUGS.has(slug) || getBlogPostBySlug(slug, "en") !== undefined;
}

export function hasRussianBlogPost(slug: string): boolean {
  return RU_BLOG_SLUGS.has(slug) || getBlogPostBySlug(slug, "ru") !== undefined;
}
