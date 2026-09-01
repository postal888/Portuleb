import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { getBlogPosts } from "@/content/blog";
import { buildPageMetadata } from "@/i18n/metadata";
import "./blog.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "blog",
  title: "Blog Celpe-Bras: estratégias e análise de tarefas",
  description:
    "Artigos sobre preparação para o Celpe-Bras: estratégia de estudo, critérios de avaliação da banca, análise das tarefas e erros mais comuns dos candidatos.",
});

export default function BlogPage() {
  return <BlogIndexView posts={getBlogPosts("pt-br")} locale="pt-br" />;
}
