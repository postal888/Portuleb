"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackGaPageView } from "@/lib/analytics/ga";

export function PageViewBeacon() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    // Remounts and StrictMode double-invocation must not inflate the count.
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    trackGaPageView(pathname);
    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
