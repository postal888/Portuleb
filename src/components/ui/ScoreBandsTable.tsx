const scoreBands = [
  { range: "2,00 a 2,75", level: "Intermediário" },
  { range: "2,76 a 3,50", level: "Intermediário Superior" },
  { range: "3,51 a 4,25", level: "Avançado" },
  { range: "4,26 a 5,00", level: "Avançado Superior" },
] as const;

export function ScoreBandsTable() {
  return (
    <div className="surface-card mt-5 overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">
        <caption className="sr-only">Faixas de pontuação e níveis de certificação do Celpe-Bras</caption>
        <thead>
          <tr className="border-b border-tan/40 bg-[var(--site-primary-highlight)]">
            <th
              scope="col"
              className="px-4 py-3.5 font-semibold tracking-wide text-teal sm:px-5"
            >
              Pontuação
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 font-semibold tracking-wide text-teal sm:px-5"
            >
              Nível certificado
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
