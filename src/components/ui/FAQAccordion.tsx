type FAQItem = { question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-tan/40 bg-cream open:border-teal/30"
        >
          <summary className="cursor-pointer list-none px-5 py-4 font-medium text-teal marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-xl leading-none text-orange transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <div className="border-t border-tan/20 px-5 pb-4 pt-2 text-sm leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
