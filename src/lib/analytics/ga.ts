export function getGaId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return id || null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGaPageView(path: string): void {
  const gaId = getGaId();
  if (!gaId || !path || path.startsWith("/admin")) return;
  window.gtag?.("config", gaId, { page_path: path });
}
