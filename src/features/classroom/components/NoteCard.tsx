import { useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import type { Note } from "../types/classroom";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(note.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <article className="note-feed-item">
      {/* Author + visibility */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "var(--blue-l)",
            color: "var(--blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {note.authorInitials}
        </div>
        <span className="caption" style={{ fontWeight: 500, color: "var(--ink2)" }}>
          {note.authorName}
        </span>
        <span className="caption">·</span>
        <span className="caption">{note.createdAt}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
          <span className={`visibility-dot ${note.visibility}`} />
          <span className="caption">{note.visibility === "public" ? "pública" : "privada"}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="note-title" style={{ margin: "0 0 6px" }}>
        {note.title}
      </h3>

      {/* Body preview */}
      <p
        className="body-text"
        style={{
          margin: "0 0 12px",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {note.body}
      </p>

      {/* Discipline tag + actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--blue)",
            backgroundColor: "var(--blue-l)",
            padding: "3px 8px",
            borderRadius: "4px",
          }}
        >
          {note.discipline}
        </span>

        <div style={{ display: "flex", gap: "4px" }}>
          <button className={`action-btn ${liked ? "active" : ""}`} onClick={handleLike}>
            <Heart
              style={{
                width: "14px",
                height: "14px",
                fill: liked ? "var(--blue)" : "none",
                stroke: liked ? "var(--blue)" : "currentColor",
                transition: "all 0.15s ease",
              }}
            />
            {likeCount > 0 && likeCount}
          </button>

          <button className={`action-btn ${saved ? "saved" : ""}`} onClick={handleSave}>
            <Bookmark
              style={{
                width: "14px",
                height: "14px",
                fill: saved ? "var(--green)" : "none",
                stroke: saved ? "var(--green)" : "currentColor",
                transition: "all 0.15s ease",
              }}
            />
            {saved ? "salvo" : "salvar"}
          </button>
        </div>
      </div>
    </article>
  );
}
