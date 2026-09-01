import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

const copy: Record<Locale, { title: string; lead: string; home: string }> = {
  "pt-br": {
    title: "Página não encontrada",
    lead: "O endereço não existe ou foi movido. Volte ao início ou use o menu.",
    home: "Ir para o início",
  },
  en: {
    title: "Page not found",
    lead: "This address does not exist or has moved. Go home or use the menu.",
    home: "Go to home",
  },
  ru: {
    title: "Страница не найдена",
    lead: "Такого адреса нет или он был перемещён. Вернитесь на главную или воспользуйтесь меню.",
    home: "На главную",
  },
};

export function LocaleNotFound({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const text = copy[locale];

  return (
    <div className="surface-card surface-card-lift mx-auto max-w-lg p-8 text-center">
      <p className="text-6xl font-bold text-teal/30" aria-hidden>
        404
      </p>
      <h1 className="page-title mt-4">{text.title}</h1>
      <p className="mt-3 text-muted">{text.lead}</p>
      <Link href={localizedPath(locale, "home")} className="btn-primary mt-6 inline-flex">
        {text.home}
      </Link>
      <p className="mt-8 text-sm text-muted">
        <Link href={localizedPath(locale, "celpeBras")} className="text-teal hover:underline">
          Celpe-Bras
        </Link>
        {" · "}
        {ui.nav.find((n) => n.section === "pastExams")?.label}
      </p>
    </div>
  );
}
