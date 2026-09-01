import { requireAdmin } from "@/lib/admin/auth";
import { parseDocumentBuffer, saveUploadedDocument } from "@/lib/admin/blog-import";
import { applyBlogLocaleToPost } from "@/lib/admin/blog-locale";
import { createScheduledPost } from "@/lib/admin/db";
import { resolveScheduleTimezone, zonedDateTimeInputToUtc } from "@/lib/admin/schedule-timezone";
import { resolveBlogLocale } from "@/lib/blog/locale";
import type { BlogPost } from "@/content/blog/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  const publishAtLocal = String(form.get("publishAt") ?? "");
  const timeZone = resolveScheduleTimezone(String(form.get("timeZone") ?? ""));
  const scheduleLocale = resolveBlogLocale(String(form.get("scheduleLocale") ?? ""));
  const slugOverride = String(form.get("slug") ?? "").trim();
  const titleOverride = String(form.get("title") ?? "").trim();

  if (!(file instanceof File)) {
    return Response.json({ error: "Arquivo .docx ou .pdf obrigatório" }, { status: 400 });
  }
  if (!publishAtLocal) {
    return Response.json({ error: "Data/hora de publicação obrigatória" }, { status: 400 });
  }

  let publishAtUtc: string;
  try {
    publishAtUtc = zonedDateTimeInputToUtc(publishAtLocal, timeZone);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Data/hora inválida" },
      { status: 400 },
    );
  }

  const name = file.name.toLowerCase();
  const ext = name.endsWith(".pdf") ? ".pdf" : name.endsWith(".docx") ? ".docx" : "";
  if (!ext) return Response.json({ error: "Use .docx ou .pdf" }, { status: 400 });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const hints = await parseDocumentBuffer(buffer, file.name);
    const post = applyBlogLocaleToPost(
      {
        ...hints.post,
        ...(titleOverride ? { title: titleOverride } : {}),
        ...(slugOverride ? { slug: slugOverride } : {}),
        publishedAt: publishAtUtc.slice(0, 10),
      },
      scheduleLocale,
    );    const sourceFilePath = saveUploadedDocument(buffer, post.slug, ext);
    const id = createScheduledPost({
      slug: post.slug,
      title: post.title,
      payloadJson: JSON.stringify(post),
      publishAtUtc,
      sourceFilePath,
    });
    return Response.json({ ok: true, id, slug: post.slug, title: post.title });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Falha ao agendar" },
      { status: 400 },
    );
  }
}
