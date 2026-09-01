import fs from "fs";
import path from "path";

/** Acervo local em Materials/Provas (repositório). */
export const MATERIALS_ROOT_PROVAS = path.join(process.cwd(), "Materials", "Provas");

/** Raiz no servidor ou acervo legado com arquivos/YYYY/… */
export const MATERIALS_ROOT = process.env.MATERIALS_ROOT ?? MATERIALS_ROOT_PROVAS;

export type MaterialKind = "pdf" | "video" | "audio";

export type MaterialFile = {
  id: string;
  relativePath: string;
  kind: MaterialKind;
  title: string;
  /** Usar MATERIALS_ROOT legado (arquivos/…) em vez de Materials/Provas. */
  legacy?: boolean;
};

function file(id: string, relativePath: string, kind: MaterialKind, title: string, legacy = false): MaterialFile {
  return { id, relativePath, kind, title, ...(legacy ? { legacy: true } : {}) };
}

export const files2023_1: Record<string, MaterialFile> = {
  caderno: file("caderno", "2023-1/Caderno-de-Questoes-2023-1.pdf", "pdf", "Caderno de questões"),
  "video-t1": file(
    "video-t1",
    "2023-1/CELPE-BRAS_2023_1_TAREFA-1_comprimido.mp4",
    "video",
    "Tarefa 1 — vídeo",
  ),
  "video-t2": file("video-t2", "2023-1/CELPE-BRAS_2023_1_TAREFA-2.mp4", "video", "Tarefa 2 — vídeo/áudio"),
  roteiros: file(
    "roteiros",
    "2023-1/rotate-pdf-pages_Roteiro-de-Interacao-Face-a-Face-2023-1.pdf",
    "pdf",
    "Roteiros de interação",
  ),
  elementos: file(
    "elementos",
    "2023-1/Conjunto-de-Elementos-Provocadores.pdf",
    "pdf",
    "Elementos provocadores",
  ),
};

export const files2023_2: Record<string, MaterialFile> = {
  caderno: file("caderno", "2023-2/Caderno_Questoes-2023-2.pdf", "pdf", "Caderno de questões"),
  "video-t1": file("video-t1", "2023-2/CELPE-BRAS_2023_1_TAREFA-1-1.mp4", "video", "Tarefa 1 — vídeo"),
  "video-t2": file("video-t2", "2023-2/CELPE-BRAS_2023_1_TAREFA-2.mp4", "video", "Tarefa 2 — vídeo/áudio"),
  roteiros: file("roteiros", "2023-2/Interacao_Face_Face-2023-2-girado.pdf", "pdf", "Roteiros de interação"),
  elementos: file(
    "elementos",
    "2023-2/Elementores-Provocadores-2023.2.pdf",
    "pdf",
    "Elementos provocadores",
  ),
};

export const files2024_1: Record<string, MaterialFile> = {
  caderno: file("caderno", "2024-1/Caderno-de-Questoes-2024-1.pdf", "pdf", "Caderno de questões"),
  "video-t1": file(
    "video-t1",
    "2024-1/CELPE-BRAS_2024_1_TAREFA-1_MUSEU-DA-VIDA-1.mp4",
    "video",
    "Tarefa 1 — Museu da Vida",
  ),
  "video-t2": file(
    "video-t2",
    "2024-1/CELPE-BRAS_2024_1_TAREFA-2_ESTATUTO-RACIAL.mp4",
    "video",
    "Tarefa 2 — Estatuto Racial",
  ),
  roteiros: file("roteiros", "2024-1/Roteiros-de-interacao-2024-1.pdf", "pdf", "Roteiros de interação"),
  elementos: file(
    "elementos",
    "2024-1/Elementos-Provocadores-2024-1.pdf",
    "pdf",
    "Elementos provocadores",
  ),
};

export const files2024_2: Record<string, MaterialFile> = {
  caderno: file(
    "caderno",
    "2024-2/Tarefas_Celpe_Bras_PROVA-1_2024_2_Principal_FINAL1.pdf",
    "pdf",
    "Caderno de questões",
  ),
  "video-t1": file(
    "video-t1",
    "2024-2/Celpe-Bras-2024.2：-video：-Cultura-da-aceleracao.mp4",
    "video",
    "Tarefa 1 — Cultura da aceleração",
  ),
  "video-t2": file(
    "video-t2",
    "2024-2/CELPE-BRAS_2024_2_TAREFA-2_Raduan-Nassar_Reserva.mp4",
    "video",
    "Tarefa 2 — Raduan Nassar",
  ),
  roteiros: file(
    "roteiros",
    "2024-2/CELPE-BRAS2422002_Roteiro_de_interacao_face_a_face.pdf",
    "pdf",
    "Roteiros de interação",
  ),
  elementos: file("elementos", "2024-2/Elementos-Provocadores.pdf", "pdf", "Elementos provocadores"),
};

