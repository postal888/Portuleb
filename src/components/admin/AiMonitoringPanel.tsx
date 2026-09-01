"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { parseQueryList } from "@/lib/admin/ai-monitoring";
import { BingSearchPanel } from "@/components/admin/BingSearchPanel";
import { BraveSearchPanel } from "@/components/admin/BraveSearchPanel";

const VISIBILITY_LIST_STORAGE_KEY = "celpe_admin_visibility_queries";
const MAX_VISIBILITY_QUERIES = 12;

type VisibilityMode = "pack" | "list";

type Citation = { url: string; title?: string };

type MatchInfo = {
  inAnswer: boolean;
  inCitations: boolean;
  matchedUrls: string[];
  matchedSnippets: string[];
};

type QueryResult = {
  id?: number;
  prompt: string;
  model: string;
  answer: string;
  citations: Citation[];
  mentioned: boolean;
  match: MatchInfo;
  error?: string;
  ranAt: string;
};

type MonitoringMeta = {
  configured: boolean;
  sonarConfigured?: boolean;
  model: string;
  targetHost: string;
  siteUrl: string;
  defaultPackId: string;
  packs: {
    id: string;
    label: string;
    description: string;
    queryCount: number;
    queries: string[];
  }[];
  defaultPrompts: string[];
  history: QueryResult[];
};

type RunResponse = {
  packId: string | null;
  queries: string[];
  summary: {
    total: number;
    mentioned: number;
    missing: number;
    errors: number;
    citationHits: number;
    answerHits: number;
  };
  results: QueryResult[];
  history: QueryResult[];
};

type AiActionOk = {
  ok: true;
  model: string;
  domains: string[];
  answer: string;
  citations: string[];
  usage: Record<string, unknown>;
  topic?: string;
  query?: string;
  url?: string;
  extractedChars?: number;
  truncated?: boolean;
};

type AiRunRow = {
  id: number;
  createdAt: string;
  action: "research" | "brief" | "audit";
  inputTopic: string | null;
  inputUrl: string | null;
  model: string;
  domains: string[];
  answer: string | null;
  citations: string[];
  usage: Record<string, unknown>;
  status: "ok" | "error";
  errorMessage: string | null;
};

type CostsSummary = {
  days: number;
  totalRuns: number;
  ok: number;
  error: number;
  totalCost: number;
  byAction: Record<string, { count: number; cost: number }>;
};

type ManualAction = "research" | "brief" | "audit";

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

