import { useState } from "react";
import { X } from "lucide-react";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export function JoinRoomModal({ isOpen, onClose, onJoin }: JoinRoomModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleJoin = () => {
    const clean = code.trim().toUpperCase();
    if (clean.length !== 6) {
      setError("O código deve ter 6 caracteres");
      return;
    }
    setError("");
    onJoin(clean);
    setCode("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter") handleJoin();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box" onKeyDown={handleKeyDown}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "20px",
              fontWeight: 400,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            Entrar em uma sala
          </h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "var(--ink3)",
              padding: "4px",
              borderRadius: "6px",
            }}
          >
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Code input */}
        <label style={{ display: "block", marginBottom: "16px" }}>
          <span className="label" style={{ display: "block", marginBottom: "8px" }}>
            Código da sala
          </span>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="EX: ABC123"
            autoFocus
            style={{
              width: "100%",
              padding: "12px 16px",
              border: `1px solid ${error ? "#ef4444" : "var(--paper3)"}`,
              borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "0.15em",
              textAlign: "center",
              outline: "none",
              background: "var(--paper)",
              transition: "border-color 0.15s ease",
            }}
          />
          {error && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "#ef4444",
                margin: "6px 0 0",
              }}
            >
              {error}
            </p>
          )}
        </label>

        {/* Separator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "20px 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--paper3)" }} />
          <span className="caption">ou</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--paper3)" }} />
        </div>

        {/* Link input */}
        <label style={{ display: "block", marginBottom: "24px" }}>
          <span className="label" style={{ display: "block", marginBottom: "8px" }}>
            Link da sala
          </span>
          <input
            type="text"
            placeholder="https://studyspace.app/room/..."
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid var(--paper3)",
              borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              color: "var(--ink2)",
              outline: "none",
              background: "var(--paper)",
              transition: "border-color 0.15s ease",
            }}
          />
        </label>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid var(--paper3)",
              borderRadius: "8px",
              background: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--ink3)",
              transition: "all 0.15s ease",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleJoin}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              background: "var(--blue)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
              transition: "all 0.15s ease",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
