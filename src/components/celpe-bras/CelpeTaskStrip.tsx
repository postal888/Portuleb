import { writtenTasks2026_1 } from "@/content/celpe-bras/exam-instructions";

const taskColors = ["celpe-task-1", "celpe-task-2", "celpe-task-3", "celpe-task-4"] as const;

export function CelpeTaskStrip() {
  return (
    <div className="celpe-task-strip">
      <p className="celpe-task-strip-label">Quatro tarefas da parte escrita (2026/1)</p>
      <ul className="celpe-task-grid">
        {writtenTasks2026_1.map((task, i) => (
          <li key={task.num} className={`celpe-task-chip ${taskColors[i]}`}>
            <span className="celpe-task-chip-num">{task.num}</span>
            <span className="celpe-task-chip-label">{task.label}</span>
            <span className="celpe-task-chip-type">{task.type}</span>
            <span className="celpe-task-chip-time">{task.minutes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
