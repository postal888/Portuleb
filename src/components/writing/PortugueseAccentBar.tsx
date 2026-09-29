"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import "./portuguese-accents.css";

const LOWER = ["á", "à", "â", "ã", "é", "ê", "í", "ó", "ô", "õ", "ú", "ç"] as const;
const UPPER = ["Á", "À", "Â", "Ã", "É", "Ê", "Í", "Ó", "Ô", "Õ", "Ú", "Ç"] as const;

function insertIntoEssay(mark: string) {
  const area = document.getElementById("essay") as HTMLTextAreaElement | null;
  if (!area || area.disabled) return;
  const start = area.selectionStart ?? area.value.length;
  const end = area.selectionEnd ?? start;
  const next = `${area.value.slice(0, start)}${mark}${area.value.slice(end)}`;
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  setter?.call(area, next);
  area.dispatchEvent(new Event("input", { bubbles: true }));
  area.focus();
  const cursor = start + mark.length;
  area.setSelectionRange(cursor, cursor);
}

export function PortugueseAccentBar({ locale }: { locale: Locale }) {
  const t = getUi(locale).writing;
  const [upper, setUpper] = useState(false);
  const marks = upper ? UPPER : LOWER;

  return (
    <div className="pt-accents" role="toolbar" aria-label={t.accentsLabel}>
      <div className="pt-accents-row">
        {marks.map((mark) => (
          <button
            key={`${upper ? "u" : "l"}-${mark}`}
            type="button"
            className="pt-accents-key"
            aria-label={`${t.accentsInsert} ${mark}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => insertIntoEssay(mark)}
          >
            {mark}
          </button>
        ))}
        <button
          type="button"
          className={`pt-accents-key is-shift${upper ? " is-on" : ""}`}
          aria-pressed={upper}
          aria-label={t.accentsShift}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setUpper((value) => !value)}
        >
          A/a
        </button>
      </div>
    </div>
  );
}
