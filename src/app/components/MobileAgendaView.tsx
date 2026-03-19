import { AgendaPanel } from "./AgendaPanel";
import { Task, Subject } from "./types";

interface MobileAgendaViewProps {
  tasks: Task[];
  subjects: Subject[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<Task, "id">) => void;
}

export function MobileAgendaView(props: MobileAgendaViewProps) {
  return (
    <div className="flex-1 overflow-hidden h-full">
      <AgendaPanel {...props} />
    </div>
  );
}
