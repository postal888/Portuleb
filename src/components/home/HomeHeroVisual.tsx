type HomeHeroVisualProps = {
  progressLabel: string;
  progressLevel: string;
  journeyLabel: string;
  journeyHint: string;
};

/** Decorative floating widgets inspired by the green-minimal reference. */
export function HomeHeroVisual({
  progressLabel,
  progressLevel,
  journeyLabel,
  journeyHint,
}: HomeHeroVisualProps) {
  const pct = 68;
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);

  return (
    <div className="home-hero-visual" aria-hidden>
      <div className="home-hero-blob" />

      <div className="home-float-card home-float-progress">
        <p className="home-float-label">{progressLabel}</p>
        <div className="home-progress-ring-wrap">
          <svg className="home-progress-ring" viewBox="0 0 100 100">
            <circle className="home-progress-track" cx="50" cy="50" r={r} />
            <circle
              className="home-progress-value"
              cx="50"
              cy="50"
              r={r}
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="home-progress-pct">{pct}%</span>
        </div>
        <div className="home-progress-bars">
          <span className="home-bar home-bar-a" />
          <span className="home-bar home-bar-b" />
          <span className="home-bar home-bar-c" />
        </div>
        <p className="home-float-level">{progressLevel}</p>
      </div>

      <div className="home-float-card home-float-journey">
        <p className="home-float-label">{journeyLabel}</p>
        <svg className="home-mountain" viewBox="0 0 220 120" fill="none">
          <path
            d="M10 105 L70 45 L95 70 L140 25 L210 105 Z"
            fill="url(#mt-fill)"
            stroke="var(--site-primary)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M70 45 L78 55 L88 48 L95 70"
            stroke="var(--site-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 105 C55 88, 80 92, 100 78 C120 64, 145 58, 175 70"
            stroke="var(--site-primary)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeDasharray="1 7"
          />
          <circle cx="55" cy="92" r="4" fill="var(--site-accent)" />
          <circle cx="100" cy="78" r="4" fill="var(--site-accent)" />
          <circle cx="145" cy="62" r="4" fill="var(--site-primary)" />
          <path
            d="M140 25 L140 8"
            stroke="var(--site-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M140 8 L158 14 L140 20 Z" fill="var(--site-accent)" />
          <defs>
            <linearGradient id="mt-fill" x1="110" y1="25" x2="110" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--site-primary-highlight)" />
              <stop offset="1" stopColor="var(--site-surface-2)" />
            </linearGradient>
          </defs>
        </svg>
        <p className="home-float-hint">{journeyHint}</p>
      </div>
    </div>
  );
}
