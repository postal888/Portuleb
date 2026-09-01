import type { MetadataRoute } from "next";
import { archiveSlugs } from "@/content/archive";
import { getBlogPosts } from "@/content/blog";
import { examCycleMetas } from "@/content/celpe-bras/cycles";
import { practiceLessons } from "@/content/practice";
import { practiceLessonPath } from "@/content/practice/lesson-paths";
import { readingArticles } from "@/content/practice/reading";
import { readingArticlePath } from "@/content/practice/reading/article-paths";
import { theoryTopicMetas } from "@/content/teoria/topics";
import { alternatesForSection, pathFor, type SectionKey } from "@/i18n/route-map";
import { hasEnglishBlogPost, hasRussianBlogPost } from "@/lib/blog/locale-meta";
import { absoluteUrl, SITE } from "@/lib/site";

const staticSections: SectionKey[] = [
  "home",
  "celpeBras",
  "pastExams",
  "practice",
  "theory",
  "reader",
  "blog",
  "materials",
  "contact",
  "terms",
];

function entry(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority: number,
  section?: SectionKey,
  params?: Record<string, string>,
  options?: { hasEnBlogPost?: boolean; hasRuBlogPost?: boolean },
): MetadataRoute.Sitemap[number] {
  const languages = section ? alternatesForSection(section, params, options) : undefined;
  return {
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(languages
      ? {
          alternates: {
            languages: Object.fromEntries(
              Object.entries(languages).map(([code, p]) => [code, absoluteUrl(p)]),
            ),
          },
        }
      : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [];

  for (const section of staticSections) {
    routes.push(
      entry(
        pathFor("pt-br", section),
        now,
        "weekly",
        section === "home" ? 1 : 0.7,
        section,
      ),
    );
    routes.push(
      entry(pathFor("en", section), now, "weekly", section === "home" ? 0.9 : 0.65, section),
    );
    routes.push(
      entry(pathFor("ru", section), now, "weekly", section === "home" ? 0.85 : 0.6, section),
    );
  }

  for (const section of [
    "practiceListening",
    "practiceReading",
    "practiceWriting",
    "practiceFoundation",
    "assessment",
  ] as const) {
    routes.push(entry(pathFor("pt-br", section), now, "monthly", 0.55, section));
  }

  for (const topic of theoryTopicMetas) {
    routes.push(
      entry(
        pathFor("pt-br", "theoryTopic", { slug: topic.slug }),
        new Date(topic.updatedAt ?? topic.publishedAt),
        "monthly",
        0.65,
        "theoryTopic",
        { slug: topic.slug },
      ),
    );
  }

  for (const meta of examCycleMetas) {
    routes.push(
      entry(
        pathFor("pt-br", "examCycle", { cycle: meta.cycle }),
        new Date(meta.updatedAt),
        "weekly",
        0.75,
        "examCycle",
        { cycle: meta.cycle },
      ),
    );
  }

  for (const slug of archiveSlugs) {
    routes.push(
      entry(
        pathFor("pt-br", "pastExamSession", { slug }),
        now,
        "monthly",
        0.6,
        "pastExamSession",
        { slug },
      ),
    );
    routes.push(
      entry(
        pathFor("en", "pastExamSession", { slug }),
        now,
        "monthly",
        0.6,
        "pastExamSession",
        { slug },
      ),
    );
    routes.push(
      entry(
        pathFor("ru", "pastExamSession", { slug }),
        now,
        "monthly",
        0.55,
        "pastExamSession",
        { slug },
      ),
    );
  }

  for (const post of getBlogPosts("pt-br")) {
    const hasEn = hasEnglishBlogPost(post.slug);
    const hasRu = hasRussianBlogPost(post.slug);
    routes.push(
      entry(
        pathFor("pt-br", "blogPost", { slug: post.slug }),
        new Date(post.publishedAt),
        "monthly",
        0.6,
        "blogPost",
        { slug: post.slug },
        { hasEnBlogPost: hasEn, hasRuBlogPost: hasRu },
      ),
    );
    if (hasEn) {
      routes.push(
        entry(
          pathFor("en", "blogPost", { slug: post.slug }),
          new Date(post.publishedAt),
          "monthly",
          0.55,
          "blogPost",
          { slug: post.slug },
          { hasEnBlogPost: true, hasRuBlogPost: hasRu },
        ),
      );
    }
    if (hasRu) {
      routes.push(
        entry(
          pathFor("ru", "blogPost", { slug: post.slug }),
          new Date(post.publishedAt),
          "monthly",
          0.5,
          "blogPost",
          { slug: post.slug },
          { hasEnBlogPost: hasEn, hasRuBlogPost: true },
        ),
      );
    }
  }

  for (const lesson of practiceLessons) {
    routes.push(
      entry(
        practiceLessonPath(lesson.meta.categoryPath, lesson.meta.slug),
        now,
        "monthly",
        0.55,
      ),
    );
  }

  for (const article of readingArticles) {
    routes.push(
      entry(
        readingArticlePath(article.meta.categoryPath, article.meta.slug),
        now,
        "monthly",
        0.55,
      ),
    );
  }

  return routes;
}
