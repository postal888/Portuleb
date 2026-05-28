type Item = { num: number; title: string; text: string };

export function CelpeInstructionList({ items }: { items: readonly Item[] }) {
  return (
    <ol className="celpe-instruction-list">
      {items.map((item) => (
        <li key={item.num} className="celpe-instruction-block">
          <div className="celpe-instruction-tab" aria-hidden>
            <span className="celpe-instruction-num">{item.num}</span>
          </div>
          <div className="celpe-instruction-body">
            <h3 className="celpe-instruction-title">
              {item.num}. {item.title}
            </h3>
            <p className="celpe-instruction-text">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
