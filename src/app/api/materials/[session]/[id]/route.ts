import fs from "fs";
import path from "path";
import { mimeForPath, resolveMaterialPath } from "@/lib/materials/registry";

type Params = { params: Promise<{ session: string; id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { session, id } = await params;
  const filePath = resolveMaterialPath(session, id);

  if (!filePath || !fs.existsSync(filePath)) {
    return new Response("Arquivo não encontrado", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const mime = mimeForPath(filePath);
  const fileName = path.basename(filePath);
  const range = request.headers.get("range");

  const baseHeaders: Record<string, string> = {
    "Content-Type": mime,
    "Accept-Ranges": "bytes",
    "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
    "Cache-Control": "public, max-age=3600",
  };

  if (range) {
    const match = /bytes=(\d+)-(\d*)/.exec(range);
    if (!match) {
      return new Response(null, { status: 416 });
    }
    const start = parseInt(match[1], 10);
    const end = match[2] ? parseInt(match[2], 10) : stat.size - 1;
    if (start >= stat.size || end >= stat.size) {
      return new Response(null, { status: 416 });
    }
    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });
    return new Response(readable, {
      status: 206,
      headers: {
        ...baseHeaders,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Content-Length": String(chunkSize),
      },
    });
  }

  const stream = fs.createReadStream(filePath);
  const readable = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });

  return new Response(readable, {
    headers: {
      ...baseHeaders,
      "Content-Length": String(stat.size),
    },
  });
}
