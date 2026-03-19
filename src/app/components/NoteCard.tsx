import { Note, Subject } from "./types";
import { SubjectIcon } from "./SubjectIcon";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2 } from "lucide-react";

interface NoteCardProps {
  note: Note;
  subjects: Subject[];
  onClick: () => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, subjects, onClick, onDelete }: NoteCardProps) {
  const subject = subjects.find((s) => s.id === note.subjectId);

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className="text-gray-900 truncate flex-1"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          {note.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <p
        className="text-gray-500 line-clamp-2 mb-3"
        style={{ fontSize: "12px", lineHeight: "1.6" }}
      >
        {note.content}
      </p>

      <div className="flex items-center justify-between">
        {subject ? (
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md"
            style={{ backgroundColor: subject.color + "15", color: subject.color }}
          >
            <SubjectIcon icon={subject.icon} className="w-3 h-3" />
            <span style={{ fontSize: "11px", fontWeight: 500 }}>{subject.name}</span>
          </div>
        ) : (
          <div />
        )}

        <span className="text-gray-400" style={{ fontSize: "11px" }}>
          {formatDistanceToNow(note.createdAt, { addSuffix: true, locale: ptBR })}
        </span>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500"
              style={{ fontSize: "11px" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
