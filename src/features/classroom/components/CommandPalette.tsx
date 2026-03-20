import { useRef, useEffect } from "react";
import { Search, FileText, Users, Plus, Settings } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  activeIndex: number;
  onActiveIndexChange: (i: number) => void;
  items: CommandItem[];
  onClose: () => void;
  onSelect: (item: CommandItem) => void;
}

export function CommandPalette({
  isOpen,
  query,
  onQueryChange,
  activeIndex,
  onActiveIndexChange,
  items,
  onClose,
  onSelect,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="cmd-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cmd-box">
        <input
          ref={inputRef}
          className="cmd-input"
          type="text"
          placeholder="Buscar ação..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />

        <div style={{ padding: "8px 0", maxHeight: "320px", overflowY: "auto" }}>
          {items.length === 0 && (
            <div
              style={{
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <p className="caption">Nenhum resultado para "{query}"</p>
            </div>
          )}

          {items.map((item, i) => (
            <div
              key={item.id}
              className={`cmd-item ${i === activeIndex ? "active" : ""}`}
              onClick={() => onSelect(item)}
              onMouseEnter={() => onActiveIndexChange(i)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid var(--paper2)",
            display: "flex",
            gap: "16px",
          }}
        >
          <span className="caption">↑↓ navegar</span>
          <span className="caption">↵ selecionar</span>
          <span className="caption">esc fechar</span>
        </div>
      </div>
    </div>
  );
}

export function getDefaultCommands(actions: {
  onNewNote: () => void;
  onJoinRoom: () => void;
  onSearchNotes: () => void;
  onSettings: () => void;
}): CommandItem[] {
  return [
    {
      id: "new-note",
      label: "Nova nota",
      shortcut: "⌘N",
      icon: <Plus style={{ width: "16px", height: "16px" }} />,
      action: actions.onNewNote,
    },
    {
      id: "search-notes",
      label: "Buscar notas",
      shortcut: "⌘F",
      icon: <Search style={{ width: "16px", height: "16px" }} />,
      action: actions.onSearchNotes,
    },
    {
      id: "join-room",
      label: "Entrar em sala",
      shortcut: "⌘J",
      icon: <Users style={{ width: "16px", height: "16px" }} />,
      action: actions.onJoinRoom,
    },
    {
      id: "my-notes",
      label: "Minhas notas",
      icon: <FileText style={{ width: "16px", height: "16px" }} />,
      action: actions.onSearchNotes,
    },
    {
      id: "settings",
      label: "Configurações",
      shortcut: "⌘,",
      icon: <Settings style={{ width: "16px", height: "16px" }} />,
      action: actions.onSettings,
    },
  ];
}
