import { sendWithResend } from "./resend";

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type MailProvider = {
  name: string;
  send(message: MailMessage): Promise<{ messageId: string | null }>;
};

export class MailError extends Error {
  readonly code: string;
  readonly retryable: boolean;

  constructor(code: string, message: string, retryable = false) {
    super(message);
    this.name = "MailError";
    this.code = code;
    this.retryable = retryable;
  }
}

const ADDRESS_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** "Celpe-Dê Pé <no-reply@example.test>" is the format Resend documents, so the display name is allowed. */
export function mailFrom(): string | null {
  const raw = process.env.MAIL_FROM?.trim() || process.env.RESEND_FROM?.trim() || "";
  if (!raw) return null;
  const address = raw.match(/<([^>]+)>/)?.[1]?.trim() ?? raw;
  return ADDRESS_RE.test(address) ? raw : null;
}

function resendApiKey(): string | null {
  return process.env.RESEND_API_KEY?.trim() || null;
}

export function getMailProvider(): MailProvider | null {
  const key = resendApiKey();
  const from = mailFrom();
  if (!key || !from) return null;
  return {
    name: "resend",
    send: (message) => sendWithResend(message, key, from),
  };
}

export function getMailStatus(): { configured: boolean; provider: string | null; from: string | null } {
  const provider = getMailProvider();
  return {
    configured: Boolean(provider),
    provider: provider?.name ?? null,
    from: mailFrom(),
  };
}
