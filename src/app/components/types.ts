export type Subject = {
  id: string;
  name: string;
  color: string;
  icon: string;
  notesCount: number;
};

export type Note = {
  id: string;
  subjectId: string | null;
  title: string;
  content: string;
  createdAt: Date;
  tags?: string[];
};

export type Task = {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  priority: "high" | "medium" | "low";
  subjectId?: string;
};

export type ActiveView = "home" | "subjects" | "agenda" | "profile";
