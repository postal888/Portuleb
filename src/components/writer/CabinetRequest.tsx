"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { cabinetPath } from "@/lib/writer/cabinet-path";

type Mode = "login" | "register" | "forgot";

function errorText(
  code: string | undefined,
  t: ReturnType<typeof getUi>["writing"],
): string {
  if (code === "invalid_email") return t.cabinetInvalidEmail;
  if (code === "weak_password") return t.cabinetPasswordShort;
  if (code === "exists") return t.cabinetExists;
  if (code === "unverified") return t.cabinetUnverified;
  if (code === "rate_limited") return t.cabinetRate;
  if (code === "unconfigured") return t.cabinetUnconfigured;
  if (code === "invalid") return t.cabinetLoginFailed;
  return t.cabinetSendFailed;
}

export function CabinetAuth({ locale, mode }: { locale: Locale; mode: Mode }) {
  const t = getUi(locale).writing;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phase, setPhase] = useState<"idle" | "busy" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const home = cabinetPath(locale);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (mode !== "forgot" && password !== confirm && mode === "register") {
      setError(t.cabinetPasswordMismatch);
      return;
    }
    setPhase("busy");
    const path = mode === "register" ? "register" : mode === "forgot" ? "forgot" : "login";
    try {
      const response = await fetch(`/api/writer/cabinet/${path}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, locale }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; errorCode?: string } | null;
      if (payload?.ok && mode === "login") {
        window.location.assign(home);
        return;
      }
      if (payload?.ok) {
        setPhase("sent");
        return;
      }
      setError(errorText(payload?.errorCode, t));
      setPhase("idle");
    } catch {
      setError(t.cabinetSendFailed);
      setPhase("idle");
    }
  }

  if (phase === "sent") {
    return (
      <p className="cabinet-note" role="status">
        {mode === "forgot" ? t.cabinetForgotSent : t.cabinetRegistered}
      </p>
    );
  }

  return (
    <form className="cabinet-form" onSubmit={onSubmit}>
      <label className="home-writer-label" htmlFor="cabinet-email">
        {t.cabinetEmailLabel}
      </label>
      <input
        id="cabinet-email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        spellCheck={false}
        required
        value={email}
        placeholder={t.cabinetEmailPlaceholder}
        onChange={(event) => setEmail(event.target.value)}
      />
      {mode === "forgot" ? null : (
        <>
          <label className="home-writer-label" htmlFor="cabinet-password">
            {t.cabinetPasswordLabel}
          </label>
          <input
            id="cabinet-password"
            name="password"
            type="password"
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            required
            minLength={8}
            maxLength={72}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className="home-writer-gate-hint">{t.cabinetPasswordHint}</p>
        </>
      )}
      {mode === "register" ? (
        <>
          <label className="home-writer-label" htmlFor="cabinet-password-2">
            {t.cabinetPasswordConfirm}
          </label>
          <input
            id="cabinet-password-2"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={72}
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
        </>
      ) : null}
      {error ? (
        <p className="home-writer-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="home-mock-cta home-writer-submit" disabled={phase === "busy"}>
        {phase === "busy"
          ? t.cabinetSending
          : mode === "register"
            ? t.cabinetRegisterSubmit
            : mode === "forgot"
              ? t.cabinetForgotSubmit
              : t.cabinetLoginSubmit}
      </button>
      <p className="cabinet-switch">
        {mode === "login" ? (
          <Link href={`${home}?intent=forgot`}>{t.cabinetForgotLink}</Link>
        ) : (
          <Link href={home}>{t.cabinetHaveAccount}</Link>
        )}
        {mode === "register" ? null : <Link href={`${home}?intent=register`}>{t.cabinetNeedAccount}</Link>}
      </p>
    </form>
  );
}

export function CabinetResetForm({ locale, token }: { locale: Locale; token: string }) {
  const t = getUi(locale).writing;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phase, setPhase] = useState<"idle" | "busy">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirm) {
      setError(t.cabinetPasswordMismatch);
      return;
    }
    setPhase("busy");
    setError(null);
    try {
      const response = await fetch("/api/writer/cabinet/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; errorCode?: string } | null;
      if (payload?.ok) {
        window.location.assign(cabinetPath(locale));
        return;
      }
      setError(payload?.errorCode === "weak_password" ? t.cabinetPasswordShort : t.cabinetResetInvalid);
      setPhase("idle");
    } catch {
      setError(t.cabinetSendFailed);
      setPhase("idle");
    }
  }

  return (
    <form className="cabinet-form" onSubmit={onSubmit}>
      <label className="home-writer-label" htmlFor="cabinet-new-password">
        {t.cabinetPasswordLabel}
      </label>
      <input
        id="cabinet-new-password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={72}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <p className="home-writer-gate-hint">{t.cabinetPasswordHint}</p>
      <label className="home-writer-label" htmlFor="cabinet-new-password-2">
        {t.cabinetPasswordConfirm}
      </label>
      <input
        id="cabinet-new-password-2"
        name="confirm"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={72}
        value={confirm}
        onChange={(event) => setConfirm(event.target.value)}
      />
      {error ? (
        <p className="home-writer-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="home-mock-cta home-writer-submit" disabled={phase === "busy"}>
        {phase === "busy" ? t.cabinetSending : t.cabinetResetSubmit}
      </button>
    </form>
  );
}
