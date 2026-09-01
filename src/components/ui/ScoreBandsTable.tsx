import type { Locale } from "@/i18n/locales";

const scoreBandsPt = [
  { range: "2,00 a 2,75", level: "Intermediário" },
  { range: "2,76 a 3,50", level: "Intermediário Superior" },
  { range: "3,51 a 4,25", level: "Avançado" },
  { range: "4,26 a 5,00", level: "Avançado Superior" },
] as const;

const scoreBandsEn = [
  { range: "2.00 – 2.75", level: "Intermediate" },
  { range: "2.76 – 3.50", level: "Upper Intermediate" },
  { range: "3.51 – 4.25", level: "Advanced" },
  { range: "4.26 – 5.00", level: "Upper Advanced" },
] as const;

const scoreBandsRu = [
  { range: "2,00 – 2,75", level: "Средний" },
  { range: "2,76 – 3,50", level: "Средний продвинутый" },
  { range: "3,51 – 4,25", level: "Продвинутый" },
  { range: "4,26 – 5,00", level: "Высокий продвинутый" },
] as const;

export function ScoreBandsTable({ locale = "pt-br" }: { locale?: Locale }) {
  const scoreBands =
    locale === "en" ? scoreBandsEn : locale === "ru" ? scoreBandsRu : scoreBandsPt;
  const caption =
    locale === "en"
      ? "Celpe-Bras score bands and certification levels"
      : locale === "ru"
        ? "Диапазоны баллов и уровни сертификации Celpe-Bras"
        : "Faixas de pontuação e níveis de certificação do Celpe-Bras";
  const colScore =
    locale === "en" ? "Score" : locale === "ru" ? "Баллы" : "Pontuação";
  const colLevel =
    locale === "en" ? "Certified level" : locale === "ru" ? "Уровень" : "Nível certificado";

  return (
    <div className="surface-card mt-5 overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-tan/40 bg-[var(--site-primary-highlight)]">
            <th
              scope="col"
              className="px-4 py-3.5 font-semibold tracking-wide text-teal sm:px-5"
            >
              {colScore}
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 font-semibold tracking-wide text-teal sm:px-5"
            >
              {colLevel}
            </th>
          </tr>
        </thead>
        <tbody>
          {scoreBands.map((row, index) => (
            <tr
              key={row.level}
              className={
                index < scoreBands.length - 1 ? "border-b border-tan/25" : undefined
              }
            >
              <td className="whitespace-nowrap px-4 py-3.5 font-medium tabular-nums text-charcoal sm:px-5">
                {row.range}
              </td>
              <td className="px-4 py-3.5 text-charcoal/90 sm:px-5">{row.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
