/** Ambient shapes on page background only — never on text surfaces. */
export function PageDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="decor-orb decor-orb-teal" style={{ top: "8%", right: "-4%" }} />
      <div className="decor-orb decor-orb-accent" style={{ top: "42%", left: "-6%" }} />
      <div className="decor-orb decor-orb-teal-sm" style={{ bottom: "12%", right: "18%" }} />
      <svg className="decor-grid" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="site-dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="var(--site-primary)" opacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#site-dot-grid)" />
      </svg>
    </div>
  );
}
