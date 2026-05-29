"use client";

import { useCallback, useEffect, useState } from "react";
import type { BlogPost } from "@/content/blog/types";

type Tab = "overview" | "blog" | "schedule" | "traffic";

type Dashboard = {
  posts: number;
  scheduled: number;
  failed: number;
  viewsToday: number;
  traffic: { daily: { day: string; views: number }[]; topPaths: { path: string; views: number }[]; totalViews: number };
  cloudflare: { days: { date: string; requests: number; visits: number }[]; totals: { requests: number; visits: number } } | null;
  gaId: string | null;
  siteUrl: string;
  upcoming: { id: number; slug: string; title: string; publishAtUtc: string }[];
};

const emptyPost = (): BlogPost => ({
  slug: "",
  title: "",
  subtitle: "",
  eyebrow: "Blog",
  category: "",
  readTime: "5 min",
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  tags: [],
  sidebar: { summary: "", audience: [], links: [] },
  blocks: [{ type: "p", content: "" }],
});

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("celpe_admin_token");
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("celpe_admin_token");
    window.location.href = "/admin/login";
    throw new Error("Não autorizado");
  }
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `Erro ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function AdminApp() {
  const [tab, setTab] = useState<Tab>("overview");
  const [dash, setDash] = useState<Dashboard | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [scheduled, setScheduled] = useState<
    { id: number; slug: string; title: string; publish_at_utc: string; status: string }[]
  >([]);
  const [editor, setEditor] = useState<BlogPost>(emptyPost());
  const [blocksJson, setBlocksJson] = useState("[]");
  const [scheduleAt, setScheduleAt] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [d, blog] = await Promise.all([
        api<Dashboard>("/api/admin/dashboard"),
        api<{ published: BlogPost[]; scheduled: typeof scheduled }>("/api/admin/blog/posts"),
      ]);
      setDash(d);
      setPosts(blog.published);
      setScheduled(blog.scheduled);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selectPost = (post: BlogPost) => {
    setEditor(post);
    setBlocksJson(JSON.stringify(post.blocks, null, 2));
    setTab("blog");
  };

  const newPost = () => {
    const p = emptyPost();
    setEditor(p);
    setBlocksJson(JSON.stringify(p.blocks, null, 2));
    setTab("blog");
  };

  const buildPostFromEditor = (): BlogPost => {
    const blocks = JSON.parse(blocksJson) as BlogPost["blocks"];
    return {
      ...editor,
      tags: editor.tags.length ? editor.tags : [],
      blocks,
    };
  };

  const savePublish = async () => {
    try {
      const post = buildPostFromEditor();
      if (!post.slug) throw new Error("slug obrigatório");
      const exists = posts.some((p) => p.slug === post.slug);
      if (exists) {
        await api(`/api/admin/blog/posts/${encodeURIComponent(post.slug)}`, {
          method: "PUT",
          body: JSON.stringify({ post }),
        });
      } else {
        await api("/api/admin/blog/posts", {
          method: "POST",
          body: JSON.stringify({ post, publishNow: true }),
        });
      }
      setMsg("Publicado com sucesso.");
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao publicar");
    }
  };

  const schedulePost = async () => {
    try {
      const post = buildPostFromEditor();
      if (!scheduleAt) throw new Error("Data/hora de publicação obrigatória");
      const publishAtUtc = new Date(scheduleAt).toISOString();
      await api("/api/admin/blog/schedule", {
        method: "POST",
        body: JSON.stringify({ post, publishAtUtc }),
      });
      setMsg("Agendado.");
      setScheduleAt("");
      await load();
      setTab("schedule");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao agendar");
    }
  };

  const cancelSchedule = async (id: number) => {
    await api(`/api/admin/blog/schedule/${id}`, { method: "DELETE" });
    await load();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("celpe_admin_token");
    window.location.href = "/admin/login";
  };

  if (loading && !dash) {
    return <p className="text-muted">Carregando…</p>;
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Admin — Celpe-Dê Pé</h1>
          <p className="text-sm text-muted">Blog, agendamentos e tráfego</p>
        </div>
        <button type="button" className="btn-secondary" onClick={logout}>
          Sair
        </button>
      </header>

      <nav className="admin-tabs" aria-label="Seções">
        {(
          [
            ["overview", "Visão geral"],
            ["blog", "Blog"],
            ["schedule", "Agendados"],
            ["traffic", "Tráfego"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`admin-tab ${tab === id ? "admin-tab-active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {msg ? <p className="admin-msg">{msg}</p> : null}

      {tab === "overview" && dash ? (
        <div className="admin-grid">
          <div className="surface-card p-4">
            <p className="text-sm text-muted">Posts publicados</p>
            <p className="text-2xl font-bold text-teal">{dash.posts}</p>
          </div>
          <div className="surface-card p-4">
            <p className="text-sm text-muted">Agendados</p>
            <p className="text-2xl font-bold text-teal">{dash.scheduled}</p>
          </div>
          <div className="surface-card p-4">
            <p className="text-sm text-muted">Views hoje</p>
            <p className="text-2xl font-bold text-teal">{dash.viewsToday}</p>
          </div>
          <div className="surface-card p-4">
            <p className="text-sm text-muted">Views (7 dias)</p>
            <p className="text-2xl font-bold text-teal">{dash.traffic.totalViews}</p>
          </div>
          {dash.upcoming.length > 0 ? (
            <div className="surface-card p-4 md:col-span-2">
              <h2 className="font-semibold text-teal">Próximas publicações</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {dash.upcoming.map((u) => (
                  <li key={u.id}>
                    {u.title} — {new Date(u.publishAtUtc).toLocaleString("pt-BR")}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "blog" ? (
        <div className="admin-split">
          <aside className="surface-card p-4">
            <button type="button" className="btn-primary mb-3 w-full" onClick={newPost}>
              Novo artigo
            </button>
            <ul className="space-y-2 text-sm">
              {posts.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    className="text-left text-teal hover:underline"
                    onClick={() => selectPost(p)}
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className="surface-card space-y-3 p-4">
            <div className="admin-form-grid">
              <label>
                Slug
                <input
                  className="admin-input"
                  value={editor.slug}
                  onChange={(e) => setEditor({ ...editor, slug: e.target.value })}
                />
              </label>
              <label>
                Data publicação
                <input
                  type="date"
                  className="admin-input"
                  value={editor.publishedAt}
                  onChange={(e) => setEditor({ ...editor, publishedAt: e.target.value })}
                />
              </label>
              <label className="md:col-span-2">
                Título
                <input
                  className="admin-input"
                  value={editor.title}
                  onChange={(e) => setEditor({ ...editor, title: e.target.value })}
                />
              </label>
              <label className="md:col-span-2">
                Subtítulo
                <input
                  className="admin-input"
                  value={editor.subtitle}
                  onChange={(e) => setEditor({ ...editor, subtitle: e.target.value })}
                />
              </label>
              <label>
                Categoria
                <input
                  className="admin-input"
                  value={editor.category}
                  onChange={(e) => setEditor({ ...editor, category: e.target.value })}
                />
              </label>
              <label>
                Tags (vírgula)
                <input
                  className="admin-input"
                  value={editor.tags.join(", ")}
                  onChange={(e) =>
                    setEditor({
                      ...editor,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                />
              </label>
              <label className="md:col-span-2">
                Resumo (sidebar)
                <textarea
                  className="admin-input min-h-[4rem]"
                  value={editor.sidebar.summary}
                  onChange={(e) =>
                    setEditor({
                      ...editor,
                      sidebar: { ...editor.sidebar, summary: e.target.value },
                    })
                  }
                />
              </label>
              <label className="md:col-span-2">
                Blocos (JSON)
                <textarea
                  className="admin-input min-h-[12rem] font-mono text-xs"
                  value={blocksJson}
                  onChange={(e) => setBlocksJson(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" onClick={savePublish}>
                Publicar agora
              </button>
              <label className="flex items-center gap-2 text-sm">
                Agendar:
                <input
                  type="datetime-local"
                  className="admin-input w-auto"
                  value={scheduleAt}
                  onChange={(e) => setScheduleAt(e.target.value)}
                />
              </label>
              <button type="button" className="btn-secondary" onClick={schedulePost}>
                Agendar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {tab === "schedule" ? (
        <div className="surface-card p-4">
          <h2 className="font-semibold text-teal">Posts agendados</h2>
          <table className="admin-table mt-3">
            <thead>
              <tr>
                <th>Título</th>
                <th>Slug</th>
                <th>Publicar em (UTC)</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {scheduled.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.slug}</td>
                  <td>{new Date(r.publish_at_utc).toLocaleString("pt-BR")}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.status === "scheduled" ? (
                      <button
                        type="button"
                        className="text-sm text-teal hover:underline"
                        onClick={() => cancelSchedule(r.id)}
                      >
                        Cancelar
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {tab === "traffic" && dash ? (
        <div className="space-y-4">
          <div className="surface-card p-4">
            <h2 className="font-semibold text-teal">Links externos</h2>
            <ul className="mt-2 list-inside list-disc text-sm">
              {dash.gaId ? (
                <li>
                  <a
                    href={`https://analytics.google.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics (ID: {dash.gaId})
                  </a>
                </li>
              ) : (
                <li>Configure NEXT_PUBLIC_GA_ID no servidor</li>
              )}
              <li>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Search Console
                </a>
              </li>
            </ul>
          </div>
          {dash.cloudflare ? (
            <div className="surface-card p-4">
              <h2 className="font-semibold text-teal">Cloudflare (7 dias)</h2>
              <p className="mt-2 text-sm">
                Requests: {dash.cloudflare.totals.requests} · Visitas:{" "}
                {dash.cloudflare.totals.visits}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">
              Cloudflare: configure CF_API_TOKEN e CF_ZONE_ID para gráficos (como no CrackTheDeck).
            </p>
          )}
          <div className="surface-card p-4">
            <h2 className="font-semibold text-teal">Páginas mais vistas (7 dias, local)</h2>
            <table className="admin-table mt-3">
              <thead>
                <tr>
                  <th>Caminho</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {dash.traffic.topPaths.map((r) => (
                  <tr key={r.path}>
                    <td>{r.path}</td>
                    <td>{r.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
