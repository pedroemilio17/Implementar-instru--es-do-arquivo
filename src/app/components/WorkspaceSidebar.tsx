import { useState, useRef, useEffect } from "react";
import { GraduationCap, Users, Calendar, Settings, LayoutGrid, CheckCircle } from "lucide-react";
import { Task } from "./types";

interface WorkspaceSidebarProps {
  tasks: Task[];
  onOpenSettings?: () => void;
}

export function WorkspaceSidebar({ tasks, onOpenSettings }: WorkspaceSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const NavItem = ({ icon: Icon, label, active = false, badge = 0, onClick }: any) => (
    <div
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`group flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all cursor-pointer ${
        active
          ? "bg-indigo-600 text-white"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      } ${!isExpanded ? "justify-center" : "px-4"}`}
    >
      <div className="relative flex items-center justify-center">
        <Icon className="w-6 h-6 flex-shrink-0" />
        {!isExpanded && badge > 0 && (
          <span 
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full border-2 border-[#0f172a]" 
            style={{ fontSize: "9px", fontWeight: "bold" }}
          >
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      
      <div
        className={`flex-1 flex items-center justify-between whitespace-nowrap transition-all duration-300 ${
          isExpanded ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        <span style={{ fontSize: "14px", fontWeight: 500 }}>{label}</span>
        {badge > 0 && isExpanded && (
          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white" style={{ fontSize: "11px", fontWeight: 600 }}>
            {badge} pending
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={sidebarRef}
      onClick={() => !isExpanded && setIsExpanded(true)}
      className="h-full flex flex-col py-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden flex-shrink-0 relative group z-30"
      style={{
        backgroundColor: "#0f172a", // slate-900 style, dark mode rail
        width: isExpanded ? "260px" : "72px",
      }}
    >
      {/* Brand Icon */}
      <div className="px-3 mb-6 flex items-center cursor-pointer">
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 transition-all ${isExpanded ? "ml-2" : "mx-auto"}`}>
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div 
          className={`flex flex-col whitespace-nowrap transition-all duration-300 ${
            isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          <span className="text-white" style={{ fontSize: "16px", fontWeight: 700 }}>StudySpace</span>
          <span className="text-indigo-300" style={{ fontSize: "12px", fontWeight: 500 }}>Workspace Global</span>
        </div>
      </div>

      {/* Main Nav Items */}
      <div className={`flex flex-col gap-2 flex-1 mt-2 ${isExpanded ? "px-4" : "px-3"}`}>
        <NavItem icon={LayoutGrid} label="Meu Painel" active={true} />
        <NavItem icon={Users} label="Comunidade / Salas" />
        
        {/* Agenda Section */}
        <div className="mt-6 mb-2">
          {isExpanded ? (
           <h3 className="px-1 text-slate-500 uppercase tracking-widest whitespace-nowrap" style={{ fontSize: "10px", fontWeight: 700 }}>Resumo da Agenda</h3>
          ) : (
           <div className="w-full h-px bg-slate-800 my-2" />
          )}
        </div>
        
        <NavItem icon={Calendar} label="Tarefas e Prazos" badge={pendingTasks} />
      </div>

      {/* Settings / Profile */}
      <div className={`mt-auto pt-4 border-t border-slate-800 ${isExpanded ? "px-4" : "px-3"}`}>
        <NavItem 
          icon={Settings} 
          label="Configurações globais" 
          onClick={() => {
            if (onOpenSettings) onOpenSettings();
            setIsExpanded(false);
          }} 
        />
      </div>
    </div>
  );
}
