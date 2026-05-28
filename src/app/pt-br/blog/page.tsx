import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { blogPosts } from "@/content/blog";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre estratégia de preparação para o Celpe-Bras, critérios de avaliação e dicas práticas.",
  alternates: { canonical: "/pt-br/blog" },
};

export default function BlogPage() {
  return <BlogIndexView posts={blogPosts} />;
}
