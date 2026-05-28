import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";

export function BlogIndexView({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="blog-hub">
      <div className="blog-wrap">
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/pt-br">Início</Link>
          <span aria-hidden> / </span>
          <span>Blog</span>
        </nav>

        <header className="blog-hero">
          <div className="blog-eyebrow">Blog</div>
          <h1 className="blog-title blog-title-index">Estratégias e leituras</h1>
          <p className="blog-subtitle">
            Artigos sobre preparação para o Celpe-Bras: estratégia, critérios de avaliação e
            conexão com Prática e Teoria no hub.
          </p>
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
                    <span className="blog-pill">Em destaque</span>
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
              <Link href={`/pt-br/blog/${post.slug}`} className="blog-card-link">
                Ler artigo →
              </Link>
            </article>
          ))}
        </div>

        <p className="blog-muted" style={{ marginTop: "2rem", fontSize: "0.875rem" }}>
          Novos artigos serão publicados nesta seção.{" "}
          <Link href="/pt-br/celpe-bras" className="blog-meta-link">
            Guia Celpe-Bras →
          </Link>
        </p>
      </div>
    </div>
  );
}
