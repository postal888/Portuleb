import { describe, expect, it } from "vitest";
import { archiveSlugs, getArchiveSession } from "@/content/archive";
import { resolveMaterialPath } from "@/lib/materials/registry";

describe("provas anteriores added beside the live editions", () => {
  it("keeps the seven published editions first, with the same 2023/1 labels", () => {
    expect(archiveSlugs.slice(0, 7)).toEqual([
      "2026-1",
      "2025-2",
      "2025-1",
      "2024-2",
      "2024-1",
      "2023-2",
      "2023-1",
    ]);
    const session = getArchiveSession("2023-1", "pt-br");
    expect(session?.title).toBe("Celpe-Bras 2023/1");
    expect(session?.tasks[1]?.stateLabel).toBe("Áudio");
    expect(session?.tasks[1]?.input).toBe("Insumo: áudio/vídeo");
    expect(session?.materials.find((item) => item.id === "video-t2")?.action).toBe("Assistir");
    expect(getArchiveSession("2026-1", "pt-br")?.title).toBe("Celpe-Bras 2026/1");
  });

  it("adds 2010–2022 and the two repeat sittings without the years before 2010", () => {
    expect(archiveSlugs).toContain("2010-1");
    expect(archiveSlugs).toContain("2022-2");
    expect(archiveSlugs).toContain("2016-1-2");
    expect(archiveSlugs).toContain("2024-2-2");
    expect(archiveSlugs).not.toContain("1998-1");
    expect(archiveSlugs).not.toContain("2009-2");
    expect(getArchiveSession("2022-2", "pt-br")?.title).toBe("Celpe-Bras 2022/2");
    expect(getArchiveSession("2022-2", "pt-br")?.application).toBe("18 a 20/10/2022");
    expect(getArchiveSession("2016-1-2", "pt-br")?.title).toBe("Celpe-Bras 2016/1, reaplicação");
    expect(getArchiveSession("2024-2-2", "pt-br")?.title).toBe("Celpe-Bras 2024/2, Granada");
    expect(getArchiveSession("2013-2", "pt-br")?.materials.find((item) => item.id === "roteiros")?.dimmed).toBe(
      true,
    );
  });

  it("reads new files from the acervo folder and leaves 2026/1 on its current path", () => {
    const previous = process.env.ACERVO_ROOT;
    process.env.ACERVO_ROOT = "C:\\acervo-root";
    try {
      const caderno = resolveMaterialPath("2022-2", "caderno");
      expect(caderno?.replaceAll("\\", "/")).toContain(
        "acervo-root/provas/arquivos/2022-2/celpe-bras-2022-2-caderno-de-questoes.pdf",
      );
      const repeatOral = resolveMaterialPath("2016-1-2", "roteiros");
      const regularOral = resolveMaterialPath("2016-1", "roteiros");
      expect(repeatOral).toBe(regularOral);
      const granadaOral = resolveMaterialPath("2024-2-2", "roteiros");
      const regular2024 = resolveMaterialPath("2024-2", "roteiros");
      expect(granadaOral).toBe(regular2024);
      const live = resolveMaterialPath("2026-1", "caderno");
      expect(live?.replaceAll("\\", "/")).not.toContain("/acervo/");
      expect(live?.replaceAll("\\", "/")).toContain("arquivos/2026/1/caderno-questoes/");
    } finally {
      if (previous === undefined) delete process.env.ACERVO_ROOT;
      else process.env.ACERVO_ROOT = previous;
    }
  });
});
