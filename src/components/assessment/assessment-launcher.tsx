"use client";

import { useCallback, useState } from "react";
import { AssessmentSessionModal } from "./assessment-session-modal";

export function AssessmentLauncher() {
  const [modalOpen, setModalOpen] = useState(false);
  const [seenSessionIds, setSeenSessionIds] = useState<string[]>([]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const markSeen = useCallback((sessionId: string) => {
    setSeenSessionIds((prev) => (prev.includes(sessionId) ? prev : [...prev, sessionId]));
  }, []);

  return (
    <>
      <section className="avaliacao-hero">
        <p className="eyebrow">Autoavaliação</p>
        <h1 className="page-title page-title-display mt-3">Avaliação</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Sessão de leitura com três textos jornalísticos autênticos, palavras clicáveis e questões
          de compreensão. Resultado em faixas CEFR — sem cadastro.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="avaliacao-tests-heading">
        <h2 id="avaliacao-tests-heading" className="section-title">
          Testes disponíveis
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
          <article className="surface-card flex flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-[var(--site-primary-highlight)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal">
                Leitura
              </span>
              <span className="text-xs text-muted">3 textos · ~15 min</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-charcoal">Teste de leitura</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              Três reportagens de dificuldade crescente (A2→C1). Marque palavras desconhecidas,
              responda às questões e receba faixa estimada de leitura e vocabulário.
            </p>
            <button type="button" className="btn-primary mt-6 w-full sm:w-auto" onClick={openModal}>
              Fazer teste
            </button>
          </article>
        </div>
      </section>

      <AssessmentSessionModal
        open={modalOpen}
        excludeSessionIds={seenSessionIds}
        onClose={closeModal}
        onSessionSeen={markSeen}
      />
    </>
  );
}
