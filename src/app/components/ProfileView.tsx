import { BookOpen, StickyNote, CheckCircle2, Clock, Settings } from "lucide-react";
import { Note, Task, Subject } from "./types";

interface ProfileViewProps {
  notes: Note[];
  tasks: Task[];
  subjects: Subject[];
  onOpenSettings: () => void;
}

export function ProfileView({ notes, tasks, subjects, onOpenSettings }: ProfileViewProps) {
  const doneTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
      {/* User card */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-6 mb-5 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white" style={{ fontSize: "24px", fontWeight: 700 }}>A</span>
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700 }}>Ana Lima</h2>
            <p style={{ fontSize: "13px", opacity: 0.8 }}>ana.lima@email.com</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p style={{ fontSize: "22px", fontWeight: 700 }}>{notes.length}</p>
            <p style={{ fontSize: "10px", opacity: 0.8 }}>anotações</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p style={{ fontSize: "22px", fontWeight: 700 }}>{subjects.length}</p>
            <p style={{ fontSize: "10px", opacity: 0.8 }}>matérias</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p style={{ fontSize: "22px", fontWeight: 700 }}>{doneTasks}</p>
            <p style={{ fontSize: "10px", opacity: 0.8 }}>tarefas feitas</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="space-y-3 mb-5">
        <h3 className="text-gray-700" style={{ fontSize: "14px", fontWeight: 600 }}>
          Visão geral
        </h3>
        {[
          { icon: StickyNote, label: "Anotações criadas", value: notes.length, color: "#6366f1" },
          { icon: BookOpen, label: "Matérias ativas", value: subjects.length, color: "#0ea5e9" },
          { icon: CheckCircle2, label: "Tarefas concluídas", value: doneTasks, color: "#10b981" },
          { icon: Clock, label: "Tarefas pendentes", value: pendingTasks, color: "#f59e0b" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: color + "15", color }}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-gray-700 flex-1" style={{ fontSize: "13px" }}>
              {label}
            </span>
            <span className="text-gray-900" style={{ fontSize: "16px", fontWeight: 700 }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Settings shortcut */}
      <button
        onClick={onOpenSettings}
        className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
          <Settings className="w-4 h-4 text-gray-500" />
        </div>
        <span className="text-gray-700 flex-1" style={{ fontSize: "13px" }}>
          Configurações
        </span>
        <span className="text-gray-400" style={{ fontSize: "12px" }}>→</span>
      </button>
    </div>
  );
}
