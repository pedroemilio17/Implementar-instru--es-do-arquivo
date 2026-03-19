import { useState } from "react";
import { Plus, CheckCircle2, Circle, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Task, Subject } from "./types";
import { format, isToday, isTomorrow, isPast, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AgendaPanelProps {
  tasks: Task[];
  subjects: Subject[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<Task, "id">) => void;
}

function getDueDateLabel(date: Date): { label: string; urgent: boolean } {
  if (isPast(date) && !isToday(date)) return { label: "Atrasado", urgent: true };
  if (isToday(date)) return { label: "Hoje", urgent: true };
  if (isTomorrow(date)) return { label: "Amanhã", urgent: false };
  const days = differenceInDays(date, new Date());
  return { label: `${days} dias`, urgent: days <= 3 };
}

const MAX_VISIBLE = 3;

export function AgendaPanel({ tasks, subjects, onToggleTask, onAddTask }: AgendaPanelProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [showAllPending, setShowAllPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");

  const pending = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  const visiblePending = showAllPending ? pending : pending.slice(0, MAX_VISIBLE);
  const hasMorePending = pending.length > MAX_VISIBLE;

  const handleAdd = () => {
    if (!newTitle.trim() || !newDueDate) return;
    onAddTask({
      title: newTitle.trim(),
      dueDate: new Date(newDueDate + "T12:00:00"),
      completed: false,
      priority: newPriority,
    });
    setNewTitle("");
    setNewDueDate("");
    setNewPriority("medium");
    setShowAdd(false);
  };

  return (
    <aside className="w-72 h-full flex flex-col bg-gray-50/80 border-l border-gray-100/80 flex-shrink-0">
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-100/60 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <h2 className="text-gray-700" style={{ fontSize: "14px", fontWeight: 600 }}>
              Agenda
            </h2>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-200/60 hover:text-gray-600 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-gray-400 mt-1" style={{ fontSize: "11px" }}>
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>

        {/* Subtle stats inline */}
        {tasks.length > 0 && (
          <p className="text-gray-400 mt-1.5" style={{ fontSize: "11px" }}>
            {pending.length} pendente{pending.length !== 1 && "s"}
            {done.length > 0 && ` · ${done.length} concluída${done.length !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      {/* Add task form */}
      {showAdd && (
        <div className="px-4 py-3 border-b border-gray-100/60 bg-white/50 flex-shrink-0">
          <input
            type="text"
            placeholder="Título da tarefa..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-indigo-300 bg-white text-gray-700 placeholder-gray-400 mb-2"
            style={{ fontSize: "13px" }}
            autoFocus
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-indigo-300 bg-white text-gray-700 mb-2"
            style={{ fontSize: "13px" }}
          />
          <div className="flex gap-1.5 mb-2">
            {(["high", "medium", "low"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setNewPriority(p)}
                className="flex-1 py-1.5 rounded-md border transition-all"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  borderColor: newPriority === p ? (p === "high" ? "#ef4444" : p === "medium" ? "#f59e0b" : "#10b981") : "#e5e7eb",
                  color: newPriority === p ? (p === "high" ? "#ef4444" : p === "medium" ? "#f59e0b" : "#10b981") : "#9ca3af",
                  backgroundColor: newPriority === p ? (p === "high" ? "#fef2f2" : p === "medium" ? "#fffbeb" : "#ecfdf5") : "white",
                }}
              >
                {p === "high" ? "Alta" : p === "medium" ? "Média" : "Baixa"}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdd(false)}
              className="flex-1 py-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-all border border-gray-200"
              style={{ fontSize: "12px" }}
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              disabled={!newTitle.trim() || !newDueDate}
              className="flex-1 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}

      {/* Task list */}
      <div className="flex-1 overflow-y-auto">
        {/* Pending */}
        <div className="px-4 pt-4">
          {pending.length > 0 && (
            <>
              <p
                className="text-gray-400 uppercase tracking-wider mb-2 px-1"
                style={{ fontSize: "10px", fontWeight: 600 }}
              >
                Pendentes
              </p>
              <div className="space-y-1.5">
                {visiblePending.map((task) => {
                  const { label, urgent } = getDueDateLabel(task.dueDate);
                  const subject = subjects.find((s) => s.id === task.subjectId);
                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100/60 bg-white/60 hover:bg-white transition-all group"
                    >
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-0.5 flex-shrink-0 text-gray-300 hover:text-indigo-500 transition-colors"
                      >
                        <Circle className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-gray-700 leading-snug"
                          style={{ fontSize: "12px", fontWeight: 500 }}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 500,
                              color: urgent ? "#ef4444" : "#9ca3af",
                            }}
                          >
                            {label}
                          </span>
                          {subject && (
                            <span
                              className="px-1.5 py-0.5 rounded"
                              style={{
                                fontSize: "10px",
                                backgroundColor: subject.color + "10",
                                color: subject.color,
                                fontWeight: 500,
                              }}
                            >
                              {subject.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show more / less */}
              {hasMorePending && (
                <button
                  onClick={() => setShowAllPending(!showAllPending)}
                  className="w-full flex items-center justify-center gap-1 mt-2 py-1.5 text-gray-400 hover:text-gray-600 transition-all"
                  style={{ fontSize: "11px", fontWeight: 500 }}
                >
                  {showAllPending ? (
                    <>
                      Mostrar menos <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      Ver mais {pending.length - MAX_VISIBLE} <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* Completed — collapsible */}
        {done.length > 0 && (
          <div className="px-4 pt-3 pb-4">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-500 transition-all mb-2 px-1"
              style={{ fontSize: "10px", fontWeight: 600 }}
            >
              <span className="uppercase tracking-wider">Concluídas ({done.length})</span>
              {showCompleted ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showCompleted && (
              <div className="space-y-1">
                {done.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100/40 bg-gray-50/50 opacity-50"
                  >
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="mt-0.5 flex-shrink-0 text-green-500"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                    <p
                      className="text-gray-500 line-through"
                      style={{ fontSize: "12px", fontWeight: 400 }}
                    >
                      {task.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-gray-100/80 flex items-center justify-center mb-3">
              <Calendar className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-gray-400" style={{ fontSize: "12px" }}>
              Nenhuma tarefa ainda
            </p>
            <p className="text-gray-400 mt-0.5" style={{ fontSize: "11px" }}>
              Clique em + para adicionar
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
