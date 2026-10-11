import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeWriterMock } from "@/components/home/HomeWriterMock";
import { WRITING_TASK_IDS, getWritingTask, isWritingTaskId, writingTaskHref } from "@/content/writing/tasks";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ taskId: string }> };

export function generateStaticParams() {
  return WRITING_TASK_IDS.map((taskId) => ({ taskId }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { taskId } = await params;
  if (!isWritingTaskId(taskId)) return { title: "Tarefa não encontrada" };
  const task = getWritingTask(taskId);
  return {
    title: `${task.shortLabel}: ${task.title}`,
    description: task.prompt,
    alternates: { canonical: absoluteUrl(writingTaskHref(task.id)) },
  };
}

export default async function WritingTaskPage({ params }: Params) {
  const { taskId } = await params;
  if (!isWritingTaskId(taskId)) notFound();
  return <HomeWriterMock locale="pt-br" placement="practice" fixedTaskId={taskId} />;
}
