"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { PortugueseAccentBar } from "@/components/writing/PortugueseAccentBar";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import { cabinetPath } from "@/lib/writer/cabinet-path";

function AccountLinks({ locale, signedIn }: { locale: Locale; signedIn: boolean }) {
  const account = getUi(locale).account;
  const href = cabinetPath(locale);
  if (signedIn) {
    return (
      <Link className="header-account-open" href={href}>
        {account.open}
      </Link>
    );
  }
  return (
    <>
      <Link className="header-account-login" href={href}>
        {account.login}
      </Link>
      <Link className="header-account-register" href={`${href}?intent=register`}>
        {account.register}
      </Link>
    </>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const nav = getUi(locale).nav;
  const writingHref = localizedPath(locale, "writing");
  const onWriter = pathname === writingHref || pathname.startsWith(`${writingHref}/`);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer/cabinet/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { signedIn?: boolean }) => {
        if (!cancelled) setSignedIn(Boolean(payload?.signedIn));
      })
      .catch(() => {
        if (!cancelled) setSignedIn(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <header className="site-header relative sticky top-0 z-50">
      <div className="site-header-inner mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <SiteLogo locale={locale} />

        <nav className="hidden min-w-0 flex-nowrap items-center gap-0 lg:flex" aria-label="Principal">
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
      <div className="header-account">
        <AccountLinks locale={locale} signedIn={signedIn} />
      </div>
      {onWriter ? <PortugueseAccentBar locale={locale} /> : null}

      {open ? (
        <nav
          className="border-t border-[var(--site-border)] bg-[var(--site-header-bg)] px-4 py-4 sm:px-6 lg:hidden"
          aria-label="Mobile"
        >
          <div className="site-header-inner mx-auto flex flex-col gap-1">
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
