import { listJsonPostSlugs, loadAllBlogPosts } from "@/lib/blog/loader";

export function slugifyTitle(title: string): string {
  const base = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
  return base || "artigo";
}

export function usedSlugs(): Set<string> {
  const slugs = new Set(loadAllBlogPosts().map((p) => p.slug));
  for (const s of listJsonPostSlugs()) slugs.add(s);
  return slugs;
}

export function allocateUniqueSlug(title: string, suggested?: string, used?: Set<string>): string {
  const pool = used ?? usedSlugs();
  let base = slugifyTitle(suggested?.trim() || title);
  if (base.startsWith("article-")) base = base.slice(8).replace(/^-+/, "") || base;
  let candidate = base;
  let n = 2;
  while (pool.has(candidate)) {
    candidate = `${base}-${n}`;
    n += 1;
  }
  pool.add(candidate);
  return candidate;
}
