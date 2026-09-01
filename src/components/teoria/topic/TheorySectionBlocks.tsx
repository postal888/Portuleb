import type { TheorySection } from "@/content/teoria/topics/types";

function SectionShell({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="lesson-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="lesson-section__head">
        <h2 id={`${id}-heading`} className="practice-section-title">
          {title}
        </h2>
        {intro ? <p className="practice-section-copy">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ProseBlock({ section }: { section: Extract<TheorySection, { kind: "prose" }> }) {
  return (
    <SectionShell id={section.id} title={section.title}>
      <div className="theory-prose">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </SectionShell>
  );
}

function RuleBlock({ section }: { section: Extract<TheorySection, { kind: "rule" }> }) {
  return (
    <SectionShell id={section.id} title={section.title} intro={section.intro}>
      <ol className="theory-rules">
        {section.items.map((item, index) => (
          <li key={item.label} className="theory-rule">
            <span className="theory-rule__num" aria-hidden>
              {index + 1}
            </span>
            <div className="theory-rule__body">
              <h3 className="theory-rule__label">{item.label}</h3>
              <p className="theory-rule__text">{item.text}</p>
              {item.example ? <p className="theory-example">{item.example}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

function TableBlock({ section }: { section: Extract<TheorySection, { kind: "table" }> }) {
  return (
    <SectionShell id={section.id} title={section.title} intro={section.intro}>
      <div className="theory-table-wrap">
        <table className="theory-table">
          {section.caption ? <caption>{section.caption}</caption> : null}
          <thead>
            <tr>
              {section.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cell} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.note ? <p className="theory-note">{section.note}</p> : null}
    </SectionShell>
  );
}

function ExamplesBlock({ section }: { section: Extract<TheorySection, { kind: "examples" }> }) {
  return (
    <SectionShell id={section.id} title={section.title} intro={section.intro}>
      <ul className="theory-examples">
        {section.items.map((item) => (
          <li key={item.text} className="theory-examples__item">
            <span className="theory-examples__text">{item.text}</span>
            {item.note ? <span className="theory-examples__note">{item.note}</span> : null}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function ContrastBlock({ section }: { section: Extract<TheorySection, { kind: "contrast" }> }) {
  return (
    <SectionShell id={section.id} title={section.title} intro={section.intro}>
      <div className="theory-contrast">
        {section.pairs.map((pair) => (
          <article key={`${pair.left}-${pair.right}`} className="theory-contrast__card">
            <div className="theory-contrast__cols">
              <div className="theory-contrast__col">
                <h3 className="theory-contrast__term">{pair.left}</h3>
                <p className="theory-contrast__gloss">{pair.leftGloss}</p>
              </div>
              <div className="theory-contrast__col">
                <h3 className="theory-contrast__term">{pair.right}</h3>
                <p className="theory-contrast__gloss">{pair.rightGloss}</p>
              </div>
            </div>
            <p className="theory-contrast__test">
              <span className="theory-contrast__test-label">Teste</span>
              {pair.test}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function MistakesBlock({ section }: { section: Extract<TheorySection, { kind: "mistakes" }> }) {
  return (
    <SectionShell id={section.id} title={section.title} intro={section.intro}>
      <ul className="theory-mistakes">
        {section.items.map((item) => (
          <li key={item.wrong} className="theory-mistake">
            <p className="theory-mistake__wrong">
              <span className="theory-mistake__tag theory-mistake__tag--wrong">Evite</span>
              {item.wrong}
            </p>
            <p className="theory-mistake__right">
              <span className="theory-mistake__tag theory-mistake__tag--right">Use</span>
              {item.right}
            </p>
            <p className="theory-mistake__why">{item.why}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

export function TheorySectionBlocks({ sections }: { sections: TheorySection[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.kind) {
          case "prose":
            return <ProseBlock key={section.id} section={section} />;
          case "rule":
            return <RuleBlock key={section.id} section={section} />;
          case "table":
            return <TableBlock key={section.id} section={section} />;
          case "examples":
            return <ExamplesBlock key={section.id} section={section} />;
          case "contrast":
            return <ContrastBlock key={section.id} section={section} />;
          case "mistakes":
            return <MistakesBlock key={section.id} section={section} />;
        }
      })}
    </>
  );
}
