import { X, Plus, GraduationCap } from "lucide-react";
import { Subject } from "./types";
import { SubjectIcon } from "./SubjectIcon";

interface MobileDrawerProps {
  open: boolean;
  subjects: Subject[];
  selectedSubjectId: string | null;
  onSelectSubject: (id: string | null) => void;
  onAddSubject: () => void;
  onClose: () => void;
}

export function MobileDrawer({
  open,
  subjects,
  selectedSubjectId,
  onSelectSubject,
  onAddSubject,
  onClose,
}: MobileDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span style={{ fontSize: "15px", fontWeight: 600 }} className="text-gray-900">
              StudySpace
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* All notes */}
        <div className="px-3 pt-4">
          <button
            onClick={() => { onSelectSubject(null); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
              selectedSubjectId === null
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center ${
                selectedSubjectId === null ? "bg-indigo-100" : "bg-gray-100"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span style={{ fontSize: "13px", fontWeight: selectedSubjectId === null ? 600 : 500 }}>
              Todas as anotações
            </span>
          </button>
        </div>

        {/* Subjects */}
        <div className="px-3 pt-4 flex-1 overflow-y-auto">
          <p
            className="text-gray-400 uppercase tracking-wider px-3 mb-2"
            style={{ fontSize: "11px", fontWeight: 600 }}
          >
            Matérias
          </p>
          <div className="space-y-0.5">
            {subjects.map((subject) => {
              const isActive = selectedSubjectId === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => { onSelectSubject(subject.id); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    isActive ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: subject.color + "20", color: subject.color }}
                  >
                    <SubjectIcon icon={subject.icon} className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`flex-1 truncate ${isActive ? "text-gray-900" : "text-gray-600"}`}
                    style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500 }}
                  >
                    {subject.name}
                  </span>
                  <span className="text-gray-400" style={{ fontSize: "11px" }}>
                    {subject.notesCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add subject */}
        <div className="px-3 pb-24 pt-2 border-t border-gray-100">
          <button
            onClick={() => { onAddSubject(); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
          >
            <div className="w-7 h-7 rounded-md flex items-center justify-center border-2 border-dashed border-gray-200">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <span style={{ fontSize: "13px", fontWeight: 500 }}>Nova matéria</span>
          </button>
        </div>
      </div>
    </>
  );
}
