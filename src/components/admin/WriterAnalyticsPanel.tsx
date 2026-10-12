"use client";

import { useCallback, useEffect, useState } from "react";
import { WRITING_TASK_IDS, getWritingTask } from "@/content/writing/tasks";
import {
  DELIVERY_STATUS_FILTER,
  SESSION_STATUS_FILTER,
  SUBMISSION_STATUS_FILTER,
} from "@/lib/writer/admin-query";
import { formatDuration } from "@/lib/writer/time";

type Row = Record<string, string | number | null>;

type Kpis = {
  uniqueVisitors: number;
  sessions: number;
  started: number;
  emailGate: number;
  examMin: number;
  submitAttempts: number;
  analyzedOk: number;
  analyzedFailed: number;
  emailsSent: number;
  emailFailures: number;
  reportsOpened: number;
  resubmissions: number;
  abandoned: number;
  conversionOpenedToStarted: number | null;
  conversionStartedToSubmitted: number | null;
  conversionSubmittedToCompleted: number | null;
  conversionEmailSentToReportOpened: number | null;
  medianActiveMs: number | null;
  p75ActiveMs: number | null;
  medianElapsedMs: number | null;
  medianWordsPerMinute: number | null;
};

type FunnelStep = { key: string; label: string; count: number; fromPrev: number | null; fromOpened: number | null };

type SubmissionRow = {
  id: string;
  created_at: string;
  completed_at: string | null;
  session_id: string | null;
  locale: string;
  task_id: string | null;
  word_count: number;
  status: string;
  celpe_level: string | null;
  provider: string | null;
  model: string | null;
  mock: number;
  analysis_duration_ms: number | null;
  active_ms: number | null;
  elapsed_ms: number | null;
  archive_status: string | null;
  archive_path: string | null;
  error_code: string | null;
  error_message: string | null;
  email_masked: string;
  email_domain: string;
  delivery_status: string | null;
  delivery_attempts: number | null;
  sent_at: string | null;
  report_open_count: number | null;
  report_first_opened_at: string | null;
};

type Detail = {
  submission: Record<string, unknown> & { essay_text: string; email: string; email_masked: string; word_count: number };
  session: Record<string, string | number | null> | null;
  events: { event_name: string; occurred_at: string; received_at: string; task_id: string | null; word_count: number | null }[];
  report: { created_at: string; expires_at: string; first_opened_at: string | null; last_opened_at: string | null; open_count: number; expired: boolean } | null;
  delivery: { status: string; provider: string | null; attempt_count: number; last_error: string | null; sent_at: string | null } | null;
  result: { corrections: number; byCategory: Record<string, number>; level: string | null; scores: unknown } | null;
};

const EMPTY_FILTERS = {
  from: "",
  to: "",
  locale: "",
  taskId: "",
  status: "",
  delivery: "",
  sessionStatus: "",
  mock: "",
};

type FilterForm = typeof EMPTY_FILTERS;

function queryOf(form: FilterForm): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(form)) if (value) params.set(key, value);
  return params.toString();
}

function stamp(value: string | null | undefined): string {
  return value ? value.replace("T", " ").slice(0, 19) : "—";
}

function percent(value: number | null): string {
  return value === null ? "—" : `${value}%`;
}

function taskLabel(id: string | null): string {
  if (!id) return "—";
  if (!WRITING_TASK_IDS.includes(id as (typeof WRITING_TASK_IDS)[number])) return id;
  const task = getWritingTask(id);
  return `${task.number} — ${task.title}`;
}

async function readJson<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as (T & { problems?: string[]; errorCode?: string }) | null;
  if (!response.ok || !payload) {
    throw new Error(payload?.problems?.join("; ") || payload?.errorCode || `erro ${response.status}`);
  }
  return payload;
}

