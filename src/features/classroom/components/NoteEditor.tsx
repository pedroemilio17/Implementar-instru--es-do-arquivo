import { useState } from "react";
import type { Visibility } from "../types/classroom";

interface NoteEditorProps {
  onPublish: (note: { title: string; body: string; visibility: Visibility }) => void;
}

export function NoteEditor({ onPublish }: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("public");

  const handlePublish = () => {
    if (!title.trim()) return;
    onPublish({ title: title.trim(), body: body.trim(), visibility });
    setTitle("");
    setBody("");
  };

  const isPublic = visibility === "public";

  return (
    <div className="note-editor">
      {/* Visibility toggle + contextual banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
          padding: "10px 14px",
          borderRadius: "8px",
          backgroundColor: isPublic ? "var(--green-l)" : "var(--paper2)",
          transition: "background-color 0.2s ease",
        }}
      >
        <button
          className={`toggle-track ${isPublic ? "on" : ""}`}
          onClick={() => setVisibility(isPublic ? "private" : "public")}
          type="button"
        >
          <div className="toggle-knob" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className={`visibility-dot ${visibility}`} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: isPublic ? "var(--green)" : "var(--ink3)",
              transition: "color 0.2s ease",
            }}
          >
            {isPublic
              ? "Nota pública — visível para toda a turma"
              : "Nota privada — só você pode ver"}
          </span>
        </div>
      </div>

      {/* Title */}
      <input
        className="note-editor-title"
        type="text"
        placeholder="Título da nota..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Body */}
      <textarea
        rows={6}
        placeholder="Escreva o conteúdo da nota..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "16px",
          paddingTop: "16px",
          borderTop: "1px solid var(--paper2)",
        }}
      >
        <button
          onClick={handlePublish}
          disabled={!title.trim()}
          style={{
            padding: "8px 20px",
            border: "none",
            borderRadius: "8px",
            background: title.trim() ? "var(--blue)" : "var(--paper3)",
            color: title.trim() ? "white" : "var(--ink4)",
            cursor: title.trim() ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          Publicar nota
        </button>
      </div>
    </div>
  );
}
