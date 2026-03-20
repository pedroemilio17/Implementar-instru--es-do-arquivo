import { useState, useCallback } from "react";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { MainArea } from "./components/MainArea";
import { AgendaPanel } from "./components/AgendaPanel";
import { BottomNav } from "./components/BottomNav";
import { MobileDrawer } from "./components/MobileDrawer";
import { MobileHeader } from "./components/MobileHeader";
import { NoteModal } from "./components/NoteModal";
import { SettingsModal } from "./components/SettingsModal";
import { AddSubjectModal } from "./components/AddSubjectModal";
import { MobileSubjectsView } from "./components/MobileSubjectsView";
import { MobileAgendaView } from "./components/MobileAgendaView";
import { ProfileView } from "./components/ProfileView";
import { initialSubjects, initialNotes, initialTasks } from "./components/mockData";
import { Note, Task, Subject, ActiveView } from "./components/types";

let noteIdCounter = 100;
let taskIdCounter = 100;
let subjectIdCounter = 100;

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<ActiveView>("home");

  // Modals / drawers
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addSubjectOpen, setAddSubjectOpen] = useState(false);
  const [mobileNewNote, setMobileNewNote] = useState(false);

  // Notes CRUD
  const handleAddNote = useCallback((noteData: Omit<Note, "id" | "createdAt">) => {
    const newNote: Note = {
      ...noteData,
      id: `n${++noteIdCounter}`,
      createdAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    if (noteData.subjectId) {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === noteData.subjectId ? { ...s, notesCount: s.notesCount + 1 } : s
        )
      );
    }
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    const note = notes.find((n) => n.id === id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (note?.subjectId) {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === note.subjectId ? { ...s, notesCount: Math.max(0, s.notesCount - 1) } : s
        )
      );
    }
  }, [notes]);

  // Tasks CRUD
  const handleToggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleAddTask = useCallback((taskData: Omit<Task, "id">) => {
    setTasks((prev) => [
      { ...taskData, id: `t${++taskIdCounter}` },
      ...prev,
    ]);
  }, []);

  // Subjects
  const handleAddSubject = useCallback(
    (subjectData: Omit<Subject, "id" | "notesCount">) => {
      setSubjects((prev) => [
        ...prev,
        { ...subjectData, id: `s${++subjectIdCounter}`, notesCount: 0 },
      ]);
    },
    []
  );

  // Mobile subject selection: switch to notes view
  const handleMobileSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    setActiveView("home");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 w-full">
      {/* ── GLOBAL WORKSPACE RAIL (lg+) ── */}
      <div className="hidden lg:block h-full flex-shrink-0 z-20 shadow-xl shadow-slate-900/20 relative">
        <WorkspaceSidebar tasks={tasks} onOpenSettings={() => setSettingsOpen(true)} />
      </div>

      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:flex flex-col flex-1 h-full min-w-0">
        {/* Top Nav */}
        <TopNav
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* 3-column layout */}
        <div className="flex flex-1 min-h-0">
          {/* Left Sidebar */}
          <Sidebar
            subjects={subjects}
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={setSelectedSubjectId}
            onAddSubject={() => setAddSubjectOpen(true)}
          />

          {/* Main Area */}
          <MainArea
            notes={notes}
            subjects={subjects}
            selectedSubjectId={selectedSubjectId}
            searchQuery={searchQuery}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />

          {/* Right Agenda */}
          <AgendaPanel
            tasks={tasks}
            subjects={subjects}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />
        </div>
      </div>

      {/* ── MOBILE LAYOUT (<lg) ── */}
      <div className="flex lg:hidden flex-col h-full w-full flex-1">
        {/* Mobile Header */}
        <MobileHeader
          onOpenDrawer={() => setMobileDrawerOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Mobile content area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {activeView === "home" && (
            <MainArea
              notes={notes}
              subjects={subjects}
              selectedSubjectId={selectedSubjectId}
              searchQuery={searchQuery}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
          {activeView === "subjects" && (
            <MobileSubjectsView
              subjects={subjects}
              notes={notes}
              onSelectSubject={handleMobileSelectSubject}
            />
          )}
          {activeView === "agenda" && (
            <MobileAgendaView
              tasks={tasks}
              subjects={subjects}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
            />
          )}
          {activeView === "profile" && (
            <ProfileView
              notes={notes}
              tasks={tasks}
              subjects={subjects}
              onOpenSettings={() => setSettingsOpen(true)}
            />
          )}
        </div>

        {/* Mobile bottom nav */}
        <BottomNav
          activeView={activeView}
          onChangeView={setActiveView}
          onNewNote={() => setMobileNewNote(true)}
        />

        {/* Mobile drawer */}
        <MobileDrawer
          open={mobileDrawerOpen}
          subjects={subjects}
          selectedSubjectId={selectedSubjectId}
          onSelectSubject={(id) => {
            setSelectedSubjectId(id);
            setActiveView("home");
          }}
          onAddSubject={() => setAddSubjectOpen(true)}
          onClose={() => setMobileDrawerOpen(false)}
        />
      </div>

      {/* ── GLOBAL MODALS ── */}
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}

      {addSubjectOpen && (
        <AddSubjectModal
          onSave={handleAddSubject}
          onClose={() => setAddSubjectOpen(false)}
        />
      )}

      {mobileNewNote && (
        <NoteModal
          subjects={subjects}
          defaultSubjectId={selectedSubjectId}
          onSave={(note) => {
            handleAddNote(note);
            setMobileNewNote(false);
          }}
          onClose={() => setMobileNewNote(false)}
        />
      )}
    </div>
  );
}
