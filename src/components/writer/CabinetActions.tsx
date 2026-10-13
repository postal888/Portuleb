"use client";

import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

export function CabinetActions({ locale }: { locale: Locale }) {
  const t = getUi(locale).writing;
  return (
    <div className="cabinet-actions">
      <form action="/api/writer/cabinet/logout" method="post">
        <input type="hidden" name="locale" value={locale} />
        <button type="submit" className="home-writer-example">
          {t.cabinetLogout}
        </button>
      </form>
      <form
        action="/api/writer/cabinet/erase"
        method="post"
        onSubmit={(event) => {
          if (!window.confirm(t.cabinetEraseConfirm)) event.preventDefault();
        }}
      >
        <input type="hidden" name="locale" value={locale} />
        <button type="submit" className="cabinet-erase">
          {t.cabinetErase}
        </button>
      </form>
    </div>
  );
}
