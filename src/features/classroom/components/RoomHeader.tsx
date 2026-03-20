import { useState, useCallback } from "react";
import type { Room, Member } from "../types/classroom";
import { Copy, Check } from "lucide-react";

interface RoomHeaderProps {
  room: Room;
  onlineMembers: Member[];
  onlineCount: number;
}

export function RoomHeader({ room, onlineMembers, onlineCount }: RoomHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(room.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [room.code]);

  return (
    <header style={{ padding: "24px 0", borderBottom: "1px solid var(--paper2)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <h1
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "22px",
              fontWeight: 400,
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {room.name}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "var(--ink3)",
              margin: "6px 0 0",
            }}
          >
            {room.discipline} · Prof. {room.professor}
          </p>
        </div>

        <button className="room-code" onClick={handleCopyCode}>
          {copied ? (
            <>
              <Check style={{ width: "12px", height: "12px", color: "var(--green)" }} />
              <span style={{ color: "var(--green)" }}>copiado!</span>
            </>
          ) : (
            <>
              <Copy style={{ width: "12px", height: "12px" }} />
              {room.code}
            </>
          )}
        </button>
      </div>

      {/* Online members */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "16px",
        }}
      >
        {onlineMembers.length > 0 && (
          <div className="avatar-stack">
            {onlineMembers.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="avatar"
                style={{ backgroundColor: m.color }}
                title={m.name}
              >
                {m.initials}
              </div>
            ))}
          </div>
        )}
        <span className="caption">
          {onlineCount} online · {room.memberCount} membros
        </span>
      </div>
    </header>
  );
}
