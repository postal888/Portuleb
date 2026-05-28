import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MaterialViewer } from "@/components/archive/MaterialViewer";
import type { session2026_1 } from "@/content/archive/2026-1";

type Session = typeof session2026_1;

function badgeClass(variant: "default" | "neutral" | "missing") {
  if (variant === "neutral") return "archive-badge neutral";
  if (variant === "missing") return "archive-badge missing";
  return "archive-badge";
}

export function ArchiveSessionView({ session }: { session: Session }) {
  return (
    <div className="archive">
      <div className="archive-wrap">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/pt-br" },
            { label: "Provas Anteriores", href: "/pt-br/provas-anteriores" },
            { label: session.title },
          ]}
        />

        <section className="archive-hero">
          <div className="archive-eyebrow">{session.eyebrow}</div>
          <div className="archive-hero-grid">
            <article className="archive-hero-card">
              <div className="archive-kicker">Sessão do acervo</div>
              <h1>{session.title}</h1>
              <p className="archive-lead">{session.lead}</p>
              <div className="archive-cta-row">
                <a className="archive-btn archive-btn-primary" href="#materiais">
                  Ver materiais
                </a>
                <a className="archive-btn archive-btn-secondary" href="#parte-escrita">
                  Ver estrutura da prova
                </a>
              </div>
            </article>
            <aside className="archive-meta-card">
              <div>
                <div className="archive-meta-label">Aplicação</div>
                <div className="archive-meta-value">{session.application}</div>
              </div>
              <div>
                <div className="archive-meta-label">Resultado</div>
                <div className="archive-meta-value">{session.resultDate}</div>
              </div>
              <div className="archive-stats">
                <div className="archive-stat">
                  <strong>{session.stats.available}</strong>
                  <span>materiais no acervo</span>
                </div>
                <div className="archive-stat">
                  <strong>{session.stats.missing}</strong>
                  <span>{session.stats.missingLabel}</span>
                </div>
              </div>
              <p className="archive-footer-note">
                O edital define datas e estrutura; o caderno reúne as quatro tarefas da parte escrita;
                roteiros e elementos provocadores cobrem a parte oral.
              </p>
            </aside>
          </div>
        </section>

        <section className="archive-section" id="materiais">
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">Visão geral</div>
                <h2 className="archive-section-title">Materiais da sessão</h2>
              </div>
              <p className="archive-section-copy">
                O acervo organizado por função: prova escrita, áudio, parte oral e edital — sem
                expor apenas nomes de arquivo soltos.
              </p>
            </div>
            <div className="archive-materials-grid">
              {session.materials.map((m) => (
                <article
                  key={m.id}
                  className={`archive-material-card${m.dimmed ? " dimmed" : ""}`}
                >
                  <div className="archive-material-top">
                    {m.badge ? (
                      <span className={badgeClass(m.badgeVariant ?? "neutral")}>{m.badge}</span>
                    ) : (
                      <span />
                    )}
                    <div className="archive-icon">{m.icon}</div>
                  </div>
                  <div>
                    <h3>{m.title}</h3>
                    <p className="archive-muted">{m.description}</p>
                  </div>
                  <div className="archive-meta-line">
                    <span>{m.category}</span>
                    <a href={m.href}>{m.action}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id="visualizar">
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">Visualizar no site</div>
                <h2 className="archive-section-title">PDFs, vídeo e áudio</h2>
              </div>
              <p className="archive-section-copy">
                Arquivos servidos do acervo local. PDFs abrem no leitor embutido; vídeo e áudio com
                controles de reprodução.
              </p>
            </div>
            <div className="archive-viewers">
              {session.materials
                .filter((m) => m.materialId !== "caderno")
                .map((m) => (
                  <MaterialViewer
                    key={m.materialId}
                    sessionSlug={session.slug}
                    materialId={m.materialId}
                    kind={m.kind}
                    title={m.title}
                  />
                ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id="parte-escrita">
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">Parte escrita</div>
                <h2 className="archive-section-title">Caderno de questões e tarefas</h2>
              </div>
              <p className="archive-section-copy">
                Prova escrita de 3 horas com quatro tarefas integradas. O caderno completo está
                abaixo; cada tarefa indica o insumo correspondente.
              </p>
            </div>

            <MaterialViewer
              sessionSlug={session.slug}
              materialId="caderno"
              kind="pdf"
              title="Caderno de questões — prova escrita completa"
            />

            <h3 className="archive-subsection-title">Estrutura das 4 tarefas</h3>
            <div className="archive-task-list">
              {session.tasks.map((t) => (
                <article key={t.number} className="archive-task-card">
                  <div className="archive-task-no">{t.number}</div>
                  <div>
                    <h3>{t.title}</h3>
                    <p className="archive-muted">{t.description}</p>
                  </div>
                  <div className="archive-task-aside">
                    <span>{t.input}</span>
                    {t.materialHref && (
                      <a href={t.materialHref} className="archive-task-link">
                        {t.materialAction}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id="parte-oral">
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">Parte oral</div>
                <h2 className="archive-section-title">Interação face a face</h2>
              </div>
              <p className="archive-section-copy">
                Interação presencial de 20 minutos em duas etapas. Roteiros e elementos
                provocadores em bloco separado da prova escrita.
              </p>
            </div>
            <div className="archive-oral-grid">
              <article className="archive-oral-card">
                <div className="archive-kicker">Roteiros</div>
                <h3>Guia da conversa</h3>
                <p className="archive-muted">
                  Como a interação deve ser conduzida e como as perguntas funcionam como apoio.
                </p>
                <div className="archive-topics">
                  {session.oralTopics.roteiros.map((t) => (
                    <span key={t} className="archive-topic">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
              <article className="archive-oral-card">
                <div className="archive-kicker">Temas</div>
                <h3>Exemplos de elementos provocadores</h3>
                <p className="archive-muted">
                  Alguns temas da edição para dar densidade visual ao acervo.
                </p>
                <div className="archive-topics">
                  {session.oralTopics.temas.map((t) => (
                    <span key={t} className="archive-topic">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="archive-section">
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">FAQ da sessão</div>
                <h2 className="archive-section-title">Perguntas que a página responde</h2>
              </div>
              <p className="archive-section-copy">
                Como usar os materiais e onde estão os limites deste conjunto.
              </p>
            </div>
            <div className="archive-faq-grid">
              {session.faq.map((item) => (
                <article key={item.question} className="archive-faq-card">
                  <h3>{item.question}</h3>
                  <p className="archive-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
