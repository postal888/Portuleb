import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function BlogIndexView({ posts, locale }: { posts: BlogPost[]; locale: Locale }) {
  const ui = getUi(locale).blog;
  const common = getUi(locale);

  return (
    <div className="blog-hub">
      <div className="blog-wrap">
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath(locale, "home")}>{common.breadcrumb.home}</Link>
          <span aria-hidden> / </span>
          <span>{ui.navLabel}</span>
        </nav>

        <header className="blog-hero">
          <div className="blog-eyebrow">{ui.navLabel}</div>
          <h1 className="blog-title blog-title-index">{ui.indexTitle}</h1>
          <p className="blog-subtitle">{ui.indexSubtitle}</p>
        </header>

        <div className="blog-index-grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-eyebrow">{post.eyebrow}</div>
              <h2 className="blog-side-title" style={{ fontSize: "1.35rem" }}>
                {post.title}
              </h2>
              <p className="blog-muted">{post.subtitle}</p>
              <div className="blog-meta-line">
                <span>{post.category}</span>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
                {post.featured ? (
                  <>
                    <span aria-hidden>·</span>
                    <span className="blog-pill">{ui.featuredPill}</span>
                  </>
                ) : null}
              </div>
              <div className="blog-tag-row">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={localizedPath(locale, "blogPost", { slug: post.slug })}
                className="blog-card-link"
              >
                {ui.readArticle}
              </Link>
            </article>
          ))}
        </div>

        <p className="blog-muted" style={{ marginTop: "2rem", fontSize: "0.875rem" }}>
          {ui.footerNote}{" "}
          <Link href={localizedPath(locale, "celpeBras")} className="blog-meta-link">
            {ui.celpeGuideLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
