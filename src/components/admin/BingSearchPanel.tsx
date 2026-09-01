"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AI_VISIBILITY_QUERY_PACKS,
  parseQueryList,
} from "@/lib/admin/ai-monitoring";

const BING_LIST_STORAGE_KEY = "celpe_admin_bing_queries";
const MAX_QUERIES = 12;

type VisibilityMode = "pack" | "list";

type BingQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  avgImpressionPosition: number | null;
  date: string | null;
};

type BingAggregate = {
  matchedQuery: string;
  clicks: number;
  impressions: number;
  avgImpressionPosition: number | null;
};

type LookupResponse = {
  ok: true;
  query: string;
  siteUrl: string;
  rows: BingQueryRow[];
  aggregate: BingAggregate | null;
  mentioned: boolean;
};

type BatchResultRow = {
  prompt: string;
  mentioned: boolean;
  error?: string;
  match: { matchedSnippets: string[]; matchedUrls: string[] };
  bing?: BingAggregate | null;
};

type BatchResponse = {
  packId: string | null;
  queries: string[];
  totalQueriesInWebmaster: number;
  summary: {
    total: number;
    mentioned: number;
    missing: number;
    errors: number;
  };
  results: BatchResultRow[];
  history: {
    id: number;
    prompt: string;
    mentioned: boolean;
    error: string | null;
    matchedUrls: string[];
    ranAt: string;
  }[];
};

type BingMeta = {
  configured: boolean;
  siteUrl: string;
  publicSiteUrl: string;
  defaultPackId: string;
  topQueries: BingAggregate[];
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

function formatDetail(row: BatchResultRow): string {
  if (row.error) return row.error;
  if (row.bing && row.bing.impressions > 0) {
    const pos =
      row.bing.avgImpressionPosition != null
        ? `pos ${row.bing.avgImpressionPosition}`
        : "pos n/d";
    return `${row.bing.matchedQuery} · ${pos} · ${row.bing.impressions} imp · ${row.bing.clicks} cliques`;
  }
  return row.match.matchedSnippets[0] ?? "—";
}

export function BingSearchPanel() {
  const [meta, setMeta] = useState<BingMeta | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<LookupResponse | null>(null);

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
    const data = await api<BingMeta & { history: BatchResponse["history"] }>(
      "/api/admin/bing/monitoring",
    );
    setMeta(data);
    setHistory(data.history);
    setPackId((prev) => (data.packs.some((p) => p.id === prev) ? prev : data.defaultPackId));
  }, []);

  useEffect(() => {
    void load().catch((e: unknown) => {
      setBatchError(e instanceof Error ? e.message : "Falha ao carregar Bing Webmaster");
    });
  }, [load]);

  useEffect(() => {
    const saved = localStorage.getItem(BING_LIST_STORAGE_KEY);
    if (saved?.trim()) setListText(saved);
  }, []);

  useEffect(() => {
    if (mode === "list") localStorage.setItem(BING_LIST_STORAGE_KEY, listText);
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
      const data = await api<LookupResponse>("/api/admin/bing/search", {
        method: "POST",
        body: JSON.stringify({ q }),
      });
      setSearchResult(data);
    } catch (e: unknown) {
      setSearchError(e instanceof Error ? e.message : "Falha na consulta");
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
      const data = await api<BatchResponse>("/api/admin/bing/monitoring", {
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
          <h2 className="font-semibold text-teal">Bing Webmaster</h2>
          <p className="mt-1 text-sm text-muted">
            Search Performance do site{" "}
            <strong>{meta?.siteUrl ?? "https://celpe-depe.com/"}</strong> via Bing Webmaster API
            (queries com impressões/cliques — não SERP ao vivo).
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={() => void load()} disabled={busy}>
          Atualizar
        </button>
      </div>

      {meta && !configured ? (
        <p className="admin-msg admin-msg--error">
          BING_WEBMASTER_API_KEY não configurada no servidor.
        </p>
      ) : null}

      {meta && meta.topQueries.length > 0 ? (
        <details className="text-sm">
          <summary className="cursor-pointer text-teal">
            Top queries no Webmaster ({meta.topQueries.length})
          </summary>
          <div className="admin-table-wrap mt-2">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Query</th>
                  <th>Impressões</th>
                  <th>Cliques</th>
                  <th>Pos. média</th>
                </tr>
              </thead>
              <tbody>
                {meta.topQueries.map((q) => (
                  <tr key={q.matchedQuery}>
                    <td>{q.matchedQuery}</td>
                    <td>{q.impressions}</td>
                    <td>{q.clicks}</td>
                    <td>{q.avgImpressionPosition ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : configured ? (
        <p className="text-sm text-muted">
          Nenhuma query com impressões no Bing Webmaster ainda (API retornou vazio).
        </p>
      ) : null}

      <section className="space-y-3 border-t border-[var(--site-border)] pt-4">
        <h3 className="font-medium text-teal">Consulta única</h3>
        <div className="flex flex-wrap gap-2">
          <input
            className="admin-input min-w-[16rem] flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ex.: celpe bras preparação"
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
            {searchBusy ? "Consultando…" : "Consultar"}
          </button>
        </div>
        {searchError ? <p className="admin-msg admin-msg--error">{searchError}</p> : null}

        {searchResult ? (
          <div className="space-y-2">
            {searchResult.mentioned && searchResult.aggregate ? (
              <p className="text-sm text-teal font-medium">
                Encontrada: {searchResult.aggregate.matchedQuery} —{" "}
                {searchResult.aggregate.impressions} impressões, {searchResult.aggregate.clicks}{" "}
                cliques
                {searchResult.aggregate.avgImpressionPosition != null
                  ? `, pos. média ${searchResult.aggregate.avgImpressionPosition}`
                  : ""}
              </p>
            ) : (
              <p className="text-sm text-muted">
                Sem dados no Bing Webmaster para esta query.
              </p>
            )}
            {searchResult.rows.length > 0 ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Impressões</th>
                      <th>Cliques</th>
                      <th>Pos. média</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.rows.map((row, i) => (
                      <tr key={`${row.date ?? i}-${row.impressions}`}>
                        <td className="text-muted whitespace-nowrap">
                          {row.date ? new Date(row.date).toLocaleDateString("pt-BR") : "—"}
                        </td>
                        <td>{row.impressions}</td>
                        <td>{row.clicks}</td>
                        <td>{row.avgImpressionPosition ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="space-y-3 border-t border-[var(--site-border)] pt-4">
        <h3 className="font-medium text-teal">Checar pack / lista</h3>
        <p className="text-sm text-muted">
          Cruza queries com o histórico do Webmaster (impressões &gt; 0 = presente).
        </p>
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
                <p className="text-xs text-muted">Com impressões</p>
                <p className="text-xl font-bold text-teal">
                  {batchResult.summary.mentioned}/{batchResult.summary.total}
                </p>
              </div>
              <div className="surface-card p-3">
                <p className="text-xs text-muted">Sem dados</p>
                <p className="text-xl font-bold text-teal">{batchResult.summary.missing}</p>
              </div>
            </div>
            <p className="text-xs text-muted">
              {batchResult.totalQueriesInWebmaster} queries distintas no Webmaster no total.
            </p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Webmaster</th>
                    <th>Detalhes</th>
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
                      <td className="text-sm text-muted max-w-[18rem]">{formatDetail(r)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {history.length > 0 ? (
          <details className="text-sm">
            <summary className="cursor-pointer text-teal">Histórico Bing ({history.length})</summary>
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
