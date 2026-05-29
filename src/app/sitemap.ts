import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/content/blog";
import { SITE } from "@/lib/site";

const provasSlugs = ["2026-1"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/pt-br",
    "/pt-br/celpe-bras",
    "/pt-br/provas-anteriores",
    "/pt-br/pratica",
    "/pt-br/teoria",
    "/pt-br/blog",
    "/pt-br/materiais",
    "/pt-br/contato",
    "/pt-br/termos",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/pt-br" ? 1 : 0.7,
  }));

  const blogRoutes = getBlogPosts().map((post) => ({
    url: `${SITE.url}/pt-br/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const provasRoutes = provasSlugs.map((slug) => ({
    url: `${SITE.url}/pt-br/provas-anteriores/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...provasRoutes];
}
