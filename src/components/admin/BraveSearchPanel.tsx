"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AI_VISIBILITY_QUERY_PACKS,
  parseQueryList,
} from "@/lib/admin/ai-monitoring";

const BRAVE_LIST_STORAGE_KEY = "celpe_admin_brave_queries";
const MAX_QUERIES = 12;

type VisibilityMode = "pack" | "list";

type BraveHit = {
  rank: number;
  title: string;
  url: string;
  description?: string;
  isTarget: boolean;
};

type SearchResponse = {
  ok: true;
  query: string;
  hits: BraveHit[];
  targetRank: number | null;
  targetHost: string;
};

type BatchResponse = {
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
  results: {
    prompt: string;
    mentioned: boolean;
    error?: string;
    match: { inCitations: boolean; matchedUrls: string[] };
  }[];
  history: {
    id: number;
    prompt: string;
    mentioned: boolean;
    error: string | null;
    matchedUrls: string[];
    ranAt: string;
  }[];
};

type BraveMeta = {
  configured: boolean;
  targetHost: string;
  defaultPackId: string;
  packs: {
    id: string;
    label: string;
    description: string;
    queryCount: number;
    queries: string[];
  }[];
};

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

export function BraveSearchPanel() {
  const [meta, setMeta] = useState<BraveMeta | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);

  const [mode, setMode] = useState<VisibilityMode>("pack");
  const [packId, setPackId] = useState("core");
  const [listText, setListText] = useState("");
  const [batchBusy, setBatchBusy] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [batchResult, setBatchResult] = useState<BatchResponse | null>(null);
  const [history, setHistory] = useState<BatchResponse["history"]>([]);

  const parsedList = useMemo(() => parseQueryList(listText, MAX_QUERIES), [listText]);
  const activePack = useMemo(
    () => meta?.packs.find((p) => p.id === packId) ?? AI_VISIBILITY_QUERY_PACKS.find((p) => p.id === packId),
    [meta, packId],
  );
  const batchCount = mode === "list" ? parsedList.length : (activePack?.queries.length ?? 0);

  const load = useCallback(async () => {
    const data = await api<BraveMeta & { history: BatchResponse["history"] }>(
      "/api/admin/brave/monitoring",
    );
    setMeta(data);
    setHistory(data.history);
    setPackId((prev) => (data.packs.some((p) => p.id === prev) ? prev : data.defaultPackId));
  }, []);

  useEffect(() => {
    void load().catch((e: unknown) => {
      setBatchError(e instanceof Error ? e.message : "Falha ao carregar Brave");
    });
  }, [load]);

  useEffect(() => {
    const saved = localStorage.getItem(BRAVE_LIST_STORAGE_KEY);
    if (saved?.trim()) setListText(saved);
  }, []);

  useEffect(() => {
    if (mode === "list") localStorage.setItem(BRAVE_LIST_STORAGE_KEY, listText);
  }, [listText, mode]);

  async function onSearch() {
    const q = searchQuery.trim();
    if (!q) {
      setSearchError("Digite uma query");
      return;
    }
    setSearchBusy(true);
    setSearchError(null);
    setSearchResult(null);
    try {
      const data = await api<SearchResponse>("/api/admin/brave/search", {
        method: "POST",
        body: JSON.stringify({ q, count: 20 }),
      });
      setSearchResult(data);
    } catch (e: unknown) {
      setSearchError(e instanceof Error ? e.message : "Falha na busca");
    } finally {
      setSearchBusy(false);
    }
  }

  async function onBatch() {
    setBatchBusy(true);
    setBatchError(null);
    setBatchResult(null);
    try {
      const body =
        mode === "list" ? { queriesText: listText } : { pack: packId };
      if (mode === "list" && parsedList.length === 0) {
        setBatchError("Cole ao menos uma query");
        setBatchBusy(false);
        return;
      }
      const data = await api<BatchResponse>("/api/admin/brave/monitoring", {
        method: "POST",
        body: JSON.stringify(body),
      });
      setBatchResult(data);
      setHistory(data.history);
    } catch (e: unknown) {
      setBatchError(e instanceof Error ? e.message : "Falha no lote");
    } finally {
      setBatchBusy(false);
    }
  }

  const configured = Boolean(meta?.configured);
  const busy = searchBusy || batchBusy;

  return (
    <div className="surface-card p-4 space-y-6">
      <div className="admin-plan__head">
        <div>
          <h2 className="font-semibold text-teal">Brave Search</h2>
          <p className="mt-1 text-sm text-muted">
            Busca web via Brave API (SERP real, BR/pt). Verifica posição de{" "}
            <strong>{meta?.targetHost ?? "celpe-depe.com"}</strong> nos resultados.
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={() => void load()} disabled={busy}>
          Atualizar
        </button>
      </div>

      {meta && !configured ? (
        <p className="admin-msg admin-msg--error">BRAVE_API_KEY não configurada no servidor.</p>
      ) : null}

      {/* —— Busca única —— */}
      <section className="space-y-3 border-t border-[var(--site-border)] pt-4">
        <h3 className="font-medium text-teal">Busca única</h3>
        <div className="flex flex-wrap gap-2">
          <input
            className="admin-input min-w-[16rem] flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ex.: provas anteriores Celpe-Bras PDF"
            disabled={busy}
            onKeyDown={(e) => {
              if (e.key === "Enter") void onSearch();
            }}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() => void onSearch()}
            disabled={busy || !configured}
          >
            {searchBusy ? "Buscando…" : "Buscar"}
          </button>
        </div>
        {searchError ? <p className="admin-msg admin-msg--error">{searchError}</p> : null}

        {searchResult ? (
          <div className="space-y-2">
            {searchResult.targetRank ? (
              <p className="text-sm text-teal font-medium">
                {searchResult.targetHost} na posição #{searchResult.targetRank}
              </p>
            ) : (
              <p className="text-sm text-muted">
                {searchResult.targetHost} não aparece nos top {searchResult.hits.length}
              </p>
            )}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.hits.map((h) => (
                    <tr key={h.url} className={h.isTarget ? "bg-[var(--site-primary-highlight)]" : undefined}>
                      <td className="text-muted">{h.rank}</td>
                      <td className="max-w-[20rem]">
                        <div className="font-medium">{h.title}</div>
                        {h.description ? (
                          <div className="text-xs text-muted mt-0.5 line-clamp-2">{h.description}</div>
                        ) : null}
                      </td>
                      <td className="max-w-[16rem]">
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal hover:underline break-all text-sm"
                        >
                          {h.url}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>

      {/* —— Visibilidade em lote —— */}
      <section className="space-y-3 border-t border-[var(--site-border)] pt-4">
        <h3 className="font-medium text-teal">Visibilidade em lote</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`admin-tab ${mode === "pack" ? "admin-tab-active" : ""}`}
            onClick={() => setMode("pack")}
            disabled={busy}
          >
            Pacote pronto
          </button>
          <button
            type="button"
            className={`admin-tab ${mode === "list" ? "admin-tab-active" : ""}`}
            onClick={() => setMode("list")}
            disabled={busy}
          >
            Colar lista
          </button>
        </div>

        {mode === "pack" ? (
          <div className="space-y-2">
            <select
              className="admin-input admin-input--select"
              value={packId}
              onChange={(e) => setPackId(e.target.value)}
              disabled={busy}
            >
              {meta?.packs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} ({p.queryCount})
                </option>
              ))}
            </select>
            {activePack ? (
              <ol className="text-sm space-y-1">
                {activePack.queries.map((q, i) => (
                  <li key={q}>
                    {i + 1}. {q}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : (
          <div className="space-y-2">
            <textarea
              className="admin-input min-h-[8rem] w-full font-mono text-sm"
              value={listText}
              onChange={(e) => setListText(e.target.value)}
              disabled={busy}
              placeholder="Uma query por linha ou separadas por vírgula…"
            />
            <p className="text-sm text-muted">{parsedList.length} detectada(s)</p>
          </div>
        )}

        {batchError ? <p className="admin-msg admin-msg--error">{batchError}</p> : null}

        <button
          type="button"
          className="btn-primary"
          onClick={() => void onBatch()}
          disabled={busy || !configured}
        >
          {batchBusy ? `Verificando ${batchCount}…` : `Verificar lote (${batchCount})`}
        </button>

        {batchResult ? (
          <>
            <div className="admin-grid">
              <div className="surface-card p-3">
                <p className="text-xs text-muted">Presentes</p>
                <p className="text-xl font-bold text-teal">
                  {batchResult.summary.mentioned}/{batchResult.summary.total}
                </p>
              </div>
              <div className="surface-card p-3">
                <p className="text-xs text-muted">Ausentes</p>
                <p className="text-xl font-bold text-teal">{batchResult.summary.missing}</p>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>SERP</th>
                    <th>URLs</th>
                  </tr>
                </thead>
                <tbody>
                  {batchResult.results.map((r) => (
                    <tr key={r.prompt}>
                      <td className="max-w-[22rem]">{r.prompt}</td>
                      <td>
                        {r.error ? (
                          <span className="admin-pill admin-pill--warn">Erro</span>
                        ) : r.mentioned ? (
                          <span className="admin-pill admin-pill--ok">Presente</span>
                        ) : (
                          <span className="admin-pill admin-pill--miss">Ausente</span>
                        )}
                      </td>
                      <td className="text-sm text-muted max-w-[14rem]">
                        {r.error ?? (r.match.matchedUrls.length ? r.match.matchedUrls.join(", ") : "—")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {history.length > 0 ? (
          <details className="text-sm">
            <summary className="cursor-pointer text-teal">Histórico Brave ({history.length})</summary>
            <div className="admin-table-wrap mt-2">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Quando</th>
                    <th>Query</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id}>
                      <td className="text-muted whitespace-nowrap">
                        {new Date(h.ranAt).toLocaleString("pt-BR")}
                      </td>
                      <td>{h.prompt}</td>
                      <td>
                        {h.error ? (
                          <span className="admin-pill admin-pill--warn">Erro</span>
                        ) : h.mentioned ? (
                          <span className="admin-pill admin-pill--ok">Presente</span>
                        ) : (
                          <span className="admin-pill admin-pill--miss">Ausente</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ) : null}
      </section>
    </div>
  );
}
