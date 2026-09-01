import type { MaterialKind } from "@/lib/materials/registry";

export type SessionTask = {
  number: string;
  /** Authentic exam task title — stays in Portuguese on EN pages. */
  title: string;
  /** Task summary; may remain PT on EN pages when tied to source material. */
  description: string;
  state: "ok" | "missing";
  stateLabel: string;
  input: string;
  materialHref: string;
  materialAction: string;
};

export type SessionMaterial = {
  id: string;
  materialId: string;
  kind: MaterialKind;
  badge?: string;
  badgeVariant?: "default" | "neutral" | "missing";
  icon: string;
  title: string;
  description: string;
  category: string;
  action: string;
  href: string;
  dimmed: boolean;
};

export type ArchiveSession = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  application: string;
  resultDate: string;
  stats: { available: number; missing: number; missingLabel: string };
  blogAnalysis?: { href: string; label: string };
  /** Internal SEO link to the exam guide hub. */
  guideLink?: { href: string; label: string };
  materials: SessionMaterial[];
  tasks: SessionTask[];
  oralTopics: { roteiros: string[]; temas: string[] };
  faq: { question: string; answer: string }[];
  /** Sidebar note under stats (localized wrapper). */
  asideNote?: string;
};
