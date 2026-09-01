import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { getBlogPosts } from "@/content/blog";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/blog/blog.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "blog",
  title: "Celpe-Bras blog: strategy and task analysis",
  description:
    "Articles on Celpe-Bras preparation: study strategy, how the examiners grade, task-by-task analysis and the mistakes candidates make most often.",
});

export default function EnBlogPage() {
  return <BlogIndexView posts={getBlogPosts("en")} locale="en" />;
}
