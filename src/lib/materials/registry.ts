import path from "path";

/** Raiz do acervo local (Portulebre/Materials). */
export const MATERIALS_ROOT =
  process.env.MATERIALS_ROOT ?? "E:\\GIT\\Portulebre\\Materials";

export type MaterialKind = "pdf" | "video" | "audio";

export type MaterialFile = {
  id: string;
  relativePath: string;
  kind: MaterialKind;
  title: string;
};

/** Arquivos permitidos para 2026/1 — caminhos relativos a Materials/ */
export const files2026_1: Record<string, MaterialFile> = {
  caderno: {
    id: "caderno",
    relativePath: "arquivos/2026/1/caderno-questoes/Celpe_Bras_PROVA1_2026_1.pdf",
    kind: "pdf",
    title: "Caderno de questões",
  },
  "audio-t2": {
    id: "audio-t2",
    relativePath: "arquivos/2026/1/audio/CELPE-BRAS_2026_1_TAREFA-2_CARDAPIO_QRCODE_.mp4",
    kind: "video",
    title: "Tarefa 2 — Cardápio QR Code",
  },
  roteiros: {
    id: "roteiros",
    relativePath:
      "arquivos/2026/1/roteiro-interacao/Roteiros_PROVA2_Celpe_Bras_2026_1_PRINCIPAL.pdf",
    kind: "pdf",
    title: "Roteiros de interação",
  },
  elementos: {
    id: "elementos",
    relativePath:
      "arquivos/2026/1/elementos-provocadores/EPs_PROVA2_Celpe_Bras_2026_1_PRINCIPAL.pdf",
    kind: "pdf",
    title: "Elementos provocadores",
  },
  edital: {
    id: "edital",
    relativePath:
      "arquivos/2026/unknown/edital/EDITAL-No-8-DE-20-DE-FEVEREIRO-DE-2026-EDITAL-No-8-DE-20-DE-FEVEREIRO-DE-2026-DOU-Imprensa-Nacional.pdf",
    kind: "pdf",
    title: "Edital 2026/1",
  },
  "video-t1": {
    id: "video-t1",
    relativePath: "arquivos/2026/1/video/CELPE-BRAS_2026_1_TAREFA-1_FESTIVAL_FARTURA.mp4",
    kind: "video",
    title: "Tarefa 1 — Festival Fartura",
  },
};

const sessionRegistries: Record<string, Record<string, MaterialFile>> = {
  "2026-1": files2026_1,
};

export function getMaterialRegistry(sessionSlug: string) {
  return sessionRegistries[sessionSlug];
}

export function resolveMaterialPath(sessionSlug: string, materialId: string): string | null {
  const registry = getMaterialRegistry(sessionSlug);
  const entry = registry?.[materialId];
  if (!entry) return null;

  const absolute = path.resolve(MATERIALS_ROOT, entry.relativePath);
  const root = path.resolve(MATERIALS_ROOT);
  if (!absolute.startsWith(root)) return null;
  return absolute;
}

export function materialPublicUrl(sessionSlug: string, materialId: string) {
  return `/api/materials/${sessionSlug}/${materialId}`;
}

export function mimeForPath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".pdf": "application/pdf",
    ".mp4": "video/mp4",
    ".mp3": "audio/mpeg",
    ".webm": "video/webm",
    ".m4a": "audio/mp4",
  };
  return map[ext] ?? "application/octet-stream";
}
