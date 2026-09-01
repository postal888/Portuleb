"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { BlogPost } from "@/content/blog/types";
import type { Locale } from "@/i18n/locales";
import {
  BLOG_LOCALE_OPTIONS,
  blogLocaleLabel,
  blogLocaleSiteHint,
  localeFromPostPayload,
  resolveBlogLocale,
} from "@/lib/blog/locale";
import { mapDailyField, mapLocalViews } from "@/lib/admin/chart-data";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { AiMonitoringPanel } from "@/components/admin/AiMonitoringPanel";
import {
  DEFAULT_SCHEDULE_TIMEZONE,
  SCHEDULE_TIMEZONE_OPTIONS,
  SCHEDULE_TIMEZONE_STORAGE_KEY,
  defaultScheduleStartInput,
  formatZonedDateTimeInput,
  formatZonedDisplay,
  resolveScheduleTimezone,
  scheduleTimezoneLabel,
  zonedDateTimeInputToUtc,
  type ScheduleTimezoneId,
} from "@/lib/admin/schedule-timezone";

type Tab = "overview" | "blog" | "schedule" | "traffic" | "ai-monitoring";

type GscMetricRow = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type GscOverview = {
  siteUrl: string;
  days: number;
  totals: GscMetricRow;
  daily: ({ date: string } & GscMetricRow)[];
  topQueries: ({ query: string } & GscMetricRow)[];
  topicQueries: ({ query: string } & GscMetricRow)[];
  topPages: ({ page: string } & GscMetricRow)[];
};

type Dashboard = {
  posts: number;
  scheduled: number;
  failed: number;
  viewsToday: number;
  viewsWeek: number;
  traffic: {
    days: number;
    daily: { day: string; views: number }[];
    topPaths: { path: string; views: number }[];
    totalViews: number;
  };
  cloudflare: { days: { date: string; requests: number; visits: number }[]; totals: { requests: number; visits: number } } | null;
  gsc: GscOverview | null;
  gaId: string | null;
  siteUrl: string;
  upcoming: { id: number; slug: string; title: string; publishAtUtc: string }[];
};

const TRAFFIC_PERIODS = [7, 14, 28, 90] as const;
const SCHEDULE_LOCALE_STORAGE_KEY = "celpe_admin_schedule_locale";
const DEFAULT_SCHEDULE_LOCALE: Locale = "pt-br";

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

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function fmtPos(n: number): string {
  return n.toFixed(1);
}

