import type { Locale } from "@/i18n/locales";
import { PracticeAreaShell } from "./PracticeAreaShell";

type Props = {
  locale: Locale;
  title: string;
  kicker: string;
  lead: string;
};

export function PracticePlaceholderView({ locale, title, kicker, lead }: Props) {
  const soon =
    locale === "en"
      ? "Materials and concrete tasks will be added here soon."
      : locale === "ru"
        ? "Материалы и задания будут добавлены здесь позже."
        : "Materiais e tarefas concretas serão adicionados em breve.";

  return (
    <PracticeAreaShell locale={locale} title={title} kicker={kicker} lead={lead}>
      <section className="practice-section">
        <article className="practice-card practice-panel">
          <p className="practice-muted">{soon}</p>
        </article>
      </section>
    </PracticeAreaShell>
  );
}
