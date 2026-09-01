import { archiveAnchors, materialHash } from "@/i18n/anchors";
import type { ArchiveSession } from "./types";

function remapHref(href: string): string {
  const a = archiveAnchors("ru");
  const sectionMap: Record<string, string> = {
    "#materiais": `#${a.materials}`,
    "#parte-escrita": `#${a.written}`,
    "#parte-oral": `#${a.oral}`,
    "#visualizar": `#${a.viewOnSite}`,
  };
  if (sectionMap[href]) return sectionMap[href];
  if (href.startsWith("#material-")) {
    const id = href.slice("#material-".length);
    return materialHash("ru", id);
  }
  return href;
}

export function localizeArchiveSessionForRu(session: ArchiveSession): ArchiveSession {
  return {
    ...session,
    materials: session.materials.map((m) => ({
      ...m,
      href: remapHref(m.href),
    })),
    tasks: session.tasks.map((t) => ({
      ...t,
      ...(t.materialHref ? { materialHref: remapHref(t.materialHref) } : {}),
    })),
  };
}
