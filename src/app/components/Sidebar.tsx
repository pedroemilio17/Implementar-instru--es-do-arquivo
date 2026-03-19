import { Plus, GraduationCap } from "lucide-react";
import { Subject } from "./types";
import { SubjectIcon } from "./SubjectIcon";

interface SidebarProps {
  subjects: Subject[];
  selectedSubjectId: string | null;
  onSelectSubject: (id: string | null) => void;
  onAddSubject: () => void;
}

export function Sidebar({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  onAddSubject,
}: SidebarProps) {
  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-gray-100">
      {/* Logo area */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-900" style={{ fontSize: "15px", fontWeight: 600 }}>
            StudySpace
          </span>
        </div>
      </div>

      {/* All Notes */}
      <div className="px-3 pt-4">
        <button
          onClick={() => onSelectSubject(null)}
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
          <div className="flex-1 min-w-0">
            <span style={{ fontSize: "13px", fontWeight: selectedSubjectId === null ? 600 : 500 }}>
              Todas as anotações
            </span>
          </div>
        </button>
      </div>

      {/* Subjects section */}
      <div className="px-3 pt-5 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-3 mb-2">
          <span
            className="text-gray-400 uppercase tracking-wider"
            style={{ fontSize: "11px", fontWeight: 600 }}
          >
            Matérias
          </span>
        </div>

        <div className="space-y-0.5">
          {subjects.map((subject) => {
            const isActive = selectedSubjectId === subject.id;
            return (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
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
                <div className="flex-1 min-w-0">
                  <span
                    className={`block truncate ${isActive ? "text-gray-900" : "text-gray-600"}`}
                    style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500 }}
                  >
                    {subject.name}
                  </span>
                </div>
                <span
                  className="text-gray-400 flex-shrink-0"
                  style={{ fontSize: "11px" }}
                >
                  {subject.notesCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add subject button */}
      <div className="px-3 pb-4 pt-2 border-t border-gray-100 mt-2">
        <button
          onClick={onAddSubject}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-all"
        >
          <div className="w-7 h-7 rounded-md flex items-center justify-center border-2 border-dashed border-gray-200">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span style={{ fontSize: "13px", fontWeight: 500 }}>Nova matéria</span>
        </button>
      </div>
    </aside>
  );
}
