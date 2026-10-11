import Link from "next/link";
import { CopyModelButton } from "@/components/practice/CopyModelButton";
import { writingModelos, type ModeloTaskRef } from "@/content/writing/modelos";
import { WRITING_CATALOG_HREF, findWritingTask, writingTaskHref } from "@/content/writing/tasks";
import { localizedPath } from "@/lib/i18n-links";

function TaskLink({ item }: { item: ModeloTaskRef }) {
  const task = findWritingTask(item.cycle, item.number);
  const label = `${item.cycle} · ${item.number.replace("Tarefa ", "T")}`;
  const body = (
    <>
      <small>
        {label}
        {item.genre ? ` · ${item.genre}` : ""}
      </small>
      {item.title}
    </>
  );
  if (!task) return <span>{body}</span>;
  return <Link href={writingTaskHref(task.id)}>{body}</Link>;
}

export function WritingModelos() {
  return (
    <div className="practice-hub escrita-nav">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath("pt-br", "home")}>Início</Link>
          <span aria-hidden> / </span>
          <Link href={localizedPath("pt-br", "practice")}>Prática</Link>
          <span aria-hidden> / </span>
          <Link href={WRITING_CATALOG_HREF}>Escrita</Link>
          <span aria-hidden> / </span>
          <span>Modelos</span>
        </nav>

        <header>
          <p className="practice-eyebrow">Parte escrita</p>
          <h1>{writingModelos.title}</h1>
          <p className="escrita-lead">{writingModelos.intro}</p>
        </header>

        <section className="escrita-block">
          <h2>{writingModelos.questionsTitle}</h2>
          <ol className="escrita-questions">
            {writingModelos.questions.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                {item.a}
              </li>
            ))}
          </ol>
          <div className="escrita-model-grid">
            {writingModelos.types.map((type) => (
              <a key={type.id} className="escrita-model-card" href={`#tipo-${type.id}`}>
                <b>{type.id}</b>
                <span>{type.title}</span>
                <i>{type.where}</i>
              </a>
            ))}
          </div>
        </section>

        {writingModelos.types.map((type) => {
          const example = findWritingTask(type.exampleCycle, type.exampleNumber);
          return (
            <section key={type.id} className="escrita-tipo" id={`tipo-${type.id}`}>
              <h2>
                Tipo {type.id}. {type.title}
              </h2>
              <p className="escrita-kicker">{type.where}</p>
              <p>{type.summary}</p>
              <dl className="escrita-meta">
                <dt>Gêneros</dt>
                <dd>{type.genres}</dd>
                <dt>No enunciado</dt>
                <dd>{type.promptWords}</dd>
              </dl>

              <h3>Modelo</h3>
              <div className="escrita-sheet">
                {type.structure.map((row) => (
                  <div key={row.label} className="escrita-row">
                    <b>{row.label}</b>
                    <p>{row.text}</p>
                  </div>
                ))}
              </div>
              <p className="escrita-kicker">{type.structureNote}</p>
              <CopyModelButton text={type.structure.map((row) => row.text).join("\n\n")} />

              <h3>Exemplo resolvido</h3>
              <p>
                {example ? (
                  <Link href={writingTaskHref(example.id)}>{type.exampleLabel}</Link>
                ) : (
                  type.exampleLabel
                )}
              </p>
              <p className="escrita-prompt">{type.examplePrompt}</p>
              <div className="escrita-sheet">
                {type.exampleRows.map((row) => (
                  <div key={row.label} className="escrita-row">
                    <b>{row.label}</b>
                    <p>{row.text}</p>
                  </div>
                ))}
              </div>
              <p className="escrita-kicker">{type.exampleNote}</p>

              <h3>Frases úteis</h3>
              <div className="escrita-phrases">
                {type.phrases.map((group) => (
                  <section key={group.title}>
                    <h4>{group.title}</h4>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <h3>Como muda conforme o gênero</h3>
              <div className="escrita-sheet">
                {type.variants.map((row) => (
                  <div key={row.label} className="escrita-row">
                    <b>{row.label}</b>
                    <p>{row.text}</p>
                  </div>
                ))}
              </div>

              <h3>Antes de entregar</h3>
              <ul className="escrita-check">
                {type.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <details className="escrita-details">
                <summary>Tarefas deste tipo para treinar ({type.tasks.length})</summary>
                <ul className="escrita-links">
                  {type.tasks.map((item) => (
                    <li key={`${item.cycle}-${item.number}-${item.title}`}>
                      <TaskLink item={item} />
                    </li>
                  ))}
                </ul>
              </details>
            </section>
          );
        })}

        <p className="escrita-note">{writingModelos.other}</p>
        <p className="escrita-note">{writingModelos.note}</p>
      </div>
    </div>
  );
}
