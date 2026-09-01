import { requireAdmin } from "@/lib/admin/auth";
import { parseBulkDocxBuffer, detectDocxFormatLabel, saveUploadedDocument } from "@/lib/admin/blog-import";
import { applyBlogLocaleToPost } from "@/lib/admin/blog-locale";
import { extractDocxParagraphs } from "@/lib/admin/document-parser";
import {
  buildBulkSchedulePlan,
  formatIntervalLabel,
  parseScheduleInterval,
  resolveArticleLocale,
  resolveBulkPublishTimes,
} from "@/lib/admin/blog-schedule-plan";
import { parseCustomPlanJson, resolveScheduleTimezone } from "@/lib/admin/schedule-timezone";
import { resolveBlogLocale } from "@/lib/blog/locale";
import { createScheduledPost } from "@/lib/admin/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  const startAtLocal = String(form.get("startAt") ?? "");
  const timeZone = resolveScheduleTimezone(String(form.get("timeZone") ?? ""));
  const scheduleLocale = resolveBlogLocale(String(form.get("scheduleLocale") ?? ""));
  const customPlanJson = String(form.get("customPlan") ?? "");  const { amount, unit } = parseScheduleInterval({
    intervalAmount: form.get("intervalAmount"),
    intervalDays: form.get("intervalDays"),
    intervalUnit: form.get("intervalUnit"),
  });

  if (!(file instanceof File)) {
    return Response.json({ error: "Arquivo .docx obrigatório" }, { status: 400 });
  }
  if (!file.name.toLowerCase().endsWith(".docx")) {
    return Response.json({ error: "Bulk import aceita apenas .docx" }, { status: 400 });
  }
  if (!startAtLocal && !customPlanJson) {
    return Response.json({ error: "Data/hora inicial ou plano personalizado obrigatório" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const archivePath = saveUploadedDocument(buffer, "bulk-plan", ".docx");
    const articles = await parseBulkDocxBuffer(buffer);
    if (articles.length > 100) {
      return Response.json({ error: "Máximo 100 artigos por arquivo" }, { status: 400 });
    }

    const scheduleInput = {
      startAtLocal,
      intervalAmount: amount,
      intervalUnit: unit,
      timeZone,
      defaultLocale: scheduleLocale,
    };

    const customPlan = parseCustomPlanJson(customPlanJson);
    const publishTimes = resolveBulkPublishTimes(articles.length, scheduleInput, customPlanJson);
    const plan = buildBulkSchedulePlan(articles, scheduleInput, customPlan);

    const scheduled: { id: number; slug: string; title: string; publishAtUtc: string; locale: string }[] = [];
    const errors: string[] = [];

    for (let i = 0; i < articles.length; i++) {
      const hints = articles[i]!;
      const publishAtUtc = publishTimes[i]!;
      const locale = resolveArticleLocale(hints, i, scheduleLocale, customPlan);
      try {
        const post = applyBlogLocaleToPost(
          { ...hints.post, publishedAt: publishAtUtc.slice(0, 10) },
          locale,
        );
        const id = createScheduledPost({
          slug: post.slug,
          title: post.title,
          payloadJson: JSON.stringify(post),
          publishAtUtc,
          sourceFilePath: archivePath,
        });
        scheduled.push({ id, slug: post.slug, title: post.title, publishAtUtc, locale });      } catch (e) {
        errors.push(`${hints.title}: ${e instanceof Error ? e.message : "erro"}`);
      }
    }

    return Response.json({
      ok: true,
      count: scheduled.length,
      timeZone,
      scheduleLocale,
      intervalAmount: amount,      intervalUnit: unit,
      intervalLabel: formatIntervalLabel(amount, unit),
      scheduled,
      plan,
      errors,
      sourceFilePath: archivePath,
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Falha no import em lote" },
      { status: 400 },
    );
  }
}
