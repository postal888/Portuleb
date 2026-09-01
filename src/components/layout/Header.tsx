"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = getUi(locale).nav;

  return (
    <header className="relative sticky top-0 z-50 border-b border-[var(--site-border)] bg-[var(--site-header-bg)] shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <SiteLogo locale={locale} />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
          {nav.map((item) => {
            const href = localizedPath(locale, item.section);
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link ${active ? "nav-link-active" : "nav-link-idle"}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <LocaleSwitcher locale={locale} />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher locale={locale} />
          <button
            type="button"
            className="rounded-full p-2.5 text-teal transition-colors hover:bg-[var(--site-primary-highlight)]"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-[var(--site-border)] bg-[var(--site-header-bg)] px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => {
              const href = localizedPath(locale, item.section);
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${active ? "nav-link-active" : "nav-link-idle"}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
