import type { Note } from "../types/classroom";

interface LivePresenceBannerProps {
  notes: Note[];
}

export function LivePresenceBanner({ notes }: LivePresenceBannerProps) {
  const typingNotes = notes.filter((n) => n.isTyping);

  if (typingNotes.length === 0) return null;

  const names = typingNotes.map((n) => n.authorName);
  let text: string;

  if (names.length === 1) {
    text = `${names[0]} está escrevendo`;
  } else if (names.length === 2) {
    text = `${names[0]} e ${names[1]} estão escrevendo`;
  } else {
    text = `${names[0]} e mais ${names.length - 1} estão escrevendo`;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 16px",
        backgroundColor: "var(--blue-l)",
        borderRadius: "8px",
        marginBottom: "8px",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "var(--blue)",
          fontWeight: 500,
        }}
      >
        {text}
      </span>
      <span className="typing-dots">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}
