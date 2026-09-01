"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { htmlLang, localeFromPathname, type Locale } from "@/i18n/locales";

export function LocaleHtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = localeFromPathname(pathname ?? "") as Locale | null;
    document.documentElement.lang = locale ? htmlLang(locale) : "pt-BR";
  }, [pathname]);

  return null;
}
