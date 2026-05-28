import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getBlogPost } from "@/content/blog";
import { absoluteUrl, SITE } from "@/lib/site";
import "../blog.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Artigo não encontrado" };

  const url = `/pt-br/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.subtitle,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.subtitle,
      publishedTime: post.publishedAt,
      tags: post.tags,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/pt-br/blog/${post.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "pt-BR",
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/celpe-de-pe-icon.png") },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/pt-br") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/pt-br/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <BlogArticleView post={post} />
    </>
  );
}
