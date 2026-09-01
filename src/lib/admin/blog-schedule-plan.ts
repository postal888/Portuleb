import type { ImportHints } from "./blog-import";
import { resolveBlogLocale } from "@/lib/blog/locale";
import type { Locale } from "@/i18n/locales";
import {
  formatZonedDateTimeInput,
  formatZonedDisplay,
  parseCustomPlanJson,
  resolveScheduleTimezone,
  zonedDateTimeInputToUtc,
  type CustomPlanEntry,
} from "./schedule-timezone";

export type ScheduleIntervalUnit = "hours" | "days";

export type BulkScheduleInput = {
  startAtLocal: string;
  intervalAmount: number;
  intervalUnit: ScheduleIntervalUnit;
  timeZone?: string;
  defaultLocale?: Locale;
};

export type BulkSchedulePlanItem = {
  index: number;
  title: string;
  slug: string;
  locale: Locale;
  seoTitle?: string;
  category: string;
  readTime: string;
  faqCount?: number;
  publishAtUtc: string;
  publishAtInput: string;
  publishAtLocal: string;
};

export function resolveArticleLocale(
  article: ImportHints,
  index: number,
  defaultLocale: Locale,
  customPlan?: CustomPlanEntry[] | null,
): Locale {
  const customLocale = customPlan?.find((row) => row.index === index)?.locale;
  if (customLocale) return resolveBlogLocale(customLocale);
  return resolveBlogLocale(article.post.locale ?? defaultLocale);
}

export function parseScheduleInterval(input: {
  intervalAmount?: unknown;
  intervalDays?: unknown;
  intervalUnit?: unknown;
}): { amount: number; unit: ScheduleIntervalUnit; intervalMs: number } {
  const unitRaw = String(input.intervalUnit ?? "days").toLowerCase();
  const unit: ScheduleIntervalUnit = unitRaw === "hours" ? "hours" : "days";
  const fallbackDays = Number(input.intervalDays);
  const amountRaw = Number(input.intervalAmount);
  const amount = Math.max(
    1,
    Number.isFinite(amountRaw) && amountRaw > 0
      ? Math.round(amountRaw)
      : Number.isFinite(fallbackDays) && fallbackDays > 0
        ? Math.round(fallbackDays)
        : 7,
  );
  const intervalMs = unit === "hours" ? amount * 3600000 : amount * 86400000;
  return { amount, unit, intervalMs };
}

export function formatIntervalLabel(amount: number, unit: ScheduleIntervalUnit): string {
  if (unit === "hours") return amount === 1 ? "1 hora" : `${amount} horas`;
  return amount === 1 ? "1 dia" : `${amount} dias`;
}

export function computePublishAtUtcFromStart(
  startAtLocal: string,
  index: number,
  intervalMs: number,
  timeZone: string,
): string {
  const startUtc = zonedDateTimeInputToUtc(startAtLocal, timeZone);
  const startMs = Date.parse(startUtc);
  return new Date(startMs + index * intervalMs).toISOString();
}

export function buildBulkSchedulePlan(
  articles: ImportHints[],
  input: BulkScheduleInput,
  customPlan?: CustomPlanEntry[] | null,
): BulkSchedulePlanItem[] {
  const timeZone = resolveScheduleTimezone(input.timeZone);
  const defaultLocale = resolveBlogLocale(input.defaultLocale);
  const { intervalMs } = parseScheduleInterval({
    intervalAmount: input.intervalAmount,
    intervalUnit: input.intervalUnit,
  });
  const customByIndex = new Map(customPlan?.map((row) => [row.index, row.publishAtLocal]));

  return articles.map((article, index) => {
    const publishAtInput =
      customByIndex.get(index) ??
      formatZonedDateTimeInput(
        computePublishAtUtcFromStart(input.startAtLocal, index, intervalMs, timeZone),
        timeZone,
      );
    const publishAtUtc = zonedDateTimeInputToUtc(publishAtInput, timeZone);

    return {
      index,
      title: article.title,
      slug: article.slug,
      locale: resolveArticleLocale(article, index, defaultLocale, customPlan),
      seoTitle: article.seoTitle ?? article.post.seoTitle,
      category: article.category,
      readTime: article.readTime,
      faqCount: article.post.faq?.length,
      publishAtUtc,
      publishAtInput,
      publishAtLocal: formatZonedDisplay(publishAtUtc, timeZone),
    };
  });
}

export function resolveBulkPublishTimes(
  count: number,
  input: BulkScheduleInput,
  customPlanJson?: string | null,
): string[] {
  const timeZone = resolveScheduleTimezone(input.timeZone);
  const custom = parseCustomPlanJson(customPlanJson);
  const { intervalMs } = parseScheduleInterval({
    intervalAmount: input.intervalAmount,
    intervalUnit: input.intervalUnit,
  });

  const times: string[] = [];
  for (let i = 0; i < count; i++) {
    const customLocal = custom?.find((row) => row.index === i)?.publishAtLocal;
    if (customLocal) {
      times.push(zonedDateTimeInputToUtc(customLocal, timeZone));
    } else {
      times.push(computePublishAtUtcFromStart(input.startAtLocal, i, intervalMs, timeZone));
    }
  }
  return times;
}
