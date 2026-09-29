import { Literata, Newsreader } from "next/font/google";

/** Latin display for PT/EN hero & writer. */
export const mockDisplay = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-mock-display",
  display: "swap",
});

/** Cyrillic-capable display for RU (Newsreader has no Cyrillic glyphs). */
export const mockDisplayCyrillic = Literata({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-mock-display-cyrillic",
  display: "swap",
});
