import Image from "next/image";
import Link from "next/link";
import { siteBrand } from "@/lib/brand";

type SiteLogoProps = {
  variant?: "header" | "footer";
  linked?: boolean;
};

export function SiteLogo({ variant = "header", linked = true }: SiteLogoProps) {
  const isFooter = variant === "footer";

  const content = (
    <span className={`brand-lockup ${isFooter ? "brand-lockup-footer" : ""}`}>
      <span
        className={`brand-logo-wrap ${isFooter ? "h-14 w-14" : "h-12 w-12"}`}
        aria-hidden
      >
        <Image
          src={siteBrand.logoSrc}
          alt=""
          width={isFooter ? 56 : 48}
          height={isFooter ? 56 : 48}
          className="brand-logo-img"
          priority={variant === "header"}
        />
      </span>
      <span className="brand-text">
        <span className="brand-name">{siteBrand.name}</span>
        {!isFooter ? (
          <span className="brand-tagline">{siteBrand.tagline}</span>
        ) : null}
      </span>
    </span>
  );

  if (!linked) return content;

  return (
    <Link href="/pt-br" className="brand-link group">
      {content}
    </Link>
  );
}
