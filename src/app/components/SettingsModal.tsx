import { X, Moon, Sun, Bell, Shield, Trash2, User as UserIcon, Palette, Globe } from "lucide-react";
import { useState } from "react";

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-gray-900" style={{ fontSize: "16px", fontWeight: 700 }}>
            Configurações
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Profile section */}
          <div>
            <p className="text-gray-400 uppercase tracking-wider mb-3" style={{ fontSize: "11px", fontWeight: 600 }}>
              Perfil
            </p>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-gray-900" style={{ fontSize: "14px", fontWeight: 600 }}>Estudante</p>
                <p className="text-gray-500" style={{ fontSize: "12px" }}>Configure seu perfil</p>
              </div>
              <button className="ml-auto px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all" style={{ fontSize: "12px" }}>
                Editar
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <p className="text-gray-400 uppercase tracking-wider mb-3" style={{ fontSize: "11px", fontWeight: 600 }}>
              Aparência
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-4 h-4 text-gray-500" /> : <Sun className="w-4 h-4 text-gray-500" />}
                  <span className="text-gray-700" style={{ fontSize: "13px" }}>Modo escuro</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-5.5 rounded-full relative transition-colors ${darkMode ? "bg-indigo-600" : "bg-gray-200"}`}
                  style={{ height: "22px", width: "40px" }}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700" style={{ fontSize: "13px" }}>Tema de cor</span>
                </div>
                <div className="flex gap-1.5">
                  {["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899"].map((color) => (
                    <button
                      key={color}
                      className="w-5 h-5 rounded-full ring-2 ring-white ring-offset-1 transition-all hover:scale-110"
                      style={{ backgroundColor: color, outlineOffset: "2px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <p className="text-gray-400 uppercase tracking-wider mb-3" style={{ fontSize: "11px", fontWeight: 600 }}>
              Notificações
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="text-gray-700" style={{ fontSize: "13px" }}>Lembretes de prazo</span>
                  <p className="text-gray-400" style={{ fontSize: "11px" }}>Receba alertas antes dos prazos</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative rounded-full transition-colors`}
                style={{ height: "22px", width: "40px", backgroundColor: notifications ? "#6366f1" : "#e5e7eb" }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          </div>

          {/* General */}
          <div>
            <p className="text-gray-400 uppercase tracking-wider mb-3" style={{ fontSize: "11px", fontWeight: 600 }}>
              Geral
            </p>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700" style={{ fontSize: "13px" }}>Idioma: Português</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700" style={{ fontSize: "13px" }}>Privacidade</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-all text-left">
                <Trash2 className="w-4 h-4 text-red-400" />
                <span className="text-red-500" style={{ fontSize: "13px" }}>Limpar todos os dados</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 text-center">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>
            StudySpace v1.0.0 · Feito para estudantes
          </p>
        </div>
      </div>
    </div>
  );
}
