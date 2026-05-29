import fs from "fs";
import path from "path";
import type { BlogPost } from "@/content/blog/types";
import { analiseTarefa12026_1 } from "@/content/blog/posts/analise-tarefa-1-2026-1";
import { estrategiaMinimalista } from "@/content/blog/posts/estrategia-minimalista";

const JSON_DIR = path.join(process.cwd(), "data", "blog", "posts");

const bundledPosts: BlogPost[] = [analiseTarefa12026_1, estrategiaMinimalista];

function readJsonPosts(): BlogPost[] {
  if (!fs.existsSync(JSON_DIR)) return [];
  const files = fs.readdirSync(JSON_DIR).filter((f) => f.endsWith(".json"));
  const posts: BlogPost[] = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(JSON_DIR, file), "utf8");
      posts.push(JSON.parse(raw) as BlogPost);
    } catch {
      // skip invalid files
    }
  }
  return posts;
}

/** Published posts only (JSON overrides TS by slug). */
export function loadAllBlogPosts(): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const post of bundledPosts) bySlug.set(post.slug, post);
  for (const post of readJsonPosts()) bySlug.set(post.slug, post);
  return [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return loadAllBlogPosts().find((p) => p.slug === slug);
}

export function saveBlogPostJson(post: BlogPost): void {
  if (!fs.existsSync(JSON_DIR)) fs.mkdirSync(JSON_DIR, { recursive: true });
  const filePath = path.join(JSON_DIR, `${post.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), "utf8");
}

export function deleteBlogPostJson(slug: string): boolean {
  const filePath = path.join(JSON_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

export function listJsonPostSlugs(): string[] {
  if (!fs.existsSync(JSON_DIR)) return [];
  return fs
    .readdirSync(JSON_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}
