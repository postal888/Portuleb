import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import { ArticleBlocks } from "./ArticleBlocks";

export function BlogArticleView({ post, locale }: { post: BlogPost; locale: Locale }) {
  const ui = getUi(locale).blog;

  return (
    <div className="blog-hub">
      <div className="blog-wrap">
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath(locale, "home")}>{getUi(locale).breadcrumb.home}</Link>
          <span aria-hidden> / </span>
          <Link href={localizedPath(locale, "blog")}>{ui.navLabel}</Link>
          <span aria-hidden> / </span>
          <span>{post.title}</span>
        </nav>

        <header className="blog-hero">
          <div className="blog-eyebrow">{post.eyebrow}</div>
          <h1 className="blog-title">{post.title}</h1>
          <p className="blog-subtitle">{post.subtitle}</p>
          <div className="blog-meta-line">
            <span>
              {ui.category}: {post.category}
            </span>
            <span aria-hidden>·</span>
            <span>
              {ui.readTime}: {post.readTime}
            </span>
            {post.featured ? (
              <>
                <span aria-hidden>·</span>
                <span className="blog-pill">{ui.featured}</span>
              </>
            ) : null}
            {post.tags.includes("2026/1") && !post.featured ? (
              <>
                <span aria-hidden>·</span>
                <span className="blog-pill blog-pill-accent">{ui.taskPill}</span>
              </>
            ) : null}
          </div>
        </header>

        <div className="blog-layout">
          <article className="blog-article-card">
            <ArticleBlocks blocks={post.blocks} locale={locale} />
          </article>

          <aside
            className="blog-sidebar"
            aria-label={
              locale === "en"
                ? "Sidebar"
                : locale === "ru"
                  ? "Дополнительная информация"
                  : "Informações complementares"
            }
          >
            <section className="blog-side-card">
              <h2 className="blog-side-title">{ui.sidebarSummary}</h2>
              <p className="blog-muted">{post.sidebar.summary}</p>
            </section>

            {post.sidebar.facts ? (
              <section className="blog-side-card">
                <h2 className="blog-side-title">{post.sidebar.facts.title}</h2>
                <ul className="blog-side-list">
                  {post.sidebar.facts.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="blog-side-card">
              <h2 className="blog-side-title">
                {post.sidebar.audienceHeading ?? ui.sidebarAudienceDefault}
              </h2>
              <ul className="blog-side-list">
                {post.sidebar.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="blog-side-card">
              <h2 className="blog-side-title">{ui.sidebarLinksTitle}</h2>
              <p className="blog-muted">{ui.sidebarLinksIntro}</p>
              {post.sidebar.links.map((link) => (
                <Link key={link.href} href={link.href} className="blog-side-link">
                  {link.label}
                  <span>{link.hint}</span>
                </Link>
              ))}
            </section>

            <section className="blog-side-card">
              <h2 className="blog-side-title">{ui.sidebarTags}</h2>
              <div className="blog-tag-row">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
