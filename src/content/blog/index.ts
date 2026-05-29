import { getBlogPostBySlug, loadAllBlogPosts } from "@/lib/blog/loader";
import type { BlogPost } from "./types";

export type { BlogPost, ArticleBlock } from "./types";

export function getBlogPosts(): BlogPost[] {
  return loadAllBlogPosts();
}

/** @deprecated use getBlogPosts() */
export const blogPosts = getBlogPosts();

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPostBySlug(slug);
}

export function getFeaturedPost(): BlogPost {
  const posts = getBlogPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}
