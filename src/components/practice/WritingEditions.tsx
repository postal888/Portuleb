"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type EditionTask = {
  id: string;
  href: string;
  number: string;
  title: string;
  genre: string;
  kind: string;
};

export type EditionGroup = {
  cycle: string;
  tasks: EditionTask[];
};

function editionId(cycle: string) {
  return `edicao-${cycle.replace(/[^\w]+/g, "-")}`;
}

function Check({ done }: { done: boolean }) {
  return (
    <span className={`escrita-mark${done ? " is-done" : ""}`} title={done ? "Já escrito" : undefined}>
      {done ? (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="8.25" />
          <path d="M6.15 10.2 8.55 12.6 13.85 7.3" />
        </svg>
      ) : null}
      {done ? <span className="escrita-mark-label">Já escrito</span> : null}
    </span>
  );
}

export function WritingEditions({ groups }: { groups: EditionGroup[] }) {
  const [written, setWritten] = useState<Set<string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer/cabinet/written")
      .then((response) => response.json())
      .then((payload: { signedIn?: boolean; taskIds?: string[] }) => {
        if (cancelled || !payload.signedIn) return;
        setWritten(new Set(payload.taskIds ?? []));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const signedIn = written !== null;

  return (
    <div className="escrita-editions">
      {groups.map((group) => (
        <section key={group.cycle} className="escrita-edition" aria-labelledby={editionId(group.cycle)}>
          <h2 id={editionId(group.cycle)}>{group.cycle}</h2>
          <ul className={`escrita-tasks${signedIn ? " is-signed" : ""}`}>
            {group.tasks.map((task) => (
              <li key={task.id}>
                <Link href={task.href}>
                  <span className="num">{task.number.replace("Tarefa ", "T")}</span>
                  <strong>{task.title}</strong>
                  <em>
                    {task.genre} · {task.kind}
                  </em>
                  {signedIn ? <Check done={written.has(task.id)} /> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
