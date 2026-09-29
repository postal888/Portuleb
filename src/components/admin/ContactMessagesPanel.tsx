"use client";

import { useCallback, useEffect, useState } from "react";

type MessageRow = {
  id: number;
  name: string | null;
  email: string;
  message: string;
  locale: string | null;
  status: string;
  createdAt: string;
};

export function ContactMessagesPanel() {
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const load = useCallback(() => {
    return fetch("/api/admin/contact-messages")
      .then(async (response) => {
        const payload = (await response.json()) as {
          messages?: MessageRow[];
          unread?: number;
          error?: string;
        };
        if (!response.ok) throw new Error(payload.error || "Não foi possível carregar as mensagens.");
        setRows(payload.messages ?? []);
        setUnread(payload.unread ?? 0);
        setError("");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erro ao carregar.");
      });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function markRead(id: number) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: "read" } : row)));
    setUnread((count) => Math.max(0, count - 1));
    try {
      await fetch("/api/admin/contact-messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      void load();
    }
  }

  function toggle(row: MessageRow) {
    const next = openId === row.id ? null : row.id;
    setOpenId(next);
    if (next && row.status === "new") void markRead(row.id);
  }

  return (
    <div className="surface-card p-4">
      <h2 className="font-semibold text-teal">Mensagens de contato</h2>
      <p className="mt-1 text-sm text-muted">
        Formulário de Contato. {rows.length} no total
        {unread > 0 ? ` · ${unread} novas` : ""}.
      </p>
      {error ? <p className="admin-msg admin-msg--error mt-3">{error}</p> : null}
      {rows.length === 0 && !error ? (
        <p className="mt-3 text-sm text-muted">Nenhuma mensagem ainda.</p>
      ) : null}
      {rows.length > 0 ? (
        <table className="admin-table mt-3">
          <thead>
            <tr>
              <th>Quando</th>
              <th>Status</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idioma</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const open = openId === row.id;
              return (
                <tr key={row.id} className={row.status === "new" ? "font-semibold" : undefined}>
                  <td>{row.createdAt.replace("T", " ").slice(0, 19)}</td>
                  <td>{row.status === "new" ? "Nova" : "Lida"}</td>
                  <td>{row.name || "—"}</td>
                  <td>
                    <a href={`mailto:${row.email}`} className="text-teal hover:underline">
                      {row.email}
                    </a>
                  </td>
                  <td>{row.locale || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className="text-left text-teal hover:underline"
                      onClick={() => toggle(row)}
                    >
                      {open ? "Ocultar" : row.message.slice(0, 72) + (row.message.length > 72 ? "…" : "")}
                    </button>
                    {open ? (
                      <p className="mt-2 whitespace-pre-wrap text-sm font-normal text-muted">{row.message}</p>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
