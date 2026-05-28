import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";
import { ArticleBlocks } from "./ArticleBlocks";

export function BlogArticleView({ post }: { post: BlogPost }) {
  return (
    <div className="blog-hub">
      <div className="blog-wrap">
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/pt-br">Início</Link>
          <span aria-hidden> / </span>
          <Link href="/pt-br/blog">Blog</Link>
          <span aria-hidden> / </span>
          <span>{post.title}</span>
        </nav>

        <header className="blog-hero">
          <div className="blog-eyebrow">{post.eyebrow}</div>
          <h1 className="blog-title">{post.title}</h1>
          <p className="blog-subtitle">{post.subtitle}</p>
          <div className="blog-meta-line">
            <span>Categoria: {post.category}</span>
            <span aria-hidden>·</span>
            <span>Tempo de leitura: {post.readTime}</span>
            {post.featured ? (
              <>
                <span aria-hidden>·</span>
                <span className="blog-pill">Artigo em destaque</span>
              </>
            ) : null}
            {post.tags.includes("2026/1") && !post.featured ? (
              <>
                <span aria-hidden>·</span>
                <span className="blog-pill blog-pill-accent">Tarefa 1 — 2026/1</span>
              </>
            ) : null}
          </div>
        </header>

        <div className="blog-layout">
          <article className="blog-article-card">
            <ArticleBlocks blocks={post.blocks} />
          </article>

          <aside className="blog-sidebar" aria-label="Informações complementares">
            <section className="blog-side-card">
              <h2 className="blog-side-title">Resumo rápido</h2>
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
                {post.sidebar.audienceHeading ?? "Para quem é esta estratégia?"}
              </h2>
              <ul className="blog-side-list">
                {post.sidebar.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="blog-side-card">
              <h2 className="blog-side-title">Conectando com o site</h2>
              <p className="blog-muted">Depois desta leitura, você pode ir para:</p>
              {post.sidebar.links.map((link) => (
                <Link key={link.href} href={link.href} className="blog-side-link">
                  {link.label}
                  <span>{link.hint}</span>
                </Link>
              ))}
            </section>

            <section className="blog-side-card">
              <h2 className="blog-side-title">Tags</h2>
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
