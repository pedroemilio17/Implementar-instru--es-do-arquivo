import type { Note } from "../types/classroom";
import { NoteCard } from "./NoteCard";

interface NotesFeedProps {
  notes: Note[];
}

export function NotesFeed({ notes }: NotesFeedProps) {
  if (notes.length === 0) {
    return (
      <div
        style={{
          padding: "48px 0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "17px",
            color: "var(--ink3)",
            margin: "0 0 8px",
          }}
        >
          Nenhuma nota ainda
        </p>
        <p className="caption">
          Seja o primeiro a compartilhar uma nota com a turma.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "4px",
          padding: "0 0 12px",
        }}
      >
        <span className="label">Notas da turma</span>
        <span className="caption">{notes.length} nota{notes.length !== 1 ? "s" : ""}</span>
      </div>

      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
