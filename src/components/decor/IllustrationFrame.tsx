import type { ReactNode } from "react";

/** Ink-sketch frame for hero illustrations — corners only, no floating badges. */
export function IllustrationFrame({ children }: { children: ReactNode }) {
  return (
    <div className="illustration-frame">
      <div className="illustration-frame-inner">{children}</div>
    </div>
  );
}