export const files2025_1: Record<string, MaterialFile> = {
  caderno: file(
    "caderno",
    "2025-1/Tarefas_Celpe_Bras_PROVA1_2025_1_PRINCIPAL.pdf",
    "pdf",
    "Caderno de questões",
  ),
  "video-t1": file(
    "video-t1",
    "2025-1/CELPE-BRAS_2025_1_TAREFA-1_ESTRADA-DE-SANTOS_v2-1-1-1.mp4",
    "video",
    "Tarefa 1 — Estrada de Santos",
  ),
  "video-t2": file(
    "video-t2",
    "2025-1/CELPE-BRAS_2025_1_TAREFA-2_A_ULTIMA_FLORESTA.mp4",
    "video",
    "Tarefa 2 — A Última Floresta",
  ),
  roteiros: file(
    "roteiros",
    "2025-1/Roteiros_PROVA1_Celpe_Bras_2025_1_PRINCIPAL.pdf",
    "pdf",
    "Roteiros de interação",
  ),
  elementos: file(
    "elementos",
    "2025-1/EPs_PROVA1_Celpe_Bras_2025_1_PRINCIPAL_novo.pdf",
    "pdf",
    "Elementos provocadores",
  ),
};

export const files2025_2: Record<string, MaterialFile> = {
  caderno: file(
    "caderno",
    "2025-2/Tarefas_Celpe_Bras_PROVA1_2025_2_PRINCIPAL.pdf",
    "pdf",
    "Caderno de questões",
  ),
  "video-t1": file(
    "video-t1",
    "2025-2/celpe-bras-2025-2-tarefa-1-armario-coletivo_4y5J9KcQ.mp4",
    "video",
    "Tarefa 1 — Armário coletivo",
  ),
  "video-t2": file(
    "video-t2",
    "2025-2/CELPE-BRAS_2025_2_TAREFA-2_Selo_Arte.mp4",
    "video",
    "Tarefa 2 — Selo Arte",
  ),
  roteiros: file(
    "roteiros",
    "2025-2/Roteiros_PROVA1_Celpe_Bras_2025_2_PRINCIPAL.pdf",
    "pdf",
    "Roteiros de interação",
  ),
  elementos: file(
    "elementos",
    "2025-2/EPs_PROVA1_Celpe_Bras_2025_2_PRINCIPAL.pdf",
    "pdf",
    "Elementos provocadores",
  ),
};

/** Arquivos legados em arquivos/2026/… (servidor / MATERIALS_ROOT completo). */
export const files2026_1: Record<string, MaterialFile> = {
  caderno: file(
    "caderno",
    "arquivos/2026/1/caderno-questoes/Celpe_Bras_PROVA1_2026_1.pdf",
    "pdf",
    "Caderno de questões",
    true,
  ),
  "audio-t2": file(
    "audio-t2",
    "arquivos/2026/1/audio/CELPE-BRAS_2026_1_TAREFA-2_CARDAPIO_QRCODE_.mp4",
    "video",
    "Tarefa 2 — Cardápio QR Code",
    true,
  ),
  roteiros: file(
    "roteiros",
    "arquivos/2026/1/roteiro-interacao/Roteiros_PROVA2_Celpe_Bras_2026_1_PRINCIPAL.pdf",
    "pdf",
    "Roteiros de interação",
    true,
  ),
  elementos: file(
    "elementos",
    "arquivos/2026/1/elementos-provocadores/EPs_PROVA2_Celpe_Bras_2026_1_PRINCIPAL.pdf",
    "pdf",
    "Elementos provocadores",
    true,
  ),
  edital: file(
    "edital",
    "arquivos/2026/unknown/edital/EDITAL-No-8-DE-20-DE-FEVEREIRO-DE-2026-EDITAL-No-8-DE-20-DE-FEVEREIRO-DE-2026-DOU-Imprensa-Nacional.pdf",
    "pdf",
    "Edital 2026/1",
    true,
  ),
  "video-t1": file(
    "video-t1",
    "arquivos/2026/1/video/CELPE-BRAS_2026_1_TAREFA-1_FESTIVAL_FARTURA.mp4",
    "video",
    "Tarefa 1 — Festival Fartura",
    true,
  ),
};

const sessionRegistries: Record<string, Record<string, MaterialFile>> = {
  "2023-1": files2023_1,
  "2023-2": files2023_2,
  "2024-1": files2024_1,
  "2024-2": files2024_2,
  "2025-1": files2025_1,
  "2025-2": files2025_2,
  "2026-1": files2026_1,
};

export function getMaterialRegistry(sessionSlug: string) {
  return sessionRegistries[sessionSlug];
}

function materialRoot(entry: MaterialFile): string {
  if (entry.legacy) return path.resolve(process.env.MATERIALS_ROOT ?? MATERIALS_ROOT);
  const provasRoot = fs.existsSync(MATERIALS_ROOT_PROVAS) ? MATERIALS_ROOT_PROVAS : MATERIALS_ROOT;
  return path.resolve(provasRoot);
}

export function resolveMaterialPath(sessionSlug: string, materialId: string): string | null {
  const registry = getMaterialRegistry(sessionSlug);
  const entry = registry?.[materialId];
  if (!entry) return null;

  const root = materialRoot(entry);
  const absolute = path.resolve(root, entry.relativePath);
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
    ".htm": "text/html",
    ".html": "text/html",
  };
  return map[ext] ?? "application/octet-stream";
}
