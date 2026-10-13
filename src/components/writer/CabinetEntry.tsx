import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { cabinetPath } from "@/lib/writer/cabinet-path";
import "./cabinet.css";

export function CabinetEntry({ locale }: { locale: Locale }) {
  const t = getUi(locale).writing;
  return (
    <p className="cabinet-entry">
      <Link href={cabinetPath(locale)}>{t.cabinetFromResultLink}</Link>
      <span> — {t.cabinetFromResult}</span>
    </p>
  );
}
