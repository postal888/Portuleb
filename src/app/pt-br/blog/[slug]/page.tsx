import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPost, getBlogPosts } from "@/content/blog";
import { hasEnglishBlogPost, hasRussianBlogPost } from "@/lib/blog/locale-meta";
import { articleJsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import { pathFor } from "@/i18n/route-map";
import "../blog.css";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogPosts("pt-br").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug, "pt-br");
  if (!post) return { title: "Artigo não encontrado" };

  const metaTitle = post.seoTitle ?? post.title;
  const metaDescription = post.seoDescription ?? post.subtitle;

  return buildPageMetadata({
    locale: "pt-br",
    section: "blogPost",
    params: { slug },
    title: metaTitle,
    description: metaDescription,
    ogType: "article",
    publishedTime: post.publishedAt,
    keywords: post.tags,
    hasEnBlogPost: hasEnglishBlogPost(slug),
    enBlogSlug: slug,
    hasRuBlogPost: hasRussianBlogPost(slug),
    ruBlogSlug: slug,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug, "pt-br");
  if (!post) notFound();

  const ui = getUi("pt-br");
  const path = pathFor("pt-br", "blogPost", { slug });
  const articleSchema = articleJsonLd("pt-br", {
    path,
    headline: post.title,
    description: post.seoDescription ?? post.subtitle,
    datePublished: post.publishedAt,
    keywords: post.tags,
    section: post.category,
  });
  const breadcrumbSchema = breadcrumbJsonLd("pt-br", [
    { name: ui.breadcrumb.home, path: localizedPath("pt-br", "home") },
    { name: ui.blog.navLabel, path: localizedPath("pt-br", "blog") },
    { name: post.title },
  ]);

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />
      <BlogArticleView post={post} locale="pt-br" />
    </>
  );
}
