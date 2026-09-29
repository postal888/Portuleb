import { requireAdmin } from "@/lib/admin/auth";
import { parseWriterFilters, toCsv } from "@/lib/writer/admin-query";
import { getFunnelRowsForCsv, listWriterSubmissions } from "@/lib/writer/analytics";

export const dynamic = "force-dynamic";

/** Excel needs the BOM to read Portuguese accents out of a CSV. */
const BOM = String.fromCharCode(0xfeff);

const SUBMISSION_COLUMNS = [
  "id",
  "created_at",
  "completed_at",
  "locale",
  "task_id",
  "word_count",
  "status",
  "celpe_level",
  "provider",
  "model",
  "mock",
  "analysis_duration_ms",
  "active_ms",
  "elapsed_ms",
  "email_masked",
  "email_domain",
  "delivery_status",
  "delivery_attempts",
  "sent_at",
  "report_open_count",
  "report_first_opened_at",
  "archive_status",
  "archive_path",
  "error_code",
] as const;

/**
 * CSV of what the panel shows. Two rules hold here: the address is always the masked one, and
 * essay text never enters a bulk export — a file that leaves the server is harder to control
 * than a screen behind a login.
 */
export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const url = new URL(request.url);
  const { filters, limit, problems } = parseWriterFilters(url.searchParams);
  if (problems.length) {
    return Response.json({ ok: false, errorCode: "bad_filters", problems }, { status: 400 });
  }

  const kind = url.searchParams.get("kind") === "funnel" ? "funnel" : "submissions";
  const rows = kind === "funnel" ? getFunnelRowsForCsv(filters) : listWriterSubmissions(filters, limit);
  const csv = toCsv(rows as Record<string, unknown>[], kind === "funnel" ? undefined : [...SUBMISSION_COLUMNS]);

  return new Response(`${BOM}${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="writer-${kind}-${filters.sinceIso.slice(0, 10)}_${filters.untilIso.slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
