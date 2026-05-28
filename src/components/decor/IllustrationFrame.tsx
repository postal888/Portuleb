import type { ReactNode } from "react";

export function IllustrationFrame({ children }: { children: ReactNode }) {
  return (
    <div className="illustration-frame">
      <span className="illustration-frame-ring" aria-hidden />
      <span className="illustration-float illustration-float-a" aria-hidden>
        á
      </span>
      <span className="illustration-float illustration-float-b" aria-hidden>
        ç
      </span>
      <span className="illustration-float illustration-float-c" aria-hidden>
        õ
      </span>
      <div className="illustration-frame-inner">{children}</div>
    </div>
  );
}