async function runAIAction(action: ManualAction, payload: Record<string, string>) {
  return api<AiActionOk>(`/api/admin/ai/${action}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

function StatusPill({ result }: { result: QueryResult }) {
  if (result.error) return <span className="admin-pill admin-pill--warn">Erro</span>;
  if (result.mentioned) return <span className="admin-pill admin-pill--ok">Presente</span>;
  return <span className="admin-pill admin-pill--miss">Ausente</span>;
}

function formatUsage(usage: Record<string, unknown>): string {
  if (!usage || Object.keys(usage).length === 0) return "—";
  const cost = usage.cost;
  const bits: string[] = [];
  if (typeof usage.total_tokens === "number") bits.push(`${usage.total_tokens} tok`);
  if (typeof cost === "number") bits.push(`$${cost}`);
  else if (cost && typeof cost === "object" && "total_cost" in cost) {
    bits.push(`$${String((cost as { total_cost?: unknown }).total_cost)}`);
  }
  return bits.length ? bits.join(" · ") : JSON.stringify(usage);
}

function ActionOutput({ title, result }: { title: string; result: AiActionOk }) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2 text-xs text-muted">
        <span className="admin-pill admin-pill--ok">{title}</span>
        <span>{result.model}</span>
        {result.domains.length > 0 ? (
          <>
            <span>·</span>
            <span>Allowlist: {result.domains.join(", ")}</span>
          </>
        ) : null}
        {typeof result.extractedChars === "number" ? (
          <>
            <span>·</span>
            <span>
              Texto extraído: {result.extractedChars}
              {result.truncated ? " (truncado)" : ""}
            </span>
          </>
        ) : null}
      </div>
      <pre className="admin-pre whitespace-pre-wrap text-sm">{result.answer}</pre>
      {result.citations.length > 0 ? (
        <div>
          <p className="text-sm font-medium">Citações</p>
          <ul className="mt-1 space-y-1 text-sm">
            {result.citations.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal hover:underline break-all"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-muted">Nenhuma citação retornada.</p>
      )}
      <p className="text-xs text-muted">usage: {formatUsage(result.usage)}</p>
    </div>
  );
}

function ResultCard({ result }: { result: QueryResult }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="surface-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-teal">{result.prompt}</p>
          <p className="mt-1 text-xs text-muted">
            {result.model} · {new Date(result.ranAt).toLocaleString("pt-BR")}
          </p>
        </div>
        <StatusPill result={result} />
      </div>
      {result.error ? (
        <p className="mt-3 text-sm text-[#b42318]">{result.error}</p>
      ) : (
        <>
          <button
            type="button"
            className="mt-3 text-sm text-teal hover:underline"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Ocultar resposta" : "Ver resposta Sonar"}
          </button>
          {open ? (
            <pre className="admin-pre mt-3 whitespace-pre-wrap text-sm">{result.answer}</pre>
          ) : null}
        </>
      )}
    </article>
  );
}

export function AiMonitoringPanel() {
  const [meta, setMeta] = useState<MonitoringMeta | null>(null);
  const [selectedPackId, setSelectedPackId] = useState("core");
  const [visibilityMode, setVisibilityMode] = useState<VisibilityMode>("pack");
  const [promptsText, setPromptsText] = useState("");
  const [busy, setBusy] = useState(false);
  const [actionBusy, setActionBusy] = useState<ManualAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<RunResponse | null>(null);
  const [visibilityHistory, setVisibilityHistory] = useState<QueryResult[]>([]);

  const [researchTopic, setResearchTopic] = useState("");
  const [researchResult, setResearchResult] = useState<AiActionOk | null>(null);
  const [briefQuery, setBriefQuery] = useState("");
  const [briefResult, setBriefResult] = useState<AiActionOk | null>(null);
  const [auditUrl, setAuditUrl] = useState(
    "https://celpe-depe.com/pt-br/provas-anteriores/2026-1",
  );
  const [auditResult, setAuditResult] = useState<AiActionOk | null>(null);

  const [actionHistory, setActionHistory] = useState<AiRunRow[]>([]);
  const [costs, setCosts] = useState<CostsSummary | null>(null);
  const [filterAction, setFilterAction] = useState<"all" | ManualAction>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "ok" | "error">("all");

  const loadActionHistory = useCallback(async () => {
    const qs = new URLSearchParams({
      limit: "50",
      days: "30",
      action: filterAction,
      status: filterStatus,
    });
    const data = await api<{ history: AiRunRow[]; costs: CostsSummary }>(
      `/api/admin/ai/history?${qs.toString()}`,
    );
    setActionHistory(data.history);
    setCosts(data.costs);
  }, [filterAction, filterStatus]);

  const load = useCallback(async () => {
    setError(null);
    const data = await api<MonitoringMeta>("/api/admin/ai-monitoring");
    setMeta(data);
    setVisibilityHistory(data.history);
    setSelectedPackId((prev) =>
      data.packs.some((p) => p.id === prev) ? prev : data.defaultPackId,
    );
    await loadActionHistory();
  }, [loadActionHistory]);

  const activePack = useMemo(
    () => meta?.packs.find((p) => p.id === selectedPackId) ?? null,
    [meta, selectedPackId],
  );

  const parsedListQueries = useMemo(
    () => parseQueryList(promptsText, MAX_VISIBILITY_QUERIES),
    [promptsText],
  );

  const packQueries = activePack?.queries ?? [];
  const queryCount = visibilityMode === "list" ? parsedListQueries.length : packQueries.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(VISIBILITY_LIST_STORAGE_KEY);
    if (saved?.trim()) setPromptsText(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || visibilityMode !== "list") return;
    localStorage.setItem(VISIBILITY_LIST_STORAGE_KEY, promptsText);
  }, [promptsText, visibilityMode]);

  useEffect(() => {
    void load().catch((e: unknown) => {
      setError(e instanceof Error ? e.message : "Falha ao carregar");
    });
  }, [load]);

  useEffect(() => {
    void loadActionHistory().catch(() => undefined);
  }, [loadActionHistory]);

  const selectedCount = queryCount;

  async function runQueries() {
    setBusy(true);
    setError(null);
    try {
      const body =
        visibilityMode === "list"
          ? { queriesText: promptsText }
          : { pack: selectedPackId };

      if (visibilityMode === "list" && parsedListQueries.length === 0) {
        setError("Cole ao menos uma query na lista");
        setBusy(false);
        return;
      }

      const data = await api<RunResponse>("/api/admin/ai-monitoring", {
        method: "POST",
        body: JSON.stringify(body),
      });
      setLastRun(data);
      setVisibilityHistory(data.history);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Falha na consulta");
    } finally {
      setBusy(false);
    }
  }

  function loadPackIntoList() {
    if (!activePack) return;
    setPromptsText(activePack.queries.join("\n"));
    setVisibilityMode("list");
  }

  async function onResearch() {
    if (!researchTopic.trim()) {
      setActionError("Informe o tema da pesquisa oficial");
      return;
    }
    setActionBusy("research");
    setActionError(null);
    setResearchResult(null);
    try {
      const data = await runAIAction("research", { topic: researchTopic.trim() });
      setResearchResult(data);
      await loadActionHistory();
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : "Falha na research");
      await loadActionHistory().catch(() => undefined);
    } finally {
      setActionBusy(null);
    }
  }

  async function onBrief() {
    if (!briefQuery.trim()) {
      setActionError("Informe a query-alvo do brief");
      return;
    }
    setActionBusy("brief");
    setActionError(null);
    setBriefResult(null);
    try {
      const data = await runAIAction("brief", { query: briefQuery.trim() });
      setBriefResult(data);
      await loadActionHistory();
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : "Falha no brief");
      await loadActionHistory().catch(() => undefined);
    } finally {
      setActionBusy(null);
    }
  }

  async function onAudit() {
    if (!auditUrl.trim()) {
      setActionError("Informe a URL para audit");
      return;
    }
    setActionBusy("audit");
    setActionError(null);
    setAuditResult(null);
    try {
      const data = await runAIAction("audit", { url: auditUrl.trim() });
      setAuditResult(data);
      await loadActionHistory();
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : "Falha no audit");
      await loadActionHistory().catch(() => undefined);
    } finally {
      setActionBusy(null);
    }
  }

  const sonarConfigured = Boolean(meta?.sonarConfigured ?? meta?.configured);
  const anyBusy = busy || actionBusy !== null;

  return (
    <div className="space-y-6">
      <BraveSearchPanel />

      <BingSearchPanel />

      <div className="surface-card p-4">
        <div className="admin-plan__head">
          <div>
            <h2 className="font-semibold text-teal">Sonar — visibilidade AI</h2>
            <p className="mt-1 text-sm text-muted">
              Roda cada query no Perplexity Sonar e marca se{" "}
              <strong>{meta?.targetHost ?? "celpe-depe.com"}</strong> aparece na resposta ou nas
              citações.
            </p>
          </div>
          <button type="button" className="btn-secondary" onClick={() => void load()} disabled={anyBusy}>
            Atualizar
          </button>
        </div>

        {meta && !sonarConfigured ? (
          <p className="admin-msg admin-msg--error mt-3">
            PERPLEXITY_API_KEY não configurada.
          </p>
        ) : null}

        {error ? <p className="admin-msg admin-msg--error mt-3">{error}</p> : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={`admin-tab ${visibilityMode === "pack" ? "admin-tab-active" : ""}`}
            onClick={() => setVisibilityMode("pack")}
            disabled={anyBusy}
          >
            Pacote pronto
          </button>
          <button
            type="button"
            className={`admin-tab ${visibilityMode === "list" ? "admin-tab-active" : ""}`}
            onClick={() => setVisibilityMode("list")}
            disabled={anyBusy}
          >
            Colar lista
          </button>
        </div>

        {visibilityMode === "pack" ? (
          <>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <label className="block text-sm font-medium">
                Conjunto
                <select
                  className="admin-input admin-input--select mt-1 min-w-[16rem]"
                  value={selectedPackId}
                  onChange={(e) => setSelectedPackId(e.target.value)}
                  disabled={anyBusy}
                >
                  {meta?.packs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.queryCount})
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="btn-secondary"
                onClick={loadPackIntoList}
                disabled={anyBusy || !activePack}
              >
                Editar pack como lista
              </button>
            </div>
            {activePack ? (
              <div className="mt-4">
                <p className="text-sm text-muted">{activePack.description}</p>
                <ol className="mt-2 space-y-1 text-sm">
                  {activePack.queries.map((q, i) => (
                    <li key={q} className="flex gap-2">
                      <span className="text-muted shrink-0">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium">
              Lista de queries
              <textarea
                className="admin-input mt-1 min-h-[10rem] w-full font-mono text-sm"
                value={promptsText}
                onChange={(e) => setPromptsText(e.target.value)}
                disabled={anyBusy}
                spellCheck={false}
                placeholder={
                  "Cole várias queries de uma vez:\n\n" +
                  "uma por linha\n" +
                  "ou separadas por vírgula\n" +
                  "ou numeradas: 1. query, 2. query\n\n" +
                  "Ex.:\n" +
                  "Como se preparar para o Celpe-Bras?\n" +
                  "provas anteriores Celpe-Bras PDF\n" +
                  "celpe-depe.com"
                }
              />
            </label>
            <p className="text-sm text-muted">
              {parsedListQueries.length} query(s) detectada(s) · máx. {MAX_VISIBILITY_QUERIES} ·
              salvo localmente no navegador
            </p>
            {parsedListQueries.length > 0 ? (
              <ol className="space-y-1 text-sm">
                {parsedListQueries.map((q, i) => (
                  <li key={q} className="flex gap-2">
                    <span className="text-muted shrink-0">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() => void runQueries()}
            disabled={anyBusy || !sonarConfigured}
          >
            {busy
              ? `Verificando ${selectedCount} queries…`
              : `Verificar conjunto (${selectedCount})`}
          </button>
          <span className="text-sm text-muted">
            {visibilityMode === "pack"
              ? `Pack: ${activePack?.id ?? "—"}`
              : `${parsedListQueries.length} na lista`}
          </span>
        </div>

        {lastRun ? (
          <>
            <div className="admin-grid mt-4">
              <div className="surface-card p-4">
                <p className="text-sm text-muted">Presentes</p>
                <p className="text-2xl font-bold text-teal">
                  {lastRun.summary.mentioned}/{lastRun.summary.total}
                </p>
              </div>
              <div className="surface-card p-4">
                <p className="text-sm text-muted">Ausentes</p>
                <p className="text-2xl font-bold text-teal">{lastRun.summary.missing}</p>
              </div>
              <div className="surface-card p-4">
                <p className="text-sm text-muted">Citações / texto</p>
                <p className="text-2xl font-bold text-teal">
                  {lastRun.summary.citationHits}/{lastRun.summary.answerHits}
                </p>
              </div>
              <div className="surface-card p-4">
                <p className="text-sm text-muted">Erros</p>
                <p className="text-2xl font-bold text-teal">{lastRun.summary.errors}</p>
              </div>
            </div>

            <div className="admin-table-wrap mt-4">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Query</th>
                    <th>Status</th>
                    <th>Onde</th>
                  </tr>
                </thead>
                <tbody>
                  {lastRun.results.map((r, i) => (
                    <tr key={`${r.prompt}-${r.ranAt}`}>
                      <td className="text-muted">{i + 1}</td>
                      <td className="max-w-[28rem]" title={r.prompt}>
                        {r.prompt}
                      </td>
                      <td>
                        <StatusPill result={r} />
                      </td>
                      <td className="text-sm text-muted max-w-[16rem]">
                        {r.error
                          ? r.error
                          : r.match.inCitations
                            ? `SERP #${r.match.matchedUrls.join(", ")}`
                            : r.match.inAnswer
                              ? "menção no texto"
                              : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-teal">Ações manuais</h2>
          <p className="mt-1 text-sm text-muted">
            research / brief / audit via Sonar Pro. Domínios oficiais e prompts ficam no servidor.
          </p>
        </div>

        {meta && !meta.configured ? (
          <p className="admin-msg admin-msg--error">
            PERPLEXITY_API_KEY_CELPE (ou PERPLEXITY_API_KEY) não configurada.
          </p>
        ) : null}
        {actionError ? <p className="admin-msg admin-msg--error">{actionError}</p> : null}

        {costs ? (
          <div className="admin-grid">
            <div className="surface-card p-4">
              <p className="text-sm text-muted">Runs ({costs.days}d)</p>
              <p className="text-2xl font-bold text-teal">{costs.totalRuns}</p>
            </div>
            <div className="surface-card p-4">
              <p className="text-sm text-muted">OK / Erro</p>
              <p className="text-2xl font-bold text-teal">
                {costs.ok}/{costs.error}
              </p>
            </div>
            <div className="surface-card p-4">
              <p className="text-sm text-muted">Cost estimado</p>
              <p className="text-2xl font-bold text-teal">
                {costs.totalCost > 0 ? `$${costs.totalCost.toFixed(4)}` : "—"}
              </p>
            </div>
          </div>
        ) : null}

        <div className="surface-card p-4">
          <h3 className="font-medium text-teal">1. Official research</h3>
          <p className="mt-1 text-sm text-muted">Fatos só de fontes oficiais (allowlist).</p>
          <label className="mt-3 block text-sm font-medium">
            Tema
            <input
              className="admin-input mt-1 w-full"
              value={researchTopic}
              onChange={(e) => setResearchTopic(e.target.value)}
              placeholder="Ex.: datas e taxas da inscrição Celpe-Bras 2026"
              disabled={anyBusy}
            />
          </label>
          <button
            type="button"
            className="btn-primary mt-3"
            onClick={() => void onResearch()}
            disabled={anyBusy || !sonarConfigured}
          >
            {actionBusy === "research" ? "Pesquisando…" : "Run research"}
          </button>
          {researchResult ? <ActionOutput title="Research" result={researchResult} /> : null}
        </div>

        <div className="surface-card p-4">
          <h3 className="font-medium text-teal">2. Content brief</h3>
          <p className="mt-1 text-sm text-muted">SEO/GEO brief com allowlist oficial para fatos.</p>
          <label className="mt-3 block text-sm font-medium">
            Keyword / query
            <input
              className="admin-input mt-1 w-full"
              value={briefQuery}
              onChange={(e) => setBriefQuery(e.target.value)}
              placeholder="Ex.: como se preparar para o Celpe-Bras"
              disabled={anyBusy}
            />
          </label>
          <button
            type="button"
            className="btn-primary mt-3"
            onClick={() => void onBrief()}
            disabled={anyBusy || !sonarConfigured}
          >
            {actionBusy === "brief" ? "Gerando…" : "Run brief"}
          </button>
          {briefResult ? <ActionOutput title="Brief" result={briefResult} /> : null}
        </div>

        <div className="surface-card p-4">
          <h3 className="font-medium text-teal">3. Page audit</h3>
          <p className="mt-1 text-sm text-muted">
            Extrai o HTML publicado e compara com fontes oficiais (não inventa o conteúdo).
          </p>
          <label className="mt-3 block text-sm font-medium">
            URL celpe-depe.com
            <input
              className="admin-input mt-1 w-full"
              value={auditUrl}
              onChange={(e) => setAuditUrl(e.target.value)}
              disabled={anyBusy}
            />
          </label>
          <button
            type="button"
            className="btn-primary mt-3"
            onClick={() => void onAudit()}
            disabled={anyBusy || !sonarConfigured}
          >
            {actionBusy === "audit" ? "Auditando…" : "Run audit"}
          </button>
          {auditResult ? <ActionOutput title="Audit" result={auditResult} /> : null}
        </div>

        <div className="surface-card p-4">
          <div className="admin-plan__head">
            <div>
              <h3 className="font-medium text-teal">Histórico AI runs</h3>
              <p className="mt-1 text-sm text-muted">Tabela compartilhada research / brief / audit.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="admin-input admin-input--select"
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value as typeof filterAction)}
              >
                <option value="all">Todas ações</option>
                <option value="research">research</option>
                <option value="brief">brief</option>
                <option value="audit">audit</option>
              </select>
              <select
                className="admin-input admin-input--select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              >
                <option value="all">Todos status</option>
                <option value="ok">ok</option>
                <option value="error">error</option>
              </select>
            </div>
          </div>

          <div className="admin-table-wrap mt-3">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Ação</th>
                  <th>Input</th>
                  <th>Status</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                {actionHistory.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-muted">
                      Nenhum run ainda.
                    </td>
                  </tr>
                ) : (
                  actionHistory.map((row) => (
                    <tr key={row.id}>
                      <td className="whitespace-nowrap text-muted">
                        {new Date(row.createdAt).toLocaleString("pt-BR")}
                      </td>
                      <td>{row.action}</td>
                      <td
                        className="max-w-[22rem]"
                        title={row.inputTopic || row.inputUrl || ""}
                      >
                        {row.inputTopic || row.inputUrl || "—"}
                      </td>
                      <td>
                        {row.status === "ok" ? (
                          <span className="admin-pill admin-pill--ok">ok</span>
                        ) : (
                          <span className="admin-pill admin-pill--warn">error</span>
                        )}
                      </td>
                      <td className="max-w-[14rem] text-xs text-muted font-mono">
                        {row.errorMessage || formatUsage(row.usage)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {visibilityHistory.length > 0 ? (
        <section className="space-y-3">
          <h3 className="font-semibold text-teal">Histórico Sonar</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Prompt</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visibilityHistory.map((r) => (
                  <tr key={r.id ?? `${r.prompt}-${r.ranAt}`}>
                    <td className="whitespace-nowrap text-muted">
                      {new Date(r.ranAt).toLocaleString("pt-BR")}
                    </td>
                    <td className="max-w-[28rem]">{r.prompt}</td>
                    <td>
                      <StatusPill result={r} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
