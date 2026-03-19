import { useState } from "react";
import { X, Save } from "lucide-react";
import { Note, Subject } from "./types";
import { SubjectIcon } from "./SubjectIcon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NoteModalProps {
  subjects: Subject[];
  defaultSubjectId: string | null;
  existingNote?: Note;
  onSave: (note: Omit<Note, "id" | "createdAt">) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export function NoteModal({
  subjects,
  defaultSubjectId,
  existingNote,
  onSave,
  onClose,
  readOnly = false,
}: NoteModalProps) {
  const [title, setTitle] = useState(existingNote?.title ?? "");
  const [content, setContent] = useState(existingNote?.content ?? "");
  const [subjectId, setSubjectId] = useState<string | null>(
    existingNote?.subjectId ?? defaultSubjectId
  );
  const [tagsInput, setTagsInput] = useState(existingNote?.tags?.join(", ") ?? "");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      content: content.trim(),
      subjectId,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-gray-700" style={{ fontSize: "14px", fontWeight: 600 }}>
            {readOnly ? "Ver anotação" : existingNote ? "Editar anotação" : "Nova anotação"}
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Título da anotação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={readOnly}
            className="w-full outline-none text-gray-900 placeholder-gray-400"
            style={{ fontSize: "22px", fontWeight: 700 }}
          />

          {/* Subject selector */}
          {!readOnly && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSubjectId(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                  subjectId === null
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
                style={{ fontSize: "12px" }}
              >
                Geral
              </button>
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSubjectId(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                    subjectId === s.id ? "border-current" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  style={{
                    fontSize: "12px",
                    color: subjectId === s.id ? s.color : "#6b7280",
                    backgroundColor: subjectId === s.id ? s.color + "12" : undefined,
                    borderColor: subjectId === s.id ? s.color + "60" : undefined,
                  }}
                >
                  <SubjectIcon icon={s.icon} className="w-3 h-3" />
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {readOnly && existingNote && (
            <div className="flex items-center gap-3">
              {subjects.find((s) => s.id === existingNote.subjectId) && (
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor:
                      subjects.find((s) => s.id === existingNote.subjectId)!.color + "15",
                    color: subjects.find((s) => s.id === existingNote.subjectId)!.color,
                  }}
                >
                  <SubjectIcon
                    icon={subjects.find((s) => s.id === existingNote.subjectId)!.icon}
                    className="w-3 h-3"
                  />
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>
                    {subjects.find((s) => s.id === existingNote.subjectId)!.name}
                  </span>
                </div>
              )}
              <span className="text-gray-400" style={{ fontSize: "12px" }}>
                {format(existingNote.createdAt, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="border border-gray-200 rounded-xl p-4">
            <textarea
              placeholder="Escreva sua anotação aqui..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              readOnly={readOnly}
              rows={10}
              className="w-full outline-none text-gray-700 resize-none placeholder-gray-400"
              style={{ fontSize: "14px", lineHeight: "1.7" }}
            />
          </div>

          {/* Tags */}
          {!readOnly && (
            <div>
              <label className="text-gray-500 mb-1.5 block" style={{ fontSize: "12px" }}>
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                placeholder="ex: cálculo, prova, revisão"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-indigo-300 text-gray-700 placeholder-gray-400"
                style={{ fontSize: "13px" }}
              />
            </div>
          )}

          {readOnly && existingNote?.tags && existingNote.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {existingNote.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md bg-gray-100 text-gray-500"
                  style={{ fontSize: "12px" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!readOnly && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              <Save className="w-3.5 h-3.5" />
              Salvar anotação
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
