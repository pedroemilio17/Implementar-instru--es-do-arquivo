import { Subject, Note } from "./types";
import { SubjectIcon } from "./SubjectIcon";
import { StickyNote } from "lucide-react";

interface MobileSubjectsViewProps {
  subjects: Subject[];
  notes: Note[];
  onSelectSubject: (id: string) => void;
}

export function MobileSubjectsView({ subjects, notes, onSelectSubject }: MobileSubjectsViewProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
      <h2 className="text-gray-900 mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>
        Matérias
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {subjects.map((subject) => {
          const subjectNotes = notes.filter((n) => n.subjectId === subject.id);
          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject.id)}
              className="flex flex-col items-start p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: subject.color + "20", color: subject.color }}
              >
                <SubjectIcon icon={subject.icon} className="w-5 h-5" />
              </div>
              <p
                className="text-gray-900 mb-1"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                {subject.name}
              </p>
              <div className="flex items-center gap-1 text-gray-400">
                <StickyNote className="w-3 h-3" />
                <span style={{ fontSize: "11px" }}>
                  {subjectNotes.length} anotaç{subjectNotes.length === 1 ? "ão" : "ões"}
                </span>
              </div>
              <div
                className="mt-3 h-1 w-full rounded-full"
                style={{ backgroundColor: subject.color + "25" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: subject.color,
                    width: `${Math.min(100, (subjectNotes.length / 12) * 100)}%`,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
