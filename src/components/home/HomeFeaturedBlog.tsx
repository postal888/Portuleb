"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type FeaturedBlogItem = {
  href: string;
  title: string;
  hint: string;
  photoSrc?: string;
};

const ROTATE_MS = 4800;

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

export function HomeFeaturedBlog({
  kicker,
  items,
  photoAlt = "",
}: {
  kicker: string;
  items: FeaturedBlogItem[];
  photoAlt?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (items.length < 2 || paused || reduced || hidden) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length, paused, reduced, hidden]);

  if (items.length === 0) return null;

  const current = items[index] ?? items[0];
  const progressPaused = paused || reduced || hidden;

  return (
    <div
      className="home-mock-featured-rotate"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchRef.current = event.changedTouches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(event) => {
        if (items.length < 2) return;
        const x = event.changedTouches[0]?.clientX ?? touchRef.current;
        const delta = x - touchRef.current;
        if (Math.abs(delta) < 40) return;
        setIndex((current) =>
          delta < 0 ? (current + 1) % items.length : (current - 1 + items.length) % items.length,
        );
      }}
    >
      <div className="home-mock-featured-card home-mock-featured-card--blog">
        <Link href={current.href} className="home-mock-featured-card-main">
          <span className="home-mock-featured-photo" aria-hidden={photoAlt ? undefined : true}>
            {items.map((item, itemIndex) =>
              item.photoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item.href}
                  className={`home-mock-photo home-mock-featured-photo-img${
                    itemIndex === index ? " is-active" : ""
                  }`}
                  src={item.photoSrc}
                  alt={itemIndex === index ? photoAlt : ""}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                />
              ) : null,
            )}
          </span>
          <span className="home-mock-featured-copy home-mock-featured-stage" aria-live="polite">
            <span className="home-mock-featured-kicker">{kicker}</span>
            {items.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <span
                  key={item.href}
                  className={`home-mock-featured-slide${active ? " is-active" : ""}`}
                  aria-hidden={!active}
                >
                  <span className="home-mock-featured-name">{withBrandMarks(item.title)}</span>
                  <span className="home-mock-featured-hint">{item.hint}</span>
                </span>
              );
            })}
          </span>
        </Link>
        {items.length > 1 ? (
          <div className="home-mock-featured-dots" role="tablist" aria-label={kicker}>
            {items.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <button
                  key={item.href}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={item.title}
                  className={`home-mock-featured-dot${active ? " is-active" : ""}`}
                  onClick={() => setIndex(itemIndex)}
                />
              );
            })}
            <span
              key={`${index}-${progressPaused}`}
              className={`home-mock-featured-progress${progressPaused ? " is-paused" : ""}`}
              style={{ animationDuration: `${ROTATE_MS}ms` }}
              aria-hidden
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