export function WriterAnalyticsPanel() {
  const [form, setForm] = useState<FilterForm>(EMPTY_FILTERS);
  const [query, setQuery] = useState("");
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [funnel, setFunnel] = useState<FunnelStep[]>([]);
  const [breakdowns, setBreakdowns] = useState<Record<string, Row[]>>({});
  const [rows, setRows] = useState<SubmissionRow[]>([]);
  const [total, setTotal] = useState(0);
  const [abandonedMarked, setAbandonedMarked] = useState(0);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [erasing, setErasing] = useState(false);
  const [resending, setResending] = useState(false);
  const [eraseArmed, setEraseArmed] = useState(false);

  // No state is written before the await: this runs from the mount effect, and a synchronous
  // setState there would cascade a render for every filter change.
  const load = useCallback(async (search: string) => {
    try {
      const [overview, submissions] = await Promise.all([
        fetch(`/api/admin/writer/overview${search ? `?${search}` : ""}`).then((response) =>
          readJson<{ kpis: Kpis; funnel: FunnelStep[]; breakdowns: Record<string, Row[]>; abandonedMarked: number }>(response),
        ),
        fetch(`/api/admin/writer/submissions${search ? `?${search}` : ""}`).then((response) =>
          readJson<{ submissions: SubmissionRow[]; total: number }>(response),
        ),
      ]);
      setError("");
      setKpis(overview.kpis);
      setFunnel(overview.funnel);
      setBreakdowns(overview.breakdowns);
      setAbandonedMarked(overview.abandonedMarked);
      setRows(submissions.submissions);
      setTotal(submissions.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Não foi possível carregar o writer.");
    }
  }, []);

  useEffect(() => {
    // Fetching the window is the whole job of this panel; every other admin panel does the same.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(query);
  }, [query, load]);

  function apply(event: React.FormEvent) {
    event.preventDefault();
    setDetail(null);
    setDetailId(null);
    setQuery(queryOf(form));
  }

  function reset() {
    setForm(EMPTY_FILTERS);
    setQuery("");
  }

  async function openDetail(id: string) {
    setDetailId(id);
    setDetail(null);
    setEraseArmed(false);
    setNotice("");
    try {
      const payload = await fetch(`/api/admin/writer/submission/${id}`).then(readJson<Detail & { ok: boolean }>);
      setDetail(payload);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Não foi possível abrir o envio.");
    }
  }

  async function resend() {
    if (!detailId) return;
    setResending(true);
    setNotice("");
    try {
      const payload = await fetch("/api/admin/writer/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: detailId }),
      }).then((response) =>
        readJson<{ delivery: string; errorCode: string | null; recipient: string; expiresDays: number }>(response),
      );
      setNotice(
        payload.delivery === "sent"
          ? `Link reenviado para ${payload.recipient}; válido por ${payload.expiresDays} dias.`
          : `Não enviado (${payload.errorCode ?? payload.delivery}). O link anterior continua funcionando.`,
      );
    } catch (err: unknown) {
      setNotice(err instanceof Error ? err.message : "Falha no reenvio.");
    } finally {
      setResending(false);
    }
  }

  async function erase() {
    if (!detailId) return;
    if (!eraseArmed) {
      setEraseArmed(true);
      return;
    }
    setErasing(true);
    try {
      const payload = await fetch("/api/admin/writer/erase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: detailId }),
      }).then((response) => readJson<{ removed: Record<string, number> }>(response));
      setNotice("");
      setDetail(null);
      setDetailId(null);
      setEraseArmed(false);
      await load(query);
      setNotice(`Apagado: ${payload.removed.submission} envio, ${payload.removed.session} sessão, ${payload.removed.events} eventos, ${payload.removed.emails} e-mail(s).`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Não foi possível apagar.");
    } finally {
      setErasing(false);
    }
  }

  const kpiCards: { label: string; value: string; hint?: string }[] = kpis
    ? [
        { label: "Visitantes únicos", value: String(kpis.uniqueVisitors) },
        { label: "Sessões", value: String(kpis.sessions) },
        { label: "Começaram a escrever", value: String(kpis.started) },
        { label: "Passaram de 40 palavras", value: String(kpis.emailGate) },
        { label: "Passaram de 120 palavras", value: String(kpis.examMin) },
        { label: "Tentativas de envio", value: String(kpis.submitAttempts) },
        { label: "Análises concluídas", value: String(kpis.analyzedOk) },
        { label: "Análises com falha", value: String(kpis.analyzedFailed) },
        { label: "E-mails enviados", value: String(kpis.emailsSent) },
        { label: "Falhas de e-mail", value: String(kpis.emailFailures) },
        { label: "Relatórios abertos", value: String(kpis.reportsOpened) },
        { label: "Reenvios", value: String(kpis.resubmissions) },
        { label: "Abandonadas", value: String(kpis.abandoned) },
        { label: "Aberto → escreveu", value: percent(kpis.conversionOpenedToStarted) },
        { label: "Escreveu → enviou", value: percent(kpis.conversionStartedToSubmitted) },
        { label: "Enviou → analisado", value: percent(kpis.conversionSubmittedToCompleted) },
        {
          label: "Tempo ativo (mediana)",
          value: formatDuration(kpis.medianActiveMs),
          hint: "conta a partir da primeira letra, não da abertura da página",
        },
        { label: "Tempo ativo (p75)", value: formatDuration(kpis.p75ActiveMs) },
        { label: "Tempo total (mediana)", value: formatDuration(kpis.medianElapsedMs) },
        { label: "Palavras por minuto (mediana)", value: kpis.medianWordsPerMinute === null ? "—" : String(kpis.medianWordsPerMinute) },
      ]
    : [];

  return (
    <div className="space-y-6">
      <form className="surface-card p-4" onSubmit={apply}>
        <h2 className="font-semibold text-teal">Analítica do writer</h2>
        <p className="mt-1 text-sm text-muted">
          Quem abriu Escrever, até onde foi, quanto escreveu e o que aconteceu com o e-mail. Nada aqui vem do GA4.
        </p>

        <div className="writer-filters mt-4">
          <label className="writer-field">
            De
            <input type="date" className="admin-input" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
          </label>
          <label className="writer-field">
            Até
            <input type="date" className="admin-input" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
          </label>
          <label className="writer-field">
            Locale
            <select className="admin-input" value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value })}>
              <option value="">todos</option>
              <option value="pt-br">pt-br</option>
              <option value="en">en</option>
              <option value="ru">ru</option>
            </select>
          </label>
          <label className="writer-field">
            Tarefa
            <select className="admin-input" value={form.taskId} onChange={(e) => setForm({ ...form, taskId: e.target.value })}>
              <option value="">todas</option>
              {WRITING_TASK_IDS.map((id) => (
                <option key={id} value={id}>
                  {taskLabel(id)}
                </option>
              ))}
            </select>
          </label>
          <label className="writer-field">
            Status do envio
            <select className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="">todos</option>
              {SUBMISSION_STATUS_FILTER.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="writer-field">
            Entrega
            <select className="admin-input" value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })}>
              <option value="">todas</option>
              {DELIVERY_STATUS_FILTER.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              <option value="none">sem registro</option>
            </select>
          </label>
          <label className="writer-field">
            Sessão
            <select className="admin-input" value={form.sessionStatus} onChange={(e) => setForm({ ...form, sessionStatus: e.target.value })}>
              <option value="">todas</option>
              {SESSION_STATUS_FILTER.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="writer-field">
            Motor
            <select className="admin-input" value={form.mock} onChange={(e) => setForm({ ...form, mock: e.target.value })}>
              <option value="">todos</option>
              <option value="real">real (IA)</option>
              <option value="mock">mock</option>
            </select>
          </label>
        </div>

        <p className="mt-3 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-secondary">
            Aplicar filtros
          </button>
          <button type="button" className="btn-secondary" onClick={reset}>
            Limpar
          </button>
          <a className="text-teal hover:underline" href={`/api/admin/writer/export?kind=submissions${query ? `&${query}` : ""}`}>
            Baixar envios (CSV)
          </a>
          <a className="text-teal hover:underline" href={`/api/admin/writer/export?kind=funnel${query ? `&${query}` : ""}`}>
            Baixar funil por dia (CSV)
          </a>
        </p>
        {error ? <p className="admin-msg admin-msg--error mt-3">{error}</p> : null}
        {notice ? <p className="admin-msg mt-3">{notice}</p> : null}
        {kpis === null && !error ? <p className="admin-msg mt-3">Carregando dados do writer…</p> : null}
      </form>

      {kpis ? (
        <div className="writer-kpis">
          {kpiCards.map((card) => (
            <div key={card.label} className="surface-card writer-kpi p-4">
              <p className="text-sm text-muted">{card.label}</p>
              <p className="writer-kpi__value text-2xl font-bold text-teal">{card.value}</p>
              {card.hint ? <p className="text-xs text-muted">{card.hint}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="surface-card p-4">
        <h3 className="font-semibold text-teal">Funil</h3>
        <table className="admin-table writer-funnel mt-3">
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Sessões</th>
              <th>Da anterior</th>
              <th>Da abertura</th>
            </tr>
          </thead>
          <tbody>
            {funnel.map((step) => (
              <tr key={step.key}>
                <td>{step.label}</td>
                <td>
                  <span className="writer-funnel-meter">
                    <span className="writer-funnel-track" aria-hidden>
                      <span className="writer-funnel-fill" style={{ width: `${Math.max(step.fromOpened ?? 0, step.count > 0 ? 4 : 0)}%` }} />
                    </span>
                    {step.count}
                  </span>
                </td>
                <td>{percent(step.fromPrev)}</td>
                <td>{percent(step.fromOpened)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {abandonedMarked > 0 ? (
          <p className="mt-2 text-xs text-muted">
            {abandonedMarked} sessão(ões) sem atividade há mais de 30 minutos foram marcadas como abandonadas nesta leitura.
          </p>
        ) : null}
      </div>

      <div className="writer-splits">
        <BreakdownTable title="Por dia" rows={breakdowns.byDay ?? []} />
        <BreakdownTable title="Por locale" rows={breakdowns.byLocale ?? []} />
        <BreakdownTable title="Por tarefa" rows={breakdowns.byTask ?? []} />
        <BreakdownTable title="Status de sessão" rows={breakdowns.bySessionStatus ?? []} />
        <BreakdownTable title="Erros de envio" rows={breakdowns.byErrorCategory ?? []} />
        <BreakdownTable title="Motor / modelo" rows={breakdowns.byModel ?? []} />
        <BreakdownTable title="Referrer" rows={breakdowns.byReferrer ?? []} />
        <BreakdownTable title="UTM" rows={breakdowns.byUtm ?? []} />
      </div>

      <div className="surface-card p-4">
        <h3 className="font-semibold text-teal">
          Envios <span className="text-sm text-muted">({rows.length} de {total})</span>
        </h3>
        <div className="admin-table-wrap">
          <table className="admin-table writer-sends mt-3">
            <thead>
              <tr>
                <th>Quando</th>
                <th>Locale</th>
                <th>Tarefa</th>
                <th>Palavras</th>
                <th>Status</th>
                <th>Nível</th>
                <th>Motor</th>
                <th>Tempo ativo</th>
                <th>E-mail</th>
                <th>Entrega</th>
                <th>Aberturas</th>
                <th>Arquivo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <button type="button" className="text-left text-teal hover:underline" onClick={() => void openDetail(row.id)}>
                      {stamp(row.created_at)}
                    </button>
                  </td>
                  <td>{row.locale}</td>
                  <td>{taskLabel(row.task_id)}</td>
                  <td>{row.word_count}</td>
                  <td>{row.status}</td>
                  <td>{row.celpe_level ?? "—"}</td>
                  <td>
                    {row.provider ?? "—"}
                    {row.mock ? " (mock)" : ""}
                  </td>
                  <td>{formatDuration(row.active_ms)}</td>
                  <td>{row.email_masked}</td>
                  <td>
                    {row.delivery_status ?? "—"}
                    {row.delivery_attempts ? ` ×${row.delivery_attempts}` : ""}
                  </td>
                  <td>{row.report_open_count ?? 0}</td>
                  <td>{row.archive_status === "ok" ? "ok" : (row.archive_status ?? "—")}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-muted">
                    Nenhum envio neste período.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {detailId ? (
        <div className="surface-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-teal">Envio {detailId}</h3>
            <p className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => void resend()} disabled={resending || erasing}>
                {resending ? "Reenviando…" : "Reenviar link por e-mail"}
              </button>
              <button
                type="button"
                className={`btn-secondary ${eraseArmed ? "admin-link-danger" : ""}`}
                onClick={() => void erase()}
                disabled={resending || erasing}
                aria-live="polite"
              >
                {erasing ? "Apagando…" : eraseArmed ? "Confirmar: apagar tudo" : "Apagar dados deste envio"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setDetailId(null);
                  setDetail(null);
                }}
              >
                Fechar
              </button>
            </p>
          </div>
          {!detail ? <p className="mt-2 text-sm text-muted">Carregando…</p> : null}
          {detail ? (
            <div className="mt-3 space-y-4">
              <dl className="admin-plan">
                <div>
                  <dt>Criado</dt>
                  <dd>{stamp(String(detail.submission.created_at))}</dd>
                </div>
                <div>
                  <dt>Concluído</dt>
                  <dd>{stamp(detail.submission.completed_at as string | null)}</dd>
                </div>
                <div>
                  <dt>Palavras</dt>
                  <dd>{detail.submission.word_count}</dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>
                    {detail.submission.email}{" "}
                    <span className="text-muted">({detail.submission.email_masked})</span>
                  </dd>
                </div>
                <div>
                  <dt>Correções</dt>
                  <dd>{detail.result ? detail.result.corrections : "—"}</dd>
                </div>
                <div>
                  <dt>Arquivo</dt>
                  <dd>
                    <code>{String(detail.submission.archive_path ?? "—")}</code>
                  </dd>
                </div>
              </dl>

              {detail.session ? (
                <p className="text-sm text-muted">
                  Sessão: aberta {stamp(String(detail.session.opened_at))} · primeira letra{" "}
                  {stamp(detail.session.first_input_at as string | null)} · enviado{" "}
                  {stamp(detail.session.submitted_at as string | null)} · ativo{" "}
                  {formatDuration(detail.session.active_ms as number)} · decorrido{" "}
                  {formatDuration(detail.session.elapsed_ms as number)} · status {String(detail.session.status)}
                </p>
              ) : (
                <p className="text-sm text-muted">Este envio não tem sessão ligada (chegou direto pela API).</p>
              )}

              {detail.report ? (
                <p className="text-sm text-muted">
                  Link do relatório: criado {stamp(detail.report.created_at)} · expira {stamp(detail.report.expires_at)}
                  {detail.report.expired ? " (expirado)" : ""} · aberto {detail.report.open_count}× · última abertura{" "}
                  {stamp(detail.report.last_opened_at)}
                </p>
              ) : null}

              <p className="text-sm text-muted">
                Entrega: {detail.delivery ? `${detail.delivery.status} · tentativas ${detail.delivery.attempt_count}${detail.delivery.last_error ? ` · ${detail.delivery.last_error}` : ""}` : "sem registro"}
              </p>

              {detail.result && Object.keys(detail.result.byCategory).length ? (
                <p className="text-sm text-muted">
                  Categorias:{" "}
                  {Object.entries(detail.result.byCategory)
                    .map(([category, count]) => `${category} ×${count}`)
                    .join(" · ")}
                </p>
              ) : null}

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Evento</th>
                      <th>Quando (cliente)</th>
                      <th>Recebido</th>
                      <th>Tarefa</th>
                      <th>Palavras</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.events.map((event, index) => (
                      <tr key={`${event.event_name}-${index}`}>
                        <td>{event.event_name}</td>
                        <td>{stamp(event.occurred_at)}</td>
                        <td>{stamp(event.received_at)}</td>
                        <td>{taskLabel(event.task_id)}</td>
                        <td>{event.word_count ?? "—"}</td>
                      </tr>
                    ))}
                    {detail.events.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-muted">
                          Nenhum evento de cliente gravado.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              <details>
                <summary className="text-sm text-muted">Texto enviado</summary>
                <pre className="admin-pre mt-2">{detail.submission.essay_text}</pre>
              </details>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const COLUMN_LABELS: Record<string, string> = {
  day: "Dia",
  sessions: "Sessões",
  visitors: "Visitantes",
  reached_submit: "Enviaram",
  locale: "Locale",
  task: "Tarefa",
  referrer: "Origem",
  utm_source: "Source",
  utm_medium: "Medium",
  utm_campaign: "Campaign",
  status: "Status",
  error_code: "Erro",
  c: "Envios",
  provider: "Motor",
  model: "Modelo",
  mock_runs: "Mock",
  real_runs: "Real",
  runs: "Total",
};

const NUMERIC_COLUMNS = new Set(["sessions", "visitors", "reached_submit", "c", "mock_runs", "real_runs", "runs"]);

function cellText(column: string, value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  if (column === "task") return taskLabel(String(value));
  return String(value);
}

function BreakdownTable({ title, rows }: { title: string; rows: Row[] }) {
  const columns = rows.length ? Object.keys(rows[0]) : [];
  return (
    <div className="surface-card p-4">
      <h3 className="font-semibold text-teal">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Sem dados neste período.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table mt-2">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} className={NUMERIC_COLUMNS.has(column) ? "is-num" : undefined}>
                    {COLUMN_LABELS[column] ?? column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column} className={NUMERIC_COLUMNS.has(column) ? "is-num" : undefined} title={cellText(column, row[column])}>
                      {cellText(column, row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
