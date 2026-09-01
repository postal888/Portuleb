import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/locales";
import type { BlogPost } from "@/content/blog/types";
import { resolveBlogLocale } from "@/lib/blog/locale";
import { analiseTarefa12026_1 } from "@/content/blog/posts/analise-tarefa-1-2026-1";
import { analiseTarefa12026_1_en } from "@/content/blog/posts/analise-tarefa-1-festival-fartura-2026-1.en";
import { analiseTarefa12026_1_ru } from "@/content/blog/posts/analise-tarefa-1-festival-fartura-2026-1.ru";
import { estrategiaMinimalista } from "@/content/blog/posts/estrategia-minimalista";
import { repeticaoEspacada_en } from "@/content/blog/posts/repeticao-espacada-aprendizado-vocabulario.en";

const JSON_DIR = path.join(process.cwd(), "data", "blog", "posts");

const bundledPostsPt: BlogPost[] = [analiseTarefa12026_1, estrategiaMinimalista];
const bundledPostsEn: BlogPost[] = [analiseTarefa12026_1_en, repeticaoEspacada_en];
const bundledPostsRu: BlogPost[] = [analiseTarefa12026_1_ru];

function jsonFilePath(slug: string, locale: Locale): string {
  const fileName = locale === "pt-br" ? `${slug}.json` : `${slug}.${locale}.json`;
  return path.join(JSON_DIR, fileName);
}

function readJsonPostsForLocale(locale: Locale): BlogPost[] {
  if (!fs.existsSync(JSON_DIR)) return [];
  const suffix =
    locale === "pt-br" ? ".json" : locale === "en" ? ".en.json" : ".ru.json";
  const files = fs.readdirSync(JSON_DIR).filter((f) => f.endsWith(suffix));
  const posts: BlogPost[] = [];
  for (const file of files) {
    if (locale === "pt-br" && (file.endsWith(".en.json") || file.endsWith(".ru.json"))) {
      continue;
    }
    try {
      const raw = fs.readFileSync(path.join(JSON_DIR, file), "utf8");
      const post = JSON.parse(raw) as BlogPost;
      posts.push({ ...post, locale: post.locale ?? locale });
    } catch {
      // skip invalid files
    }
  }
  return posts;
}

function mergePosts(bundled: BlogPost[], jsonPosts: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const post of bundled) bySlug.set(post.slug, post);
  for (const post of jsonPosts) {
    if (resolveBlogLocale(post.locale) !== "pt-br") continue;
    bySlug.set(post.slug, post);
  }
  return [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function mergeBundledWithJson(bundled: BlogPost[], locale: Locale): BlogPost[] {
  const jsonPosts = readJsonPostsForLocale(locale);
  const bySlug = new Map<string, BlogPost>();
  for (const post of bundled) bySlug.set(post.slug, post);
  for (const post of jsonPosts) bySlug.set(post.slug, post);
  return [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function loadAllBlogPosts(locale: Locale = "pt-br"): BlogPost[] {
  if (locale === "en") return mergeBundledWithJson(bundledPostsEn, "en");
  if (locale === "ru") return mergeBundledWithJson(bundledPostsRu, "ru");
  return mergePosts(bundledPostsPt, readJsonPostsForLocale("pt-br"));
}

export function getBlogPostBySlug(slug: string, locale: Locale = "pt-br"): BlogPost | undefined {
  return loadAllBlogPosts(locale).find((p) => p.slug === slug);
}

export function saveBlogPostJson(post: BlogPost): void {
  if (!fs.existsSync(JSON_DIR)) fs.mkdirSync(JSON_DIR, { recursive: true });
  const locale = resolveBlogLocale(post.locale);
  const filePath = jsonFilePath(post.slug, locale);
  fs.writeFileSync(filePath, JSON.stringify({ ...post, locale }, null, 2), "utf8");
}

export function deleteBlogPostJson(slug: string, locale: Locale = "pt-br"): boolean {
  const filePath = jsonFilePath(slug, locale);
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
