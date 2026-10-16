"use client";

import type { Locale } from "@/i18n/locales";

function localeTag(locale: Locale): string {
  if (locale === "pt-br") return "pt-BR";
  return locale;
}

/** Date and clock time in the reader's own zone. The server stamp is replaced on the client. */
export function EssayStamp({ iso, locale }: { iso: string; locale: Locale }) {
  const parsed = Date.parse(iso);
  const label = Number.isNaN(parsed)
    ? iso
    : new Intl.DateTimeFormat(localeTag(locale), {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(parsed));

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {label}
    </time>
  );
}
