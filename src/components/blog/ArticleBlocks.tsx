import type { ArticleBlock } from "@/content/blog/types";

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index}>
                {block.lead ? (
                  <strong>{block.leadLabel ?? "Introdução"}. </strong>
                ) : null}
                {block.content}
              </p>
            );
          case "lexGrid":
            return (
              <div key={index} className="blog-lex-grid">
                {block.columns.map((col) => (
                  <div key={col.title} className="blog-lex-card">
                    <h4>{col.title}</h4>
                    <ul>
                      {col.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case "h2":
            return <h2 key={index}>{block.content}</h2>;
          case "h3":
            return <h3 key={index}>{block.content}</h3>;
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div key={index} className="blog-callout">
                <p>
                  <strong>{block.title}</strong> {block.content}
                </p>
              </div>
            );
          case "scale":
            return (
              <div key={index} className="blog-scale">
                <strong>{block.title}</strong>
                <p>{block.content}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
