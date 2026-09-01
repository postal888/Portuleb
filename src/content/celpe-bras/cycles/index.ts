import { pathFor } from "@/i18n/route-map";

/**
 * Meta for an exam-cycle page under /pt-br/celpe-bras/{cycle}.
 * `cycle` follows the official notation: "2026" for the year hub, "2026-2" for
 * a single edition. These pages are rewritten each cycle, so `updatedAt` drives
 * the sitemap lastmod rather than a fixed publication date.
 */
export type ExamCycleMeta = {
  cycle: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
};

export const examCycleMetas: ExamCycleMeta[] = [];

export function examCyclePath(cycle: string): string {
  return pathFor("pt-br", "examCycle", { cycle });
}

export function getExamCycleMeta(cycle: string): ExamCycleMeta | undefined {
  return examCycleMetas.find((meta) => meta.cycle === cycle);
}
