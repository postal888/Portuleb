import type { PracticeLesson } from "@/content/practice/types";
import { AnnotatedTextSection } from "./AnnotatedTextSection";
import { ExpressionCardGrid } from "./ExpressionCardGrid";
import { LessonFooterNote } from "./LessonFooterNote";
import { PracticeLessonHero } from "./PracticeLessonHero";
import { PracticeLessonInteractive } from "./PracticeLessonInteractive";

type Props = {
  lesson: PracticeLesson;
  practiceHref?: string;
};

export function PracticeLessonPage({ lesson, practiceHref = "/pt-br/pratica" }: Props) {
  return (
    <main className="practice-hub lesson-hub">
      <div className="practice-wrap">
        <PracticeLessonHero lesson={lesson} practiceHref={practiceHref} />
        <AnnotatedTextSection
          sectionTitle={lesson.annotatedText.sectionTitle}
          intro={lesson.annotatedText.intro}
          blocks={lesson.annotatedText.blocks}
        />
        <ExpressionCardGrid
          sectionTitle={lesson.expressions.sectionTitle}
          intro={lesson.expressions.intro}
          cards={lesson.expressions.cards}
        />
        <PracticeLessonInteractive lesson={lesson} />
        <LessonFooterNote
          title={lesson.closingNote.title}
          body={lesson.closingNote.body}
          links={lesson.closingNote.links}
        />
      </div>
    </main>
  );
}
