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
import { HeaderAccount } from "@/components/layout/HeaderAccount";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const nav = getUi(locale).nav;
  const writingHref = localizedPath(locale, "writing");
  const onWriter = pathname === writingHref || pathname.startsWith(`${writingHref}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writer/cabinet/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { signedIn?: boolean; email?: string }) => {
        if (cancelled) return;
        const inAccount = Boolean(payload?.signedIn);
        setSignedIn(inAccount);
        setEmail(inAccount && payload.email ? payload.email : null);
      })
      .catch(() => {
        if (!cancelled) {
          setSignedIn(false);
          setEmail(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <header
      className="site-header relative sticky top-0 z-50"
      data-scrolled={scrolled ? "true" : "false"}
    >
      <div className="site-header-inner mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <SiteLogo locale={locale} />

        <div className="header-account-desktop hidden min-w-0 items-center gap-1.5 lg:flex">
          <nav className="flex min-w-0 flex-nowrap items-center gap-0" aria-label="Principal">
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
          <HeaderAccount locale={locale} signedIn={signedIn} email={email} />
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
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
          <HeaderAccount locale={locale} signedIn={signedIn} email={email} />
        </div>
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
