import { useState } from "react";
import { Plus, CheckCircle2, Circle, Calendar, AlertCircle, ChevronRight } from "lucide-react";
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

const priorityColor: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

export function AgendaPanel({ tasks, subjects, onToggleTask, onAddTask }: AgendaPanelProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");

  const pending = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

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
    <aside className="w-72 h-full flex flex-col bg-white border-l border-gray-100 flex-shrink-0">
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <h2 className="text-gray-900" style={{ fontSize: "15px", fontWeight: 600 }}>
              Agenda
            </h2>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Date display */}
        <p className="text-gray-400 mt-1" style={{ fontSize: "12px" }}>
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>

        {/* Stats */}
        <div className="flex gap-3 mt-3">
          <div className="flex-1 bg-indigo-50 rounded-lg p-2.5 text-center">
            <p className="text-indigo-700" style={{ fontSize: "18px", fontWeight: 700 }}>
              {pending.length}
            </p>
            <p className="text-indigo-500" style={{ fontSize: "10px" }}>pendentes</p>
          </div>
          <div className="flex-1 bg-green-50 rounded-lg p-2.5 text-center">
            <p className="text-green-700" style={{ fontSize: "18px", fontWeight: 700 }}>
              {done.length}
            </p>
            <p className="text-green-600" style={{ fontSize: "10px" }}>concluídas</p>
          </div>
        </div>
      </div>

      {/* Add task form */}
      {showAdd && (
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0">
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
                className={`flex-1 py-1.5 rounded-md border transition-all`}
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  borderColor: newPriority === p ? priorityColor[p] : "#e5e7eb",
                  color: newPriority === p ? priorityColor[p] : "#9ca3af",
                  backgroundColor: newPriority === p ? priorityColor[p] + "10" : "white",
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
                {pending.map((task) => {
                  const { label, urgent } = getDueDateLabel(task.dueDate);
                  const subject = subjects.find((s) => s.id === task.subjectId);
                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all group"
                    >
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-0.5 flex-shrink-0 text-gray-300 hover:text-indigo-500 transition-colors"
                      >
                        <Circle className="w-4 h-4" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-gray-800 leading-snug"
                          style={{ fontSize: "12px", fontWeight: 500 }}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <div
                            className="flex items-center gap-1"
                            style={{ color: urgent ? "#ef4444" : "#9ca3af" }}
                          >
                            {urgent && <AlertCircle className="w-3 h-3" />}
                            <span style={{ fontSize: "10px", fontWeight: 500 }}>{label}</span>
                          </div>
                          {subject && (
                            <span
                              className="px-1.5 py-0.5 rounded"
                              style={{
                                fontSize: "10px",
                                backgroundColor: subject.color + "15",
                                color: subject.color,
                                fontWeight: 500,
                              }}
                            >
                              {subject.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ backgroundColor: priorityColor[task.priority] }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Completed */}
        {done.length > 0 && (
          <div className="px-4 pt-4 pb-4">
            <p
              className="text-gray-400 uppercase tracking-wider mb-2 px-1"
              style={{ fontSize: "10px", fontWeight: 600 }}
            >
              Concluídas
            </p>
            <div className="space-y-1.5">
              {done.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 bg-gray-50 opacity-60"
                >
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-0.5 flex-shrink-0 text-green-500"
                  >
                    <CheckCircle2 className="w-4 h-4" />
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
          </div>
        )}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-gray-400" style={{ fontSize: "13px" }}>
              Nenhuma tarefa ainda
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
