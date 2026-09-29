import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteSubmissionCascade, getSubmission } from "@/lib/writer/store";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({ submissionId: z.string().min(8).max(64) });

/**
 * Erases one submission for good: the row, the report token, the delivery log, the session and
 * its events, the JSON file copy, and the legacy address entry once nothing else needs it.
 * Counters stay in the funnel history only as far as they never name anyone.
 */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let submissionId: string;
  try {
    submissionId = bodySchema.parse(await request.json()).submissionId;
  } catch {
    return Response.json({ ok: false, errorCode: "bad_request" }, { status: 400, headers: NO_STORE });
  }

  const submission = getSubmission(submissionId);
  if (!submission) {
    return Response.json({ ok: false, errorCode: "not_found" }, { status: 404, headers: NO_STORE });
  }

  // Lazy so the filesystem module stays out of the build's file trace; see src/lib/writer/check.ts.
  const { deleteWriterArchive } = await import(/* turbopackIgnore: true */ "@/lib/writer/archive");
  const archiveFile = deleteWriterArchive(submission.archive_path);
  const removed = deleteSubmissionCascade(submissionId);

  return Response.json(
    { ok: true, removed: { ...removed, archiveFile } },
    { headers: NO_STORE },
  );
}
