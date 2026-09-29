import type { SiteUi } from "@/i18n/ui";

type Writing = SiteUi["writing"];

/**
 * Which analytics event a delivery outcome is worth. A skipped send is not a failure: the copy on
 * screen says the link is switched off, so counting it as `writer_email_failed` would lie to the funnel.
 */
export function emailEventOf(status: string | null | undefined): "writer_email_sent" | "writer_email_failed" | null {
  if (status === "sent") return "writer_email_sent";
  return status === "skipped_unconfigured" ? null : "writer_email_failed";
}

/** The sentence under the result, chosen by delivery status. Never claims a letter went out unless one did. */
export function deliveryTemplateOf(t: Writing, status: string | null | undefined): string {
  if (!status) return "";
  switch (status) {
    case "sent":
      return t.deliverySent;
    case "skipped_unconfigured":
      return t.deliveryUnconfigured;
    case "pending":
      return t.deliveryPending;
    default:
      return t.deliveryFailed;
  }
}
