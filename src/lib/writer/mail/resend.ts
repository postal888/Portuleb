import { MailError, type MailMessage } from "./provider";

const RESEND_URL = "https://api.resend.com/emails";
const TIMEOUT_MS = 15_000;

export async function sendWithResend(
  message: MailMessage,
  apiKey: string,
  from: string,
): Promise<{ messageId: string | null }> {
  const replyTo = process.env.MAIL_REPLY_TO?.trim();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        headers: { "Auto-Submitted": "auto-generated" },
      }),
      signal: controller.signal,
    });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    throw new MailError(aborted ? "timeout" : "network_error", aborted ? "resend_timeout" : "resend_network", true);
  } finally {
    clearTimeout(timer);
  }

  const data = (await res.json().catch(() => null)) as { id?: string; message?: string } | null;

  if (!res.ok) {
    const retryable = res.status === 429 || res.status >= 500;
    throw new MailError(
      res.status === 429 ? "rate_limited" : res.status >= 500 ? "provider_unavailable" : "provider_rejected",
      data?.message || `resend_${res.status}`,
      retryable,
    );
  }

  return { messageId: data?.id ?? null };
}
