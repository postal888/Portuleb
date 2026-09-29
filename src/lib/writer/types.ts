export const WRITER_SESSION_STATUSES = [
  "opened",
  "writing",
  "ready_for_email",
  "ready_for_submission",
  "submitted",
  "completed",
  "failed",
  "abandoned",
] as const;
export type WriterSessionStatus = (typeof WRITER_SESSION_STATUSES)[number];

export const WRITER_EVENT_NAMES = [
  "writer_opened",
  "writer_task_selected",
  "writer_started",
  "writer_reached_email_threshold",
  "writer_reached_exam_minimum",
  "writer_submit_started",
  "writer_validation_failed",
  "writer_analysis_succeeded",
  "writer_analysis_failed",
  "writer_result_shown",
  "writer_email_sent",
  "writer_email_failed",
  "writer_report_opened",
  "writer_resubmitted",
] as const;
export type WriterEventName = (typeof WRITER_EVENT_NAMES)[number];

export const SUBMISSION_STATUSES = [
  "pending",
  "analyzing",
  "completed",
  "failed_validation",
  "failed_analysis",
  "failed_storage",
] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export const ARCHIVE_STATUSES = ["pending", "ok", "failed", "skipped"] as const;
export type ArchiveStatus = (typeof ARCHIVE_STATUSES)[number];

export const EMAIL_DELIVERY_STATUSES = ["pending", "sent", "failed", "skipped_unconfigured"] as const;
export type EmailDeliveryStatus = (typeof EMAIL_DELIVERY_STATUSES)[number];

export type WriterSessionRow = {
  id: string;
  visitor_id: string;
  locale: string;
  path: string;
  initial_task_id: string | null;
  current_task_id: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: WriterSessionStatus;
  opened_at: string;
  first_input_at: string | null;
  last_activity_at: string;
  submitted_at: string | null;
  completed_at: string | null;
  active_ms: number;
  elapsed_ms: number;
  current_word_count: number;
  max_word_count: number;
  submission_id: string | null;
  created_at: string;
  updated_at: string;
};

export type WriterEventRow = {
  id: string;
  session_id: string;
  event_name: WriterEventName;
  occurred_at: string;
  received_at: string;
  locale: string | null;
  task_id: string | null;
  word_count: number | null;
  metadata_json: string;
};

export type WritingSubmissionRow = {
  id: string;
  session_id: string | null;
  email: string;
  email_normalized: string;
  locale: string;
  task_id: string | null;
  essay_text: string;
  word_count: number;
  status: SubmissionStatus;
  analysis_json: string | null;
  celpe_level: string | null;
  scores_json: string | null;
  provider: string | null;
  model: string | null;
  mock: number;
  analysis_duration_ms: number | null;
  archive_status: ArchiveStatus | null;
  archive_path: string | null;
  archive_error: string | null;
  error_code: string | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
  updated_at: string;
};

export type WritingReportRow = {
  id: string;
  submission_id: string;
  token_hash: string;
  expires_at: string;
  first_opened_at: string | null;
  last_opened_at: string | null;
  open_count: number;
  created_at: string;
};

export type EmailDeliveryRow = {
  id: string;
  submission_id: string;
  recipient: string;
  provider: string | null;
  status: EmailDeliveryStatus;
  provider_message_id: string | null;
  attempt_count: number;
  last_error: string | null;
  created_at: string;
  sent_at: string | null;
  updated_at: string;
};

/** Statuses that count as "the candidate got a finished analysis". */
export const COMPLETED_STATUSES: SubmissionStatus[] = ["completed"];
export const FAILED_STATUSES: SubmissionStatus[] = [
  "failed_validation",
  "failed_analysis",
  "failed_storage",
];
