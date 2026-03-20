import { useState, useCallback } from "react";
import type { Room, Note as ClassNote, Member, Visibility } from "./types/classroom";
import { usePresence } from "./hooks/usePresence";
import { useCommandPalette } from "./hooks/useCommandPalette";
import { RoomHeader } from "./components/RoomHeader";
import { NotesFeed } from "./components/NotesFeed";
import { LivePresenceBanner } from "./components/LivePresenceBanner";
import { CommandPalette, getDefaultCommands } from "./components/CommandPalette";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { NoteEditor } from "./components/NoteEditor";
import "./classroom.css";

// Mock data for development — will be replaced by real API
const MOCK_ROOM: Room = {
  id: "room-1",
  name: "Cálculo Diferencial II",
  code: "CAL2A3",
  professor: "Ricardo Mendes",
  memberCount: 32,
  onlineCount: 8,
  discipline: "Matemática",
};

const MOCK_MEMBERS: Member[] = [
  { id: "m1", name: "Lucas Silva", initials: "LS", color: "#2952a3", isOnline: true },
  { id: "m2", name: "Maria Clara", initials: "MC", color: "#276749", isOnline: true },
  { id: "m3", name: "João Pedro", initials: "JP", color: "#9333ea", isOnline: true },
  { id: "m4", name: "Ana Beatriz", initials: "AB", color: "#ea580c", isOnline: false },
  { id: "m5", name: "Carlos Eduardo", initials: "CE", color: "#0891b2", isOnline: true },
];

const MOCK_NOTES: ClassNote[] = [
  {
    id: "cn1",
    authorName: "Lucas Silva",
    authorInitials: "LS",
    title: "Regra da cadeia para funções compostas",
    body: "A regra da cadeia permite calcular a derivada de uma função composta. Se y = f(g(x)), então dy/dx = f'(g(x)) · g'(x). Exemplo prático: se y = sin(x²), a derivada é cos(x²) · 2x. Este conceito é fundamental para resolver integrais por substituição.",
    discipline: "Cálculo II",
    visibility: "public",
    likes: 5,
    createdAt: "há 2h",
    isTyping: false,
  },
  {
    id: "cn2",
    authorName: "Maria Clara",
    authorInitials: "MC",
    title: "Resumo da aula sobre séries convergentes",
    body: "Séries convergentes são sequências infinitas cuja soma parcial tende a um valor finito. Critério da razão: se lim |a_{n+1}/a_n| < 1, a série converge. Critério da raiz: se lim |a_n|^{1/n} < 1, a série converge.",
    discipline: "Cálculo II",
    visibility: "public",
    likes: 3,
    createdAt: "há 4h",
    isTyping: true,
  },
  {
    id: "cn3",
    authorName: "Carlos Eduardo",
    authorInitials: "CE",
    title: "Integração por partes — fórmula e exemplos",
    body: "A integração por partes deriva da regra do produto: ∫u dv = uv - ∫v du. Dica: use LIATE para escolher u (Log, Inversa trig, Algébrica, Trig, Exponencial).",
    discipline: "Cálculo II",
    visibility: "public",
    likes: 7,
    createdAt: "há 1d",
  },
];

let noteCounter = 100;

export function ClassroomPage() {
  const [room] = useState<Room>(MOCK_ROOM);
  const [notes, setNotes] = useState<ClassNote[]>(MOCK_NOTES);
  const [showEditor, setShowEditor] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const { onlineMembers, onlineCount } = usePresence(MOCK_MEMBERS);

  const handlePublishNote = useCallback(
    (data: { title: string; body: string; visibility: Visibility }) => {
      const newNote: ClassNote = {
        id: `cn${++noteCounter}`,
        authorName: "Você",
        authorInitials: "VC",
        title: data.title,
        body: data.body,
        discipline: room.discipline,
        visibility: data.visibility,
        likes: 0,
        createdAt: "agora",
      };
      setNotes((prev) => [newNote, ...prev]);
      setShowEditor(false);
    },
    [room.discipline]
  );

  const handleJoinRoom = useCallback((code: string) => {
    console.log("Joining room with code:", code);
    setJoinModalOpen(false);
  }, []);

  const commands = getDefaultCommands({
    onNewNote: () => setShowEditor(true),
    onJoinRoom: () => setJoinModalOpen(true),
    onSearchNotes: () => {},
    onSettings: () => {},
  });

  const cmdPalette = useCommandPalette(commands);

  return (
    <div className="classroom" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          borderRight: "1px solid var(--paper2)",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        {/* App name */}
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            StudySpace
          </span>
        </div>

        {/* Room nav items */}
        <nav>
          <span className="label" style={{ display: "block", marginBottom: "12px" }}>
            Salas
          </span>

          <button
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "var(--paper2)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: "4px",
              transition: "background-color 0.15s ease",
            }}
          >
            {room.name}
          </button>

          <button
            onClick={() => setJoinModalOpen(true)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              border: "1px dashed var(--paper3)",
              borderRadius: "8px",
              background: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "var(--ink3)",
              marginTop: "8px",
              transition: "all 0.15s ease",
            }}
          >
            + Entrar em sala
          </button>
        </nav>

        {/* Bottom hint */}
        <div style={{ marginTop: "auto", paddingTop: "24px" }}>
          <span className="caption">
            ⌘K para buscar ações
          </span>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 40px",
          maxWidth: "720px",
        }}
      >
        <RoomHeader
          room={room}
          onlineMembers={onlineMembers}
          onlineCount={onlineCount}
        />

        {/* Editor area */}
        <div style={{ padding: "20px 0 0" }}>
          {showEditor ? (
            <NoteEditor onPublish={handlePublishNote} />
          ) : (
            <button
              onClick={() => setShowEditor(true)}
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "1px solid var(--paper3)",
                borderRadius: "10px",
                background: "white",
                cursor: "text",
                textAlign: "left",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "var(--ink4)",
                transition: "all 0.15s ease",
              }}
            >
              Escrever uma nota...
            </button>
          )}
        </div>

        {/* Presence banner */}
        <div style={{ paddingTop: "16px" }}>
          <LivePresenceBanner notes={notes} />
        </div>

        {/* Notes feed */}
        <NotesFeed notes={notes.filter((n) => n.visibility === "public")} />
      </main>

      {/* Right members panel */}
      <aside
        style={{
          width: "200px",
          borderLeft: "1px solid var(--paper2)",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        <span className="label" style={{ display: "block", marginBottom: "16px" }}>
          Membros ({onlineCount} online)
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {onlineMembers.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 0",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--green)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "var(--ink2)",
                }}
              >
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Modals */}
      <CommandPalette
        isOpen={cmdPalette.isOpen}
        query={cmdPalette.query}
        onQueryChange={cmdPalette.setQuery}
        activeIndex={cmdPalette.activeIndex}
        onActiveIndexChange={cmdPalette.setActiveIndex}
        items={cmdPalette.filtered.map((c) => ({
          ...c,
          icon: commands.find((cmd) => cmd.id === c.id)?.icon ?? null,
        }))}
        onClose={cmdPalette.close}
        onSelect={(item) => {
          item.action();
          cmdPalette.close();
        }}
      />

      <JoinRoomModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onJoin={handleJoinRoom}
      />
    </div>
  );
}
