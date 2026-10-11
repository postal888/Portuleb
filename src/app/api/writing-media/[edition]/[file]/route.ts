import fs from "fs";
import path from "path";
import { resolveWritingMedia, writingMediaMime } from "@/lib/writing/media";

type Params = { params: Promise<{ edition: string; file: string }> };

function streamFile(filePath: string, start?: number, end?: number) {
  const nodeStream = fs.createReadStream(filePath, start === undefined ? undefined : { start, end });
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(chunk));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (error) => controller.error(error));
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}

export async function GET(request: Request, { params }: Params) {
  const { edition, file } = await params;
  const filePath = resolveWritingMedia(edition, file);
  if (!filePath) {
    return new Response("Arquivo não encontrado", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const mime = writingMediaMime(filePath);
  const fileName = path.basename(filePath);
  const range = request.headers.get("range");
  const headers: Record<string, string> = {
    "Content-Type": mime,
    "Accept-Ranges": "bytes",
    "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
    "Cache-Control": "public, max-age=3600",
  };

  if (range) {
    const match = /bytes=(\d+)-(\d*)/.exec(range);
    if (!match) return new Response(null, { status: 416 });
    const start = parseInt(match[1], 10);
    const end = match[2] ? parseInt(match[2], 10) : stat.size - 1;
    if (start >= stat.size || end >= stat.size || start > end) {
      return new Response(null, { status: 416 });
    }
    return new Response(streamFile(filePath, start, end), {
      status: 206,
      headers: {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Content-Length": String(end - start + 1),
      },
    });
  }

  return new Response(streamFile(filePath), {
    headers: { ...headers, "Content-Length": String(stat.size) },
  });
}
