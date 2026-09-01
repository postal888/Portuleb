import { parseDocumentBuffer } from "@/lib/admin/blog-import";
import { requireAdmin } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Arquivo obrigatório" }, { status: 400 });
  }

  const name = file.name.toLowerCase();
  if (!name.endsWith(".docx") && !name.endsWith(".pdf")) {
    return Response.json({ error: "Use .docx ou .pdf" }, { status: 400 });
  }

  if (file.size > 12 * 1024 * 1024) {
    return Response.json({ error: "Arquivo muito grande (máx. 12 MB)" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const hints = await parseDocumentBuffer(buffer, file.name);
    return Response.json({ hints });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Falha ao ler o arquivo" },
      { status: 400 },
    );
  }
}
