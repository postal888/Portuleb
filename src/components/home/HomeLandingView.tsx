import Link from "next/link";
import type { ReactNode } from "react";
import { HomeFeaturedBlog } from "@/components/home/HomeFeaturedBlog";
import { IconCheck, IconMail, IconPen } from "@/components/home/HomeIcons";
import { mockDisplay, mockDisplayCyrillic } from "@/components/home/home-mock-font";
import { getBlogPosts } from "@/content/blog";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import "./home-landing.css";

const BRAND_MARK = /(Celpe-Dê Pé|Celpe-Bras|Festival Fartura)/g;

function withBrandMarks(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(BRAND_MARK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push(
      <span key={`brand-${key++}`} translate="no">
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : text;
}

function BrandMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src="/images/celpe-de-pe-icon-mark.png?v=1"
      alt=""
      width={307}
      height={237}
      decoding="async"
      aria-hidden
    />
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function featuredHint(text: string): string {
  const value = text.trim().replace(/\s+/g, " ");
  if (value.length <= 96) return value;
  const cut = value.slice(0, 93);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 48 ? space : 93)}…`;
}

const EDITORIAL_BLOG_PHOTOS = [
  "/images/home-editorial/feat-blog.webp",
  "/images/home-editorial/door-guide.webp",
  "/images/home-editorial/door-exam.webp",
  "/images/home-editorial/door-study.webp",
  "/images/home-editorial/door-blog.webp",
  "/images/home-editorial/hero-write.webp",
] as const;

export function HomeLandingView({ locale }: { locale: Locale }) {
  const t = getUi(locale).home;
  const writingHref = localizedPath(locale, "practiceWriting");
  const provaHref = localizedPath(locale, "pastExamSession", { slug: "2026-1" });
  const blogItems = getBlogPosts(locale)
    .slice(0, 6)
    .map((post, index) => ({
      href: localizedPath(locale, "blogPost", { slug: post.slug }),
      title: post.title,
      hint: featuredHint(post.subtitle),
      photoSrc: EDITORIAL_BLOG_PHOTOS[index % EDITORIAL_BLOG_PHOTOS.length],
    }));

  const doors = [
    {
      href: localizedPath(locale, "celpeBras"),
      title: t.doorGuideTitle,
      desc: t.doorGuideDesc,
      photo: "/images/mock/person-guide.jpg?v=4",
      alt: t.photoGuide,
    },
    {
      href: localizedPath(locale, "pastExams"),
      title: t.doorExamTitle,
      desc: t.doorExamDesc,
      badge: t.doorExamBadge,
      photo: "/images/mock/person-exam.jpg?v=4",
      alt: t.photoExam,
    },
    {
      href: localizedPath(locale, "practice"),
      title: t.doorStudyTitle,
      desc: t.doorStudyDesc,
      photo: "/images/mock/person-study.jpg?v=4",
      alt: t.photoStudy,
      forks: [
        { href: localizedPath(locale, "theory"), label: t.forkTheory },
        { href: localizedPath(locale, "practice"), label: t.forkPractice },
      ],
    },
    {
      href: localizedPath(locale, "blog"),
      title: t.doorBlogTitle,
      desc: t.doorBlogDesc,
      photo: "/images/mock/person-blog.jpg?v=7",
      alt: t.photoBlog,
    },
  ] as const;

  const [ctaFirst, ...ctaRest] = t.ctaWrite.split(/\s+/);
  const ctaSecond = ctaRest.join(" ");

  return (
    <div
      className={`home-mock ${mockDisplay.variable} ${mockDisplayCyrillic.variable}${
        locale === "ru" ? " home-mock--cyrillic" : ""
      }`}
    >      <section className="home-mock-hero home-rise">
        <div className="home-mock-hero-glow" aria-hidden />
        <BrandMark className="home-mock-hero-mark" />
        <div className="home-mock-hero-copy">
          <div className="home-mock-hero-lead">
            <img
              className="home-mock-hero-photo"
              src="/images/mock/person-write.jpg?v=4"
              alt={t.photoWrite}
              width={160}
              height={160}
              fetchPriority="high"
              decoding="async"
            />
            <div className="home-mock-hero-main">
              <p className="home-mock-eyebrow">{t.eyebrow}</p>
              <div className="home-mock-hero-actions-top" aria-hidden="true" />
              <h1 className="home-mock-title">{t.title}</h1>
              <div className="home-mock-hero-actions">
                <Link href={writingHref} className="home-mock-cta home-mock-cta-stack">
                  <span>{ctaFirst}</span>
                  <span>
                    {ctaSecond}
                    <IconArrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
                <Link href={provaHref} className="home-mock-cta-quiet">
                  {t.ctaQuiet}
                </Link>
              </div>
              <ol className="home-mock-steps">
                <li>
                  <IconPen />
                  {t.stepWrite}
                </li>
                <li aria-hidden className="home-mock-step-gap">
                  <IconArrow className="home-mock-step-arrow" />
                </li>
                <li>
                  <IconMail />
                  {t.stepEmail}
                </li>
                <li aria-hidden className="home-mock-step-gap">
                  <IconArrow className="home-mock-step-arrow" />
                </li>
                <li>
                  <IconCheck />
                  {t.stepLevel}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <p className="home-mock-section-label">
        <BrandMark className="home-mock-section-mark" />
        {t.pathsLabel}
      </p>
      <ul className="home-mock-doors home-stagger">
        {doors.map((door) => {
          const body = (
            <>
              <img
                className="home-mock-photo"
                src={door.photo}
                alt={"forks" in door ? door.alt : ""}
                width={160}
                height={200}
                loading="lazy"
                decoding="async"
              />
              <span className="home-mock-door-copy">
                {"badge" in door ? <span className="home-mock-badge">{door.badge}</span> : null}
                <span className="home-mock-door-title">{withBrandMarks(door.title)}</span>
                <span className="home-mock-door-desc">{door.desc}</span>
                {"forks" in door ? (
                  <span className="home-mock-forks">
                    {door.forks.map((fork) => (
                      <Link key={fork.label} href={fork.href} className="home-mock-fork">
                        {fork.label}
                      </Link>
                    ))}
                  </span>
                ) : null}
              </span>
            </>
          );

          return (
            <li key={door.title}>
              {"forks" in door ? (
                <div className="home-mock-door">{body}</div>
              ) : (
                <Link href={door.href} className="home-mock-door">
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <section className="home-mock-featured home-rise home-rise-delay-3">
        <h2 className="home-mock-featured-title">{t.featuredTitle}</h2>
        <ul className="home-mock-featured-list">
          <li>
            <HomeFeaturedBlog
              kicker={t.featuredBlogKicker}
              items={blogItems}
              photoAlt=""
            />
          </li>
          <li>
            <Link href={localizedPath(locale, "celpeBras")} className="home-mock-featured-card">
              <img
                className="home-mock-photo"
                src="/images/home-editorial/feat-site.webp"
                alt=""
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
              />
              <span className="home-mock-featured-copy">
                <span className="home-mock-featured-kicker">{t.featuredSiteKicker}</span>
                <span className="home-mock-featured-name">{t.featuredSiteName}</span>
                <span className="home-mock-featured-hint">{t.featuredSiteHint}</span>
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {locale !== "ru" && t.independenceNote ? (
        <p className="home-mock-independence home-rise home-rise-delay-2">{t.independenceNote}</p>
      ) : null}
    </div>
  );
}
