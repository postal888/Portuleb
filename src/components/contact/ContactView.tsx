"use client";

import { FormEvent, useId, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import "./contact.css";

export function ContactView({ locale }: { locale: Locale }) {
  const t = getUi(locale).contact;
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const honeyId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          message: message.trim(),
          locale,
          company,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || t.errorGeneric);
      }
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="contact-page">
      <Breadcrumbs
        items={[
          { label: getUi(locale).breadcrumb.home, href: localizedPath(locale, "home") },
          { label: t.title },
        ]}
      />

      <header className="contact-head">
        <p className="contact-eyebrow">{t.eyebrow}</p>
        <h1 className="contact-title">{t.title}</h1>
        <p className="contact-lead">{t.lead}</p>
      </header>

      {sent ? (
        <div className="contact-success" role="status">
          <p className="contact-success-title">{t.successTitle}</p>
          <p className="contact-success-body">{t.successBody}</p>
          <button type="button" className="contact-again" onClick={() => setSent(false)}>
            {t.sendAnother}
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="contact-field contact-honeypot" aria-hidden="true">
            <label htmlFor={honeyId}>{t.honeypot}</label>
            <input
              id={honeyId}
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="contact-field">
            <label htmlFor={nameId}>{t.nameLabel}</label>
            <input
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="contact-field">
            <label htmlFor={emailId}>
              {t.emailLabel} <span className="contact-required">{t.required}</span>
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              inputMode="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
            />
          </div>

          <div className="contact-field">
            <label htmlFor={messageId}>
              {t.messageLabel} <span className="contact-required">{t.required}</span>
            </label>
            <textarea
              id={messageId}
              name="message"
              required
              rows={7}
              maxLength={4000}
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={Boolean(error)}
            />
            <p className="contact-hint">{t.messageHint}</p>
          </div>

          {error ? (
            <p className="contact-error" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="contact-submit" disabled={busy}>
            {busy ? t.sending : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}
