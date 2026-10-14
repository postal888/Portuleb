"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { cabinetPath } from "@/lib/writer/cabinet-path";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="8" r="3.15" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5.6 19.2c1.35-3 3.55-4.45 6.4-4.45s5.05 1.45 6.4 4.45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon({ name }: { name: "texts" | "stats" | "password" | "logout" | "erase" }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    "aria-hidden": true as const,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "texts") {
    return (
      <svg {...common}>
        <path d="M7 4.5h7.5L19 9v10.5H7z" />
        <path d="M14.5 4.5V9H19" />
        <path d="M9.5 13h5" />
        <path d="M9.5 16h3.5" />
      </svg>
    );
  }
  if (name === "stats") {
    return (
      <svg {...common}>
        <path d="M5 19.5h14" />
        <path d="M7.5 19.5v-6" />
        <path d="M12 19.5V8" />
        <path d="M16.5 19.5v-9" />
      </svg>
    );
  }
  if (name === "password") {
    return (
      <svg {...common}>
        <rect x="5" y="11" width="14" height="8.5" rx="2" />
        <path d="M8.5 11V8.2a3.5 3.5 0 0 1 7 0V11" />
      </svg>
    );
  }
  if (name === "logout") {
    return (
      <svg {...common}>
        <path d="M10 6.5H7.5A1.5 1.5 0 0 0 6 8v8a1.5 1.5 0 0 0 1.5 1.5H10" />
        <path d="M10.5 12H18" />
        <path d="M15.5 9.2 18.3 12 15.5 14.8" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M5.5 8h13" />
      <path d="M9 8V6.2A1.2 1.2 0 0 1 10.2 5h3.6A1.2 1.2 0 0 1 15 6.2V8" />
      <path d="M7 8l.7 10.2A1.5 1.5 0 0 0 9.2 19.5h5.6a1.5 1.5 0 0 0 1.5-1.3L17 8" />
    </svg>
  );
}

export function HeaderAccount({
  locale,
  signedIn,
  email,
}: {
  locale: Locale;
  signedIn: boolean | null;
  email: string | null;
}) {
  const account = getUi(locale).account;
  const writing = getUi(locale).writing;
  const home = cabinetPath(locale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const known = signedIn !== null;
  const label = !known ? account.menu : signedIn ? account.profile : account.anonymous;

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="header-account-root" ref={rootRef}>
      <button
        type="button"
        className="header-account-chip"
        data-state={signedIn ? "in" : "out"}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-busy={!known}
        onClick={() => setOpen((value) => !value)}
      >
        {signedIn ? <span className="header-account-label">{account.profile}</span> : null}
        <span className="header-account-mark">
          <PersonIcon />
        </span>
      </button>
      {open ? (
        <div className="header-account-menu" id={menuId} role="menu" aria-label={account.menu}>
          {signedIn ? (
            <>
              {email ? <p className="header-account-who">{email}</p> : null}
              <Link role="menuitem" className="header-account-item" href={home} onClick={() => setOpen(false)}>
                <MenuIcon name="texts" />
                {account.texts}
              </Link>
              <Link
                role="menuitem"
                className="header-account-item"
                href={`${home}?intent=stats`}
                onClick={() => setOpen(false)}
              >
                <MenuIcon name="stats" />
                {account.stats}
              </Link>
              <Link
                role="menuitem"
                className="header-account-item"
                href={`${home}?intent=password`}
                onClick={() => setOpen(false)}
              >
                <MenuIcon name="password" />
                {account.password}
              </Link>
              <form action="/api/writer/cabinet/logout" method="post" role="none">
                <input type="hidden" name="locale" value={locale} />
                <button type="submit" role="menuitem" className="header-account-item">
                  <MenuIcon name="logout" />
                  {account.logout}
                </button>
              </form>
              <form
                action="/api/writer/cabinet/erase"
                method="post"
                role="none"
                onSubmit={(event) => {
                  if (!window.confirm(writing.cabinetEraseConfirm)) event.preventDefault();
                }}
              >
                <input type="hidden" name="locale" value={locale} />
                <button type="submit" role="menuitem" className="header-account-item header-account-item-danger">
                  <MenuIcon name="erase" />
                  {account.erase}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link role="menuitem" className="header-account-item" href={home} onClick={() => setOpen(false)}>
                {account.login}
              </Link>
              <Link
                role="menuitem"
                className="header-account-item"
                href={`${home}?intent=register`}
                onClick={() => setOpen(false)}
              >
                {account.register}
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
