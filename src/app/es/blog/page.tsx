import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { getBlogPosts } from "@/content/blog";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/blog/blog.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  section: "blog",
  title: "Blog Celpe-Bras: estrategia y análisis de tareas",
  description:
    "Artículos sobre la preparación al Celpe-Bras: estrategia de estudio, criterios de evaluación y análisis tarea por tarea.",
});

export default function EsBlogPage() {
  return <BlogIndexView posts={getBlogPosts("es")} locale="es" />;
}
