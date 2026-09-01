import Link from "next/link";

type Props = {
  title: string;
  body: string;
  links: { label: string; href: string }[];
};

export function LessonFooterNote({ title, body, links }: Props) {
  return (
    <aside className="lesson-footer-note" aria-labelledby="lesson-next-heading">
      <h2 id="lesson-next-heading" className="lesson-footer-note__title">
        {title}
      </h2>
      <p className="lesson-footer-note__body">{body}</p>
      <nav className="lesson-footer-note__links" aria-label="Links relacionados">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="practice-linkline">
            {link.label} →
          </Link>
        ))}
      </nav>
    </aside>
  );
}
