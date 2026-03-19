import { useState } from "react";
import { Plus, StickyNote, Search } from "lucide-react";
import { Note, Subject } from "./types";
import { NoteCard } from "./NoteCard";
import { NoteModal } from "./NoteModal";
import { SubjectIcon } from "./SubjectIcon";

interface MainAreaProps {
  notes: Note[];
  subjects: Subject[];
  selectedSubjectId: string | null;
  searchQuery: string;
  onAddNote: (note: Omit<Note, "id" | "createdAt">) => void;
  onDeleteNote: (id: string) => void;
}

export function MainArea({
  notes,
  subjects,
  selectedSubjectId,
  searchQuery,
  onAddNote,
  onDeleteNote,
}: MainAreaProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [quickNote, setQuickNote] = useState("");
  const [quickNoteTitle, setQuickNoteTitle] = useState("");

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  const filteredNotes = notes.filter((note) => {
    const matchSubject = selectedSubjectId ? note.subjectId === selectedSubjectId : true;
    const matchSearch = searchQuery
      ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchSubject && matchSearch;
  });

  const handleQuickSave = () => {
    if (!quickNoteTitle.trim() && !quickNote.trim()) return;
    onAddNote({
      subjectId: selectedSubjectId,
      title: quickNoteTitle.trim() || "Anotação rápida",
      content: quickNote.trim(),
      tags: [],
    });
    setQuickNote("");
    setQuickNoteTitle("");
  };

  const title = selectedSubject ? selectedSubject.name : "Todas as anotações";

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {selectedSubject && (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: selectedSubject.color + "20",
                  color: selectedSubject.color,
                }}
              >
                <SubjectIcon icon={selectedSubject.icon} className="w-4 h-4" />
              </div>
            )}
            <div>
              <h1 className="text-gray-900" style={{ fontSize: "20px", fontWeight: 700 }}>
                {title}
              </h1>
              <p className="text-gray-500" style={{ fontSize: "12px" }}>
                {filteredNotes.length} anotaç{filteredNotes.length === 1 ? "ão" : "ões"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <Plus className="w-4 h-4" />
            Nova anotação
          </button>
        </div>

        {/* Quick note input */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <input
            type="text"
            placeholder="Título da anotação..."
            value={quickNoteTitle}
            onChange={(e) => setQuickNoteTitle(e.target.value)}
            className="w-full outline-none text-gray-900 mb-2 placeholder-gray-400"
            style={{ fontSize: "14px", fontWeight: 600 }}
          />
          <textarea
            placeholder="Comece a escrever sua anotação aqui..."
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            rows={3}
            className="w-full outline-none text-gray-600 resize-none placeholder-gray-400"
            style={{ fontSize: "13px", lineHeight: "1.6" }}
          />
          <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
            <span className="text-gray-400" style={{ fontSize: "11px" }}>
              {quickNote.length > 0 ? `${quickNote.length} caracteres` : "Anotação rápida"}
            </span>
            <button
              onClick={handleQuickSave}
              disabled={!quickNoteTitle.trim() && !quickNote.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              <Plus className="w-3 h-3" />
              Salvar
            </button>
          </div>
        </div>
      </div>

      {/* Notes grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {searchQuery && (
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500" style={{ fontSize: "13px" }}>
              Resultados para <strong>"{searchQuery}"</strong>
            </span>
          </div>
        )}

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                subjects={subjects}
                onClick={() => setSelectedNote(note)}
                onDelete={onDeleteNote}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <StickyNote className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-400" style={{ fontSize: "14px", fontWeight: 500 }}>
              Nenhuma anotação encontrada
            </p>
            <p className="text-gray-400 mt-1" style={{ fontSize: "13px" }}>
              {searchQuery ? "Tente outro termo de busca" : "Crie sua primeira anotação acima"}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <NoteModal
          subjects={subjects}
          defaultSubjectId={selectedSubjectId}
          onSave={(note) => {
            onAddNote(note);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      {selectedNote && (
        <NoteModal
          subjects={subjects}
          defaultSubjectId={selectedNote.subjectId}
          existingNote={selectedNote}
          onSave={() => setSelectedNote(null)}
          onClose={() => setSelectedNote(null)}
          readOnly
        />
      )}
    </main>
  );
}
