"use client";

import { useEffect, useState } from "react";

type EmailRow = {
  id: number;
  email: string;
  submissions: number;
  firstSeen: string;
  lastSeen: string;
};

type ArchiveRow = {
  file: string;
  savedAt: string;
  email: string;
  taskId: string | null;
  level: string | null;
  words: number;
};

export function WritingEmailsPanel() {
  const [rows, setRows] = useState<EmailRow[]>([]);
  const [archives, setArchives] = useState<ArchiveRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/writing-emails")
      .then(async (response) => {
        const payload = (await response.json()) as {
          emails?: EmailRow[];
          archives?: ArchiveRow[];
          error?: string;
        };
        if (!response.ok) throw new Error(payload.error || "Não foi possível carregar os e-mails.");
        if (!cancelled) {
          setRows(payload.emails ?? []);
          setArchives(payload.archives ?? []);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Erro ao carregar.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="surface-card p-4">
      <h2 className="font-semibold text-teal">E-mails da escrita</h2>
      <p className="mt-1 text-sm text-muted">
        Endereços deixados em Escrever para receber a avaliação. {rows.length} no total.
      </p>
      {error ? <p className="admin-msg admin-msg--error mt-3">{error}</p> : null}
      {rows.length === 0 && !error ? (
        <p className="mt-3 text-sm text-muted">Nenhum e-mail ainda.</p>
      ) : null}
      {rows.length > 0 ? (
        <table className="admin-table mt-3">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Envios</th>
              <th>Primeiro</th>
              <th>Último</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.email}</td>
                <td>{row.submissions}</td>
                <td>{row.firstSeen}</td>
                <td>{row.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {archives.length > 0 ? (
        <>
          <h3 className="mt-6 font-semibold text-teal">Textos salvos</h3>
          <p className="mt-1 text-sm text-muted">
            Cada envio vira um arquivo em <code>data/writing/</code> com o texto e o relatório.
          </p>
          <table className="admin-table mt-3">
            <thead>
              <tr>
                <th>Quando</th>
                <th>E-mail</th>
                <th>Tarefa</th>
                <th>Nível</th>
                <th>Palavras</th>
                <th>Arquivo</th>
              </tr>
            </thead>
            <tbody>
              {archives.map((row) => (
                <tr key={row.file}>
                  <td>{row.savedAt.replace("T", " ").slice(0, 19)}</td>
                  <td>{row.email || "—"}</td>
                  <td>{row.taskId ?? "—"}</td>
                  <td>{row.level ?? "—"}</td>
                  <td>{row.words}</td>
                  <td>
                    <code>{row.file}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
}
