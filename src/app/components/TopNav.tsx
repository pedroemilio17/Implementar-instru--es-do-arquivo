import { Search, Settings, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSettings: () => void;
}

export function TopNav({ searchQuery, onSearchChange, onOpenSettings }: TopNavProps) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
      {/* Search */}
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border transition-all flex-1 max-w-xs ${
          focused ? "border-indigo-300 bg-white shadow-sm shadow-indigo-50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar anotações..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 min-w-0"
          style={{ fontSize: "13px" }}
        />
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
          title="Configurações"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
        </button>

        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all ml-1">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white" style={{ fontSize: "11px", fontWeight: 600 }}>A</span>
          </div>
          <span className="text-gray-700" style={{ fontSize: "13px", fontWeight: 500 }}>Ana Lima</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