function TopicQueriesTable({
  rows,
  days,
  siteUrl,
  compact = false,
}: {
  rows: ({ query: string } & GscMetricRow)[];
  days: number;
  siteUrl: string;
  compact?: boolean;
}) {
  return (
    <div className="surface-card p-4">
      <div className="admin-plan__head">
        <div>
          <h2 className="font-semibold text-teal">
            Consultas Google — Celpe-Bras e português
          </h2>
          <p className="mt-1 text-sm text-muted">
            Top 30 consultas temáticas (exibindo {rows.length}) · Google Search Console, {days}{" "}
            dias · {siteUrl}
          </p>
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted">
          Nenhuma consulta temática com impressões no período selecionado.
        </p>
      ) : (
        <div className="admin-table-wrap mt-3">
          <table className="admin-table admin-table--queries">
            <thead>
              <tr>
                <th>#</th>
                <th>Consulta</th>
                <th>Impressões</th>
                <th>Cliques</th>
                <th>CTR</th>
                <th>Posição</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.query}>
                  <td className="text-muted">{i + 1}</td>
                  <td className={compact ? "max-w-[16rem]" : "max-w-[28rem]"} title={r.query}>
                    {r.query}
                  </td>
                  <td>{r.impressions.toLocaleString("pt-BR")}</td>
                  <td>{r.clicks.toLocaleString("pt-BR")}</td>
                  <td>{fmtPct(r.ctr)}</td>
                  <td>{fmtPos(r.position)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

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

async function apiForm<T>(path: string, form: FormData): Promise<T> {
  const token = localStorage.getItem("celpe_admin_token");
  const res = await fetch(path, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
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

type ImportHints = {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  readTime: string;
  summary: string;
  post?: BlogPost;
};

type BulkPlanItem = {
  index: number;
  title: string;
  slug: string;
  locale: Locale;
  seoTitle?: string;
  category: string;
  readTime: string;
  faqCount?: number;
  publishAtUtc: string;
  publishAtInput: string;
  publishAtLocal: string;
};

function readStoredTimezone(): ScheduleTimezoneId {
  if (typeof window === "undefined") return DEFAULT_SCHEDULE_TIMEZONE;
  return resolveScheduleTimezone(localStorage.getItem(SCHEDULE_TIMEZONE_STORAGE_KEY));
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_SCHEDULE_LOCALE;
  return resolveBlogLocale(localStorage.getItem(SCHEDULE_LOCALE_STORAGE_KEY));
}

export function AdminApp() {
  const [tab, setTab] = useState<Tab>("overview");
  const [dash, setDash] = useState<Dashboard | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [scheduled, setScheduled] = useState<
    {
      id: number;
      slug: string;
      title: string;
      publish_at_utc: string;
      status: string;
      payload_json?: string;
    }[]
  >([]);
  const [editor, setEditor] = useState<BlogPost>(emptyPost());
  const [blocksJson, setBlocksJson] = useState("[]");
  const [scheduleAt, setScheduleAt] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPublishAt, setImportPublishAt] = useState("");
  const [importHints, setImportHints] = useState<ImportHints | null>(null);
  const [importBusy, setImportBusy] = useState(false);
  const [scheduleTimezone, setScheduleTimezone] = useState<ScheduleTimezoneId>(DEFAULT_SCHEDULE_TIMEZONE);
  const [scheduleLocale, setScheduleLocale] = useState<Locale>(DEFAULT_SCHEDULE_LOCALE);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkStartAt, setBulkStartAt] = useState(() => defaultScheduleStartInput(DEFAULT_SCHEDULE_TIMEZONE));
  const [bulkIntervalAmount, setBulkIntervalAmount] = useState(7);
  const [bulkIntervalUnit, setBulkIntervalUnit] = useState<"days" | "hours">("days");
  const [bulkPlan, setBulkPlan] = useState<BulkPlanItem[] | null>(null);
  const [bulkFormat, setBulkFormat] = useState<"seo-geo" | "compact" | null>(null);
  const [bulkIntervalLabel, setBulkIntervalLabel] = useState("");
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkPreviewBusy, setBulkPreviewBusy] = useState(false);
  const [scheduledTimeInputs, setScheduledTimeInputs] = useState<Record<number, string>>({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [chartDays, setChartDays] = useState<number>(28);
  const [trafficLoading, setTrafficLoading] = useState(false);

  const loadDashboard = useCallback(async (days = 7) => {
    return api<Dashboard>(`/api/admin/dashboard?days=${days}`);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [d, blog] = await Promise.all([
        loadDashboard(7),
        api<{ published: BlogPost[]; scheduled: typeof scheduled }>("/api/admin/blog/posts"),
      ]);
      setDash(d);
      setPosts(blog.published);
      setScheduled(blog.scheduled);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [loadDashboard]);

  useEffect(() => {
    const tz = readStoredTimezone();
    setScheduleTimezone(tz);
    setBulkStartAt(defaultScheduleStartInput(tz));
    setScheduleLocale(readStoredLocale());
  }, []);

  useEffect(() => {
    localStorage.setItem(SCHEDULE_TIMEZONE_STORAGE_KEY, scheduleTimezone);
  }, [scheduleTimezone]);

  useEffect(() => {
    localStorage.setItem(SCHEDULE_LOCALE_STORAGE_KEY, scheduleLocale);
  }, [scheduleLocale]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const next: Record<number, string> = {};
    for (const row of scheduled) {
      next[row.id] = formatZonedDateTimeInput(row.publish_at_utc, scheduleTimezone);
    }
    setScheduledTimeInputs(next);
  }, [scheduled, scheduleTimezone]);

  const changeScheduleTimezone = (next: ScheduleTimezoneId) => {
    setScheduleTimezone((prev) => {
      const convert = (value: string, setter: (v: string) => void) => {
        if (!value) return;
        try {
          const utc = zonedDateTimeInputToUtc(value, prev);
          setter(formatZonedDateTimeInput(utc, next));
        } catch {
          /* keep previous value */
        }
      };
      convert(bulkStartAt, setBulkStartAt);
      convert(importPublishAt, setImportPublishAt);
      convert(scheduleAt, setScheduleAt);
      setBulkPlan((plan) =>
        plan?.map((row) => {
          const publishAtInput = formatZonedDateTimeInput(row.publishAtUtc, next);
          return {
            ...row,
            publishAtInput,
            publishAtLocal: formatZonedDisplay(row.publishAtUtc, next),
          };
        }) ?? null,
      );
      return next;
    });
  };

  useEffect(() => {
    if (tab !== "traffic") return;
    let cancelled = false;
    setTrafficLoading(true);
    void loadDashboard(chartDays)
      .then((d) => {
        if (!cancelled) setDash(d);
      })
      .finally(() => {
        if (!cancelled) setTrafficLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, chartDays, loadDashboard]);

  const localViewsSeries = useMemo(() => {
    if (!dash) return [];
    return [
      {
        id: "local-views",
        label: "Pageviews (local)",
        color: "#0d7377",
        points: mapLocalViews(dash.traffic.daily),
      },
    ];
  }, [dash]);

  const cloudflareSeries = useMemo(() => {
    if (!dash?.cloudflare) return [];
    return [
      {
        id: "cf-visits",
        label: "Visitas",
        color: "#0d7377",
        points: mapDailyField(dash.cloudflare.days, "visits"),
      },
      {
        id: "cf-requests",
        label: "Requests",
        color: "#5c6bc0",
        points: mapDailyField(dash.cloudflare.days, "requests"),
      },
    ];
  }, [dash]);

  const gscSeries = useMemo(() => {
    if (!dash?.gsc) return [];
    return [
      {
        id: "gsc-clicks",
        label: "Cliques",
        color: "#437a22",
        points: mapDailyField(dash.gsc.daily, "clicks"),
      },
      {
        id: "gsc-impressions",
        label: "Impressões",
        color: "#964219",
        points: mapDailyField(dash.gsc.daily, "impressions"),
      },
    ];
  }, [dash]);

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
      locale: resolveBlogLocale(editor.locale ?? scheduleLocale),
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
      await api("/api/admin/blog/schedule", {
        method: "POST",
        body: JSON.stringify({ post, publishAtLocal: scheduleAt, timeZone: scheduleTimezone }),
      });
      setMsg("Agendado.");
      setScheduleAt("");
      await load();
      setTab("schedule");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao agendar");
    }
  };

  const deleteSchedule = async (id: number) => {
    try {
      await api(`/api/admin/blog/schedule/${id}`, { method: "DELETE" });
      setMsg("Publicação excluída.");
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao excluir");
    }
  };

  const parseImportFile = async (file: File) => {
    setImportBusy(true);
    setImportHints(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const data = await apiForm<{ hints: ImportHints }>("/api/admin/blog/parse-document", form);
      setImportHints(data.hints);
      setMsg("Metadados extraídos do arquivo.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao ler arquivo");
    } finally {
      setImportBusy(false);
    }
  };

  const onImportFileChange = (file: File | null) => {
    setImportFile(file);
    setImportHints(null);
    if (file) void parseImportFile(file);
  };

  const scheduleFromFile = async () => {
    if (!importFile || !importPublishAt) {
      setMsg("Escolha arquivo e data/hora de publicação.");
      return;
    }
    setImportBusy(true);
    try {
      const form = new FormData();
      form.append("file", importFile);
      form.append("publishAt", importPublishAt);
      form.append("timeZone", scheduleTimezone);
      form.append("scheduleLocale", scheduleLocale);
      if (importHints?.slug) form.append("slug", importHints.slug);
      if (importHints?.title) form.append("title", importHints.title);
      await apiForm("/api/admin/blog/schedule-file", form);
      setMsg("Post agendado a partir do arquivo.");
      setImportFile(null);
      setImportHints(null);
      setImportPublishAt("");
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao agendar");
    } finally {
      setImportBusy(false);
    }
  };

  const previewBulkPlan = useCallback(
    async (file: File, startAt: string) => {
      setBulkPreviewBusy(true);
      try {
        const form = new FormData();
        form.append("file", file);
        form.append("startAt", startAt);
        form.append("timeZone", scheduleTimezone);
        form.append("scheduleLocale", scheduleLocale);
        form.append("intervalAmount", String(bulkIntervalAmount));
        form.append("intervalUnit", bulkIntervalUnit);
        const data = await apiForm<{
          plan: BulkPlanItem[];
          intervalLabel: string;
          count: number;
          format: "seo-geo" | "compact";
        }>("/api/admin/blog/schedule-bulk/preview", form);
        setBulkPlan(data.plan);
        setBulkFormat(data.format);
        setBulkIntervalLabel(data.intervalLabel);
        setMsg(
          `Plano: ${data.count} artigos (${data.format === "seo-geo" ? "SEO/GEO" : "Compact"}) · intervalo ${data.intervalLabel}.`,
        );
      } catch (e) {
        setBulkPlan(null);
        setBulkFormat(null);
        setBulkIntervalLabel("");
        setMsg(e instanceof Error ? e.message : "Erro ao gerar preview");
      } finally {
        setBulkPreviewBusy(false);
      }
    },
    [bulkIntervalAmount, bulkIntervalUnit, scheduleLocale, scheduleTimezone],
  );

  const onBulkFileChange = (file: File | null) => {
    setBulkFile(file);
    setBulkPlan(null);
    setBulkFormat(null);
    setBulkIntervalLabel("");
    if (file && bulkStartAt) void previewBulkPlan(file, bulkStartAt);
  };

  useEffect(() => {
    if (!bulkFile || !bulkStartAt) return;
    const timer = window.setTimeout(() => {
      void previewBulkPlan(bulkFile, bulkStartAt);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [bulkFile, bulkIntervalAmount, bulkIntervalUnit, bulkStartAt, previewBulkPlan]);

  const scheduleBulkFromFile = async () => {
    if (!bulkFile || !bulkStartAt) {
      setMsg("Escolha .docx e data/hora inicial.");
      return;
    }
    setBulkBusy(true);
    try {
      const form = new FormData();
      form.append("file", bulkFile);
      form.append("startAt", bulkStartAt);
      form.append("timeZone", scheduleTimezone);
      form.append("scheduleLocale", scheduleLocale);
      form.append("intervalAmount", String(bulkIntervalAmount));
      form.append("intervalUnit", bulkIntervalUnit);
      if (bulkPlan?.length) {
        form.append(
          "customPlan",
          JSON.stringify(
            bulkPlan.map((row) => ({
              index: row.index,
              publishAtLocal: row.publishAtInput,
              locale: row.locale,
            })),
          ),
        );
      }
      const data = await apiForm<{ count: number; errors: string[]; intervalLabel: string }>(
        "/api/admin/blog/schedule-bulk",
        form,
      );
      setMsg(
        `${data.count} artigos na fila · intervalo ${data.intervalLabel}.${data.errors?.length ? ` Avisos: ${data.errors.length}` : ""}`,
      );
      setBulkFile(null);
      setBulkPlan(null);
      setBulkFormat(null);
      setBulkIntervalLabel("");
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro no import em lote");
    } finally {
      setBulkBusy(false);
    }
  };

  const updateBulkPlanLocale = (index: number, locale: Locale) => {
    setBulkPlan((prev) => prev?.map((row) => (row.index === index ? { ...row, locale } : row)) ?? null);
  };

  const updateBulkPlanTime = (index: number, publishAtInput: string) => {
    setBulkPlan(
      (prev) =>
        prev?.map((row) => {
          if (row.index !== index) return row;
          try {
            const publishAtUtc = zonedDateTimeInputToUtc(publishAtInput, scheduleTimezone);
            return {
              ...row,
              publishAtInput,
              publishAtUtc,
              publishAtLocal: formatZonedDisplay(publishAtUtc, scheduleTimezone),
            };
          } catch {
            return { ...row, publishAtInput };
          }
        }) ?? null,
    );
  };

  const staggerBulkPlanTimes = (stepMinutes = 30) => {
    setBulkPlan((prev) => {
      if (!prev?.length) return prev;
      const baseUtc = zonedDateTimeInputToUtc(prev[0]!.publishAtInput, scheduleTimezone);
      const baseMs = Date.parse(baseUtc);
      return prev.map((row, i) => {
        const publishAtUtc = new Date(baseMs + i * stepMinutes * 60000).toISOString();
        const publishAtInput = formatZonedDateTimeInput(publishAtUtc, scheduleTimezone);
        return {
          ...row,
          publishAtUtc,
          publishAtInput,
          publishAtLocal: formatZonedDisplay(publishAtUtc, scheduleTimezone),
        };
      });
    });
    setMsg(`Horários escalonados (+${stepMinutes} min por post).`);
  };

  const saveScheduledTime = async (id: number) => {
    const publishAtLocal = scheduledTimeInputs[id];
    if (!publishAtLocal) return;
    try {
      await api(`/api/admin/blog/schedule/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ publishAtLocal, timeZone: scheduleTimezone }),
      });
      setMsg("Horário atualizado.");
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro ao salvar horário");
    }
  };

  const scheduledUpcoming = useMemo(
    () =>
      [...scheduled].sort(
        (a, b) => new Date(a.publish_at_utc).getTime() - new Date(b.publish_at_utc).getTime(),
      ),
    [scheduled],
  );

  const loadImportIntoEditor = () => {
    if (!importHints?.post) {
      setMsg("Extraia o arquivo primeiro.");
      return;
    }
    setEditor(importHints.post);
    setBlocksJson(JSON.stringify(importHints.post.blocks, null, 2));
    setTab("blog");
    setMsg("Artigo carregado no editor.");
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
            ["ai-monitoring", "AI monitoring"],
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
      {loadError ? (
        <p className="admin-msg admin-msg--error">
          {loadError}{" "}
          <button type="button" className="text-teal hover:underline" onClick={() => void load()}>
            Tentar novamente
          </button>
        </p>
      ) : null}

      {tab === "overview" && dash ? (
        <div className="space-y-6">
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
            <p className="text-2xl font-bold text-teal">{dash.viewsWeek}</p>
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
          {dash.gsc ? (
            <TopicQueriesTable
              rows={dash.gsc.topicQueries}
              days={dash.gsc.days}
              siteUrl={dash.gsc.siteUrl}
              compact
            />
          ) : (
            <p className="text-sm text-muted">
              Consultas Google: configure GSC_SITE_URL e GOOGLE_APPLICATION_CREDENTIALS no servidor.
            </p>
          )}
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
                Seção do site
                <select
                  className="admin-input admin-input--select"
                  value={editor.locale ?? scheduleLocale}
                  onChange={(e) =>
                    setEditor({ ...editor, locale: e.target.value as Locale })
                  }
                >
                  {BLOG_LOCALE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label} ({opt.hostHint})
                    </option>
                  ))}
                </select>
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
        <div className="space-y-6">
          <div className="surface-card p-4 sm:p-5 admin-timezone-bar">
            <div className="admin-form-grid">
              <label>
                Seção do site
                <select
                  className="admin-input admin-input--select"
                  value={scheduleLocale}
                  onChange={(e) => setScheduleLocale(e.target.value as Locale)}
                >
                  {BLOG_LOCALE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label} ({opt.hostHint})
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Fuso horário das publicações
                <select
                  className="admin-input admin-input--select"
                  value={scheduleTimezone}
                  onChange={(e) => changeScheduleTimezone(e.target.value as ScheduleTimezoneId)}
                >
                  {SCHEDULE_TIMEZONE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-2 text-sm text-muted">
              Publicação em <strong>{blogLocaleSiteHint(scheduleLocale)}</strong> · datas/horas em{" "}
              <strong>{scheduleTimezoneLabel(scheduleTimezone)}</strong>. No formato SEO/GEO,{" "}
              <code>lang:en</code> ou <code>lang:ru</code> no SourceCode sobrescreve a seção padrão por
              artigo.
            </p>
          </div>

          <div className="surface-card p-4 sm:p-5">
            <h2 className="font-semibold text-teal">Agendar a partir de arquivo (.docx / .pdf)</h2>
            <p className="mt-1 text-sm text-muted">
              Envie Word ou PDF — título, slug, resumo e blocos são extraídos automaticamente. O
              arquivo original fica salvo no servidor.
            </p>
            <div className="admin-form-grid mt-4">
              <label className="md:col-span-2">
                Arquivo
                <input
                  type="file"
                  accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="admin-input"
                  onChange={(e) => onImportFileChange(e.target.files?.[0] ?? null)}
                />
              </label>
              <label>
                Publicar em ({scheduleTimezoneLabel(scheduleTimezone)})
                <input
                  type="datetime-local"
                  className="admin-input"
                  value={importPublishAt}
                  onChange={(e) => setImportPublishAt(e.target.value)}
                />
              </label>
              {importHints ? (
                <div className="surface-card-muted p-3 text-sm md:col-span-2">
                  <p>
                    <strong>Título:</strong> {importHints.title}
                  </p>
                  <p>
                    <strong>Slug:</strong> {importHints.slug}
                  </p>
                  <p>
                    <strong>Categoria:</strong> {importHints.category} · {importHints.readTime}
                  </p>
                  {importHints.post?.locale ? (
                    <p>
                      <strong>Lang detectado:</strong> {blogLocaleLabel(resolveBlogLocale(importHints.post.locale))}
                    </p>
                  ) : null}
                  <p className="mt-1 text-muted">{importHints.summary}</p>
                </div>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary"
                disabled={importBusy || !importFile || !importPublishAt}
                onClick={() => void scheduleFromFile()}
              >
                {importBusy ? "Processando…" : "Agendar arquivo"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                disabled={!importHints}
                onClick={loadImportIntoEditor}
              >
                Abrir no editor
              </button>
            </div>
          </div>

          <div className="surface-card p-4 sm:p-5">
            <h2 className="font-semibold text-teal">Fila de publicações (.docx com vários artigos)</h2>
            <p className="mt-1 text-sm text-muted">
              Formato SEO/GEO: cada artigo começa com <strong>Artigo N</strong>, linha{" "}
              <strong>SourceCode</strong> com <code>meta_title</code>, <code>meta_description</code>,{" "}
              <code>slug</code> e <code>lang</code>, depois título, lead, seções, FAQ e rodapé. Também
              aceita o formato antigo (Compact/Heading). Escolha data inicial e intervalo; o preview
              mostra slug, SEO title e datas antes de confirmar.
            </p>
            <div className="admin-form-grid mt-4">
              <label className="md:col-span-2">
                Plan / queue .docx
                <input
                  type="file"
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="admin-input"
                  onChange={(e) => onBulkFileChange(e.target.files?.[0] ?? null)}
                />
              </label>
              <label>
                Primeira publicação ({scheduleTimezoneLabel(scheduleTimezone)})
                <input
                  type="datetime-local"
                  className="admin-input"
                  value={bulkStartAt}
                  onChange={(e) => setBulkStartAt(e.target.value)}
                />
              </label>
              <label>
                Intervalo entre posts
                <div className="admin-interval-row">
                  <input
                    type="number"
                    min={1}
                    max={bulkIntervalUnit === "hours" ? 168 : 90}
                    className="admin-input"
                    value={bulkIntervalAmount}
                    onChange={(e) => setBulkIntervalAmount(Number(e.target.value) || 1)}
                  />
                  <select
                    className="admin-input admin-input--select"
                    value={bulkIntervalUnit}
                    onChange={(e) => setBulkIntervalUnit(e.target.value as "days" | "hours")}
                  >
                    <option value="days">dias</option>
                    <option value="hours">horas</option>
                  </select>
                </div>
              </label>
            </div>

            {bulkPreviewBusy ? (
              <p className="mt-3 text-sm text-muted">Gerando preview do plano…</p>
            ) : null}

            {bulkPlan && bulkPlan.length > 0 ? (
              <div className="admin-plan mt-4">
                <div className="admin-plan__head">
                  <div>
                    <h3 className="admin-plan__title">Plano de publicação</h3>
                    <span className="admin-plan__meta">
                      {bulkFormat === "seo-geo" ? "Formato SEO/GEO" : "Formato Compact"}
                      {bulkIntervalLabel ? ` · intervalo ${bulkIntervalLabel}` : ""}
                      {" · "}
                      {scheduleTimezoneLabel(scheduleTimezone)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn-secondary text-sm"
                      onClick={() => staggerBulkPlanTimes(30)}
                    >
                      +30 min entre posts
                    </button>
                    <button
                      type="button"
                      className="btn-secondary text-sm"
                      onClick={() => staggerBulkPlanTimes(60)}
                    >
                      +1 h entre posts
                    </button>
                  </div>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>SEO title</th>
                      <th>Slug</th>
                      <th>Seção</th>
                      <th>FAQ</th>
                      <th>Publicar em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkPlan.map((row) => (
                      <tr key={`${row.slug}-${row.index}`}>
                        <td>{row.index + 1}</td>
                        <td>{row.title}</td>
                        <td className="max-w-[14rem] truncate" title={row.seoTitle}>
                          {row.seoTitle ?? "—"}
                        </td>
                        <td className="font-mono text-xs">{row.slug}</td>
                        <td>
                          <select
                            className="admin-input admin-input--select"
                            value={row.locale}
                            onChange={(e) => updateBulkPlanLocale(row.index, e.target.value as Locale)}
                          >
                            {BLOG_LOCALE_OPTIONS.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{row.faqCount ?? 0}</td>
                        <td>
                          <input
                            type="datetime-local"
                            className="admin-input admin-input--datetime"
                            value={row.publishAtInput}
                            onChange={(e) => updateBulkPlanTime(row.index, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary"
                disabled={bulkBusy || bulkPreviewBusy || !bulkFile || !bulkStartAt || !bulkPlan?.length}
                onClick={() => void scheduleBulkFromFile()}
              >
                {bulkBusy ? "Agendando…" : "Confirmar fila"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                disabled={bulkPreviewBusy || !bulkFile || !bulkStartAt}
                onClick={() => bulkFile && void previewBulkPlan(bulkFile, bulkStartAt)}
              >
                Atualizar preview
              </button>
            </div>
          </div>

          <div className="surface-card p-4">
            <h2 className="font-semibold text-teal">Posts agendados</h2>
            <table className="admin-table mt-3">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Slug</th>
                  <th>Seção</th>
                  <th>Publicar em ({scheduleTimezoneLabel(scheduleTimezone)})</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {scheduledUpcoming.map((r) => (
                  <tr key={r.id}>
                    <td>{r.title}</td>
                    <td>{r.slug}</td>
                    <td>{blogLocaleLabel(localeFromPostPayload(r.payload_json))}</td>
                    <td>
                      {r.status === "scheduled" ? (
                        <div className="admin-schedule-time-row">
                          <input
                            type="datetime-local"
                            className="admin-input admin-input--datetime"
                            value={scheduledTimeInputs[r.id] ?? ""}
                            onChange={(e) =>
                              setScheduledTimeInputs((prev) => ({ ...prev, [r.id]: e.target.value }))
                            }
                          />
                          <button
                            type="button"
                            className="btn-secondary text-sm"
                            onClick={() => void saveScheduledTime(r.id)}
                          >
                            Salvar
                          </button>
                        </div>
                      ) : (
                        formatZonedDisplay(r.publish_at_utc, scheduleTimezone)
                      )}
                    </td>
                    <td>{r.status}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-link-danger text-sm hover:underline"
                        onClick={() => void deleteSchedule(r.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {tab === "traffic" && dash ? (
        <div className="space-y-4">
          <div className="traffic-period">
            <span className="traffic-period-label">Período</span>
            {TRAFFIC_PERIODS.map((d) => (
              <button
                key={d}
                type="button"
                className={`traffic-period-btn ${chartDays === d ? "traffic-period-btn-active" : ""}`}
                onClick={() => setChartDays(d)}
              >
                {d} dias
              </button>
            ))}
            {trafficLoading ? <span className="text-sm text-muted">Atualizando…</span> : null}
          </div>

          {dash.gsc ? (
            <TopicQueriesTable
              rows={dash.gsc.topicQueries}
              days={dash.gsc.days}
              siteUrl={dash.gsc.siteUrl}
            />
          ) : null}

          <div className="surface-card p-4">
            <TrafficChart
              title="Pageviews no site (SQLite local)"
              subtitle={`Beacon em /pt-br — total ${dash.traffic.totalViews} no período`}
              days={dash.traffic.days}
              series={localViewsSeries}
            />
          </div>

          {dash.cloudflare ? (
            <div className="surface-card p-4">
              <TrafficChart
                title="Cloudflare — visitas e requests"
                subtitle={`Total: ${dash.cloudflare.totals.visits} visitas · ${dash.cloudflare.totals.requests} requests`}
                days={dash.traffic.days}
                series={cloudflareSeries}
              />
            </div>
          ) : (
            <p className="text-sm text-muted">
              Cloudflare: configure CF_API_TOKEN e CF_ZONE_ID para gráficos de tráfego real.
            </p>
          )}

          {dash.gsc ? (
            <div className="surface-card p-4">
              <TrafficChart
                title="Google Search Console"
                subtitle={`${dash.gsc.siteUrl} — cliques e impressões orgânicas`}
                days={dash.traffic.days}
                series={gscSeries}
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted">Cliques</p>
                  <p className="text-lg font-semibold">{dash.gsc.totals.clicks}</p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted">Impressões</p>
                  <p className="text-lg font-semibold">{dash.gsc.totals.impressions}</p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted">CTR</p>
                  <p className="text-lg font-semibold">{fmtPct(dash.gsc.totals.ctr)}</p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted">Posição média</p>
                  <p className="text-lg font-semibold">{fmtPos(dash.gsc.totals.position)}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Todas as consultas (top {dash.gsc.topQueries.length})</h3>
                  <table className="admin-table mt-2">
                    <thead>
                      <tr>
                        <th>Consulta</th>
                        <th>Cliques</th>
                        <th>Impr.</th>
                        <th>CTR</th>
                        <th>Pos.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dash.gsc.topQueries.map((r) => (
                        <tr key={r.query}>
                          <td className="max-w-[12rem] truncate" title={r.query}>
                            {r.query}
                          </td>
                          <td>{r.clicks}</td>
                          <td>{r.impressions}</td>
                          <td>{fmtPct(r.ctr)}</td>
                          <td>{fmtPos(r.position)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Top páginas</h3>
                  <table className="admin-table mt-2">
                    <thead>
                      <tr>
                        <th>Página</th>
                        <th>Cliques</th>
                        <th>Impr.</th>
                        <th>CTR</th>
                        <th>Pos.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dash.gsc.topPages.map((r) => (
                        <tr key={r.page}>
                          <td className="max-w-[12rem] truncate" title={r.page}>
                            {r.page.replace(/^https?:\/\/[^/]+/, "") || r.page}
                          </td>
                          <td>{r.clicks}</td>
                          <td>{r.impressions}</td>
                          <td>{fmtPct(r.ctr)}</td>
                          <td>{fmtPos(r.position)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">
              Search Console: configure GSC_SITE_URL e GOOGLE_APPLICATION_CREDENTIALS no servidor.
            </p>
          )}

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
          <div className="surface-card p-4">
            <h2 className="font-semibold text-teal">
              Páginas mais vistas ({dash.traffic.days} dias, local)
            </h2>
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

      {tab === "ai-monitoring" ? <AiMonitoringPanel /> : null}
    </div>
  );
}
