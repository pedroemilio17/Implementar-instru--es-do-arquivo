import { Menu, Search, Settings, X } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { useState } from "react";

interface MobileHeaderProps {
  onOpenDrawer: () => void;
  onOpenSettings: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function MobileHeader({
  onOpenDrawer,
  onOpenSettings,
  searchQuery,
  onSearchChange,
}: MobileHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-30">
      <button
        onClick={onOpenDrawer}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {showSearch ? (
        <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            style={{ fontSize: "13px" }}
            autoFocus
          />
          <button
            onClick={() => { setShowSearch(false); onSearchChange(""); }}
            className="text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gray-900" style={{ fontSize: "15px", fontWeight: 600 }}>
              StudySpace
            </span>
          </div>

          <button
            onClick={() => setShowSearch(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettings}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
          >
            <Settings className="w-4 h-4" />
          </button>
        </>
      )}
    </header>
  );
}
