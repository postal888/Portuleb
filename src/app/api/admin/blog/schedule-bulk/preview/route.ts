import { requireAdmin } from "@/lib/admin/auth";
import { parseBulkDocxBuffer, detectDocxFormatLabel } from "@/lib/admin/blog-import";
import { extractDocxParagraphs } from "@/lib/admin/document-parser";
import {
  buildBulkSchedulePlan,
  formatIntervalLabel,
  parseScheduleInterval,
} from "@/lib/admin/blog-schedule-plan";
import { parseCustomPlanJson, resolveScheduleTimezone } from "@/lib/admin/schedule-timezone";
import { resolveBlogLocale } from "@/lib/blog/locale";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  const startAtLocal = String(form.get("startAt") ?? "");
  const timeZone = resolveScheduleTimezone(String(form.get("timeZone") ?? ""));
  const scheduleLocale = resolveBlogLocale(String(form.get("scheduleLocale") ?? ""));
  const customPlanJson = String(form.get("customPlan") ?? "");
  const { amount, unit } = parseScheduleInterval({
    intervalAmount: form.get("intervalAmount"),
    intervalDays: form.get("intervalDays"),
    intervalUnit: form.get("intervalUnit"),
  });

  if (!(file instanceof File)) {
    return Response.json({ error: "Arquivo .docx obrigatório" }, { status: 400 });
  }
  if (!file.name.toLowerCase().endsWith(".docx")) {
    return Response.json({ error: "Preview aceita apenas .docx" }, { status: 400 });
  }
  if (!startAtLocal) {
    return Response.json({ error: "Data/hora inicial obrigatória" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const paragraphs = await extractDocxParagraphs(buffer);
    const format = detectDocxFormatLabel(paragraphs);
    const articles = await parseBulkDocxBuffer(buffer);
    if (articles.length > 100) {
      return Response.json({ error: "Máximo 100 artigos por arquivo" }, { status: 400 });
    }

    const customPlan = parseCustomPlanJson(customPlanJson);
    const plan = buildBulkSchedulePlan(
      articles,
      {
        startAtLocal,
        intervalAmount: amount,
        intervalUnit: unit,
        timeZone,
        defaultLocale: scheduleLocale,
      },
      customPlan,
    );

    return Response.json({
      ok: true,
      count: plan.length,
      format,
      timeZone,
      scheduleLocale,
      intervalAmount: amount,
      intervalUnit: unit,
      intervalLabel: formatIntervalLabel(amount, unit),
      plan,
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Falha ao gerar preview" },
      { status: 400 },
    );
  }
}
