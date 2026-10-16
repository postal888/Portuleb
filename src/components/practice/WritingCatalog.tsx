import Link from "next/link";
import {
  WRITING_MODELOS_HREF,
  writingTaskHref,
  writingTasksByCycle,
  type WritingTask,
} from "@/content/writing/tasks";
import { writingModelos } from "@/content/writing/modelos";
import { localizedPath } from "@/lib/i18n-links";
import { WritingEditions } from "./WritingEditions";

function insumoKind(task: WritingTask): string {
  if (task.sourceMedia?.kind === "video") return "vídeo";
  if (task.sourceMedia?.kind === "audio") return "áudio";
  return "texto";
}

export function WritingCatalog() {
  const groups = writingTasksByCycle();

  return (
    <div className="practice-hub escrita-nav">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath("pt-br", "home")}>Início</Link>
          <span aria-hidden> / </span>
          <Link href={localizedPath("pt-br", "practice")}>Prática</Link>
          <span aria-hidden> / </span>
          <span>Escrita</span>
        </nav>

        <header>
          <p className="practice-eyebrow">Parte escrita</p>
          <h1>Tarefas por edição</h1>
          <p className="escrita-lead">{writingModelos.intro}</p>
        </header>

        <section className="escrita-block" aria-labelledby="escrita-como">
          <h2 id="escrita-como">{writingModelos.questionsTitle}</h2>
          <ol className="escrita-questions">
            {writingModelos.questions.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                {item.a}
              </li>
            ))}
          </ol>
        </section>

        <section className="escrita-block" aria-labelledby="escrita-modelos">
          <h2 id="escrita-modelos">Modelos</h2>
          <p className="escrita-lead">
            Quatro situações cobrem a maior parte das tarefas. Abra o modelo antes de escrever.
          </p>
          <div className="escrita-model-grid">
            {writingModelos.types.map((type) => (
              <Link key={type.id} className="escrita-model-card" href={`${WRITING_MODELOS_HREF}#tipo-${type.id}`}>
                <b>{type.id}</b>
                <span>{type.title}</span>
                <i>{type.where}</i>
              </Link>
            ))}
          </div>
        </section>

        <WritingEditions
          groups={groups.map((group) => ({
            cycle: group.cycle,
            tasks: group.tasks.map((task) => ({
              id: task.id,
              href: writingTaskHref(task.id),
              number: task.number,
              title: task.title,
              genre: task.genre,
              kind: insumoKind(task),
            })),
          }))}
        />
        <p className="escrita-note">{writingModelos.note}</p>
      </div>
    </div>
  );
}
