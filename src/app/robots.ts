import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const DISALLOW_PRIVATE = ["/api/", "/admin"];

/** Block AI training / extended crawlers. */
const TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

/** Explicitly allow AI search / citation crawlers (GEO). */
const SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PRIVATE,
      },
      {
        userAgent: TRAINING_BOTS,
        disallow: "/",
      },
      {
        userAgent: SEARCH_BOTS,
        allow: "/",
        disallow: DISALLOW_PRIVATE,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
