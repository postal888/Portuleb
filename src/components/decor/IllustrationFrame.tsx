import type { ReactNode } from "react";

/** Clean frame for hero brand lockup — minimal, matches flat logo style. */
export function IllustrationFrame({ children }: { children: ReactNode }) {
  return <div className="brand-hero-frame">{children}</div>;
}
