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
import "@/app/pt-br/blog/blog.css";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogPosts("ru").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!hasRussianBlogPost(slug)) return { title: "Статья не найдена" };
  const post = getBlogPost(slug, "ru");
  if (!post) return { title: "Статья не найдена" };

  const metaTitle = post.seoTitle ?? post.title;
  const metaDescription = post.seoDescription ?? post.subtitle;

  return buildPageMetadata({
    locale: "ru",
    section: "blogPost",
    params: { slug },
    title: metaTitle,
    description: metaDescription,
    ogType: "article",
    publishedTime: post.publishedAt,
    keywords: post.tags,
    hasEnBlogPost: hasEnglishBlogPost(slug),
    enBlogSlug: slug,
    hasRuBlogPost: true,
    ruBlogSlug: slug,
  });
}

export default async function RuBlogArticlePage({ params }: Props) {
  const { slug } = await params;
  if (!hasRussianBlogPost(slug)) notFound();
  const post = getBlogPost(slug, "ru");
  if (!post) notFound();

  const ui = getUi("ru");
  const path = pathFor("ru", "blogPost", { slug });
  const articleSchema = articleJsonLd("ru", {
    path,
    headline: post.title,
    description: post.seoDescription ?? post.subtitle,
    datePublished: post.publishedAt,
    keywords: post.tags,
    section: post.category,
  });
  const breadcrumbSchema = breadcrumbJsonLd("ru", [
    { name: ui.breadcrumb.home, path: localizedPath("ru", "home") },
    { name: ui.blog.navLabel, path: localizedPath("ru", "blog") },
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
      <BlogArticleView post={post} locale="ru" />
    </>
  );
}
