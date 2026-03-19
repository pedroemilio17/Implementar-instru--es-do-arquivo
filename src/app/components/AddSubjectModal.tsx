import { useState } from "react";
import { X } from "lucide-react";
import { Subject } from "./types";
import { SubjectIcon } from "./SubjectIcon";

const COLORS = [
  "#6366f1", "#0ea5e9", "#10b981", "#f59e0b",
  "#ec4899", "#8b5cf6", "#ef4444", "#14b8a6",
];

const ICONS = [
  "calculator", "atom", "book-open", "leaf",
  "pen-line", "flask-conical",
];

interface AddSubjectModalProps {
  onSave: (subject: Omit<Subject, "id" | "notesCount">) => void;
  onClose: () => void;
}

export function AddSubjectModal({ onSave, onClose }: AddSubjectModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [icon, setIcon] = useState(ICONS[0]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), color, icon });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-gray-900" style={{ fontSize: "15px", fontWeight: 700 }}>
            Nova matéria
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: color + "20", color }}
            >
              <SubjectIcon icon={icon} className="w-5 h-5" />
            </div>
            <span className="text-gray-700" style={{ fontSize: "14px", fontWeight: 600 }}>
              {name || "Nome da matéria"}
            </span>
          </div>

          {/* Name */}
          <div>
            <label className="text-gray-500 mb-1.5 block" style={{ fontSize: "12px" }}>
              Nome
            </label>
            <input
              type="text"
              placeholder="ex: Matemática"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-indigo-300 text-gray-700 placeholder-gray-400"
              style={{ fontSize: "13px" }}
              autoFocus
            />
          </div>

          {/* Colors */}
          <div>
            <label className="text-gray-500 mb-2 block" style={{ fontSize: "12px" }}>
              Cor
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    color === c ? "ring-2 ring-offset-2" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c, ringColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Icons */}
          <div>
            <label className="text-gray-500 mb-2 block" style={{ fontSize: "12px" }}>
              Ícone
            </label>
            <div className="flex gap-2">
              {ICONS.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    icon === ic
                      ? "ring-2"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  style={
                    icon === ic
                      ? { backgroundColor: color + "20", color, ringColor: color }
                      : {}
                  }
                >
                  <SubjectIcon icon={ic} className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-6 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            Criar matéria
          </button>
        </div>
      </div>
    </div>
  );
}
