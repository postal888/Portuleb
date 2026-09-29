import type { SiteUi } from "@/i18n/ui";

type WriterErrors = SiteUi["writing"]["errors"];

/**
 * The wire speaks snake_case codes, the dictionaries speak camelCase keys. Nothing from the API
 * body is ever shown as-is: an unmapped code becomes `unknown`, not raw provider text.
 */
const COPY_KEYS: Record<string, keyof WriterErrors> = {
  rate_limit: "rateLimit",
  body_unreadable: "bodyUnreadable",
  body_too_large: "bodyTooLarge",
  bad_json: "badJson",
  validation: "validation",
  invalid_text: "invalidText",
  invalid_email: "invalidEmail",
  invalid_task: "invalidTask",
  not_configured: "notConfigured",
  timeout: "timeout",
  rate_limited: "providerRateLimited",
  llm_error: "llmError",
  empty_response: "emptyResponse",
  network_error: "networkError",
  analysis_failed: "analysisFailed",
  submission_create_failed: "storageFailed",
  submission_update_failed: "storageFailed",
  request_failed: "requestFailed",
};

export function writerErrorCopy(errors: WriterErrors, errorCode?: string | null): string {
  const key = errorCode ? COPY_KEYS[errorCode] : undefined;
  return key ? errors[key] : errors.unknown;
}
