import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { getBlogPosts } from "@/content/blog";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/blog/blog.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "blog",
  title: "Блог Celpe-Bras: стратегии и разбор заданий",
  description:
    "Статьи о подготовке к Celpe-Bras: стратегия обучения, критерии оценки экзаменаторов, разбор задач и самые частые ошибки кандидатов.",
});

export default function RuBlogPage() {
  return <BlogIndexView posts={getBlogPosts("ru")} locale="ru" />;
}
