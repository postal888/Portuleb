import type { BlogPost } from "@/content/blog/types";
import { resolveBlogLocale } from "@/lib/blog/locale";
import { localizedPath } from "@/lib/i18n-links";
import { absoluteUrl, SITE } from "@/lib/site";

export function getIndexNowKey(): string | null {
  return process.env.INDEXNOW_KEY?.trim() || null;
}

export function isIndexNowConfigured(): boolean {
  return Boolean(getIndexNowKey());
}

export function indexNowKeyFileUrl(): string | null {
  const key = getIndexNowKey();
  return key ? absoluteUrl(`/${key}.txt`) : null;
}

export async function notifyIndexNow(urls: string[]): Promise<void> {
  const key = getIndexNowKey();
  const unique = [...new Set(urls.map((u) => u.trim()).filter(Boolean))];
  if (!key || unique.length === 0) return;

  const host = new URL(SITE.url).hostname;
  const keyLocation = indexNowKeyFileUrl()!;

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: unique.slice(0, 10_000),
    }),
  });

  if (!res.ok && res.status !== 202) {
    throw new Error(`IndexNow HTTP ${res.status}`);
  }
}

export async function notifyIndexNowForBlogPost(post: BlogPost): Promise<void> {
  const locale = resolveBlogLocale(post.locale);
  const path = localizedPath(locale, "blogPost", { slug: post.slug });
  await notifyIndexNow([absoluteUrl(path)]);
}
