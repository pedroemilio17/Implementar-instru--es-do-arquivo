import { Home, BookOpen, Calendar, User, Plus } from "lucide-react";
import { ActiveView } from "./types";

interface BottomNavProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onNewNote: () => void;
}

const navItems: { view: ActiveView; icon: typeof Home; label: string }[] = [
  { view: "home", icon: Home, label: "Início" },
  { view: "subjects", icon: BookOpen, label: "Matérias" },
  { view: "agenda", icon: Calendar, label: "Agenda" },
  { view: "profile", icon: User, label: "Perfil" },
];

export function BottomNav({ activeView, onChangeView, onNewNote }: BottomNavProps) {
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 flex items-center justify-around px-4 pb-safe"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      {/* Left items */}
      {leftItems.map(({ view, icon: Icon, label }) => {
        const isActive = activeView === view;
        return (
          <button
            key={view}
            onClick={() => onChangeView(view)}
            className="flex flex-col items-center gap-1 py-3 px-4 transition-all"
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                isActive ? "text-indigo-600" : "text-gray-400"
              }`}
            />
            <span
              className={`transition-colors ${isActive ? "text-indigo-600" : "text-gray-400"}`}
              style={{ fontSize: "10px", fontWeight: isActive ? 600 : 400 }}
            >
              {label}
            </span>
          </button>
        );
      })}

      {/* FAB — center */}
      <button
        onClick={onNewNote}
        className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-300 hover:bg-indigo-700 active:scale-95 transition-all -mt-5"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Right items */}
      {rightItems.map(({ view, icon: Icon, label }) => {
        const isActive = activeView === view;
        return (
          <button
            key={view}
            onClick={() => onChangeView(view)}
            className="flex flex-col items-center gap-1 py-3 px-4 transition-all"
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                isActive ? "text-indigo-600" : "text-gray-400"
              }`}
            />
            <span
              className={`transition-colors ${isActive ? "text-indigo-600" : "text-gray-400"}`}
              style={{ fontSize: "10px", fontWeight: isActive ? 600 : 400 }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
