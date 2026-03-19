import { Subject, Note, Task } from "./types";

export const initialSubjects: Subject[] = [
  { id: "s1", name: "Matemática", color: "#6366f1", icon: "calculator", notesCount: 8 },
  { id: "s2", name: "Física", color: "#0ea5e9", icon: "atom", notesCount: 5 },
  { id: "s3", name: "História", color: "#f59e0b", icon: "book-open", notesCount: 12 },
  { id: "s4", name: "Biologia", color: "#10b981", icon: "leaf", notesCount: 7 },
  { id: "s5", name: "Português", color: "#ec4899", icon: "pen-line", notesCount: 6 },
  { id: "s6", name: "Química", color: "#8b5cf6", icon: "flask-conical", notesCount: 4 },
];

export const initialNotes: Note[] = [
  {
    id: "n1",
    subjectId: "s1",
    title: "Derivadas e Integrais",
    content: "Regra da cadeia: d/dx[f(g(x))] = f'(g(x)) · g'(x). Integral de funções compostas requer substituição trigonométrica em alguns casos.",
    createdAt: new Date(2026, 2, 18, 14, 30),
    tags: ["cálculo", "regras"],
  },
  {
    id: "n2",
    subjectId: "s2",
    title: "Leis de Newton",
    content: "1ª Lei: Todo corpo em repouso permanece em repouso. 2ª Lei: F = ma. 3ª Lei: Ação e reação são iguais e opostas.",
    createdAt: new Date(2026, 2, 17, 10, 0),
    tags: ["mecânica"],
  },
  {
    id: "n3",
    subjectId: "s3",
    title: "Revolução Francesa",
    content: "1789 — Queda da Bastilha. Causas: crise econômica, desigualdade social (3 estados), iluminismo. Fases: Assembleia Nacional, Terror, Diretório.",
    createdAt: new Date(2026, 2, 16, 9, 15),
    tags: ["europa", "século XVIII"],
  },
  {
    id: "n4",
    subjectId: "s4",
    title: "Fotossíntese",
    content: "6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂. Ocorre nos cloroplastos. Fase clara (tilacóides) e fase escura (estroma — ciclo de Calvin).",
    createdAt: new Date(2026, 2, 15, 16, 45),
    tags: ["plantas", "metabolismo"],
  },
  {
    id: "n5",
    subjectId: "s1",
    title: "Funções do 2º grau",
    content: "f(x) = ax² + bx + c, onde a ≠ 0. Vértice: x = -b/2a. Δ = b² - 4ac determina as raízes.",
    createdAt: new Date(2026, 2, 14, 11, 0),
    tags: ["álgebra"],
  },
  {
    id: "n6",
    subjectId: "s5",
    title: "Figuras de linguagem",
    content: "Metáfora, metonímia, hipérbole, ironia, antítese, paradoxo, eufemismo. Cada uma com função estilística específica no texto.",
    createdAt: new Date(2026, 2, 13, 13, 20),
    tags: ["gramática", "redação"],
  },
];

export const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Entregar lista de exercícios — Cálculo",
    dueDate: new Date(2026, 2, 20),
    completed: false,
    priority: "high",
    subjectId: "s1",
  },
  {
    id: "t2",
    title: "Prova de Física — Mecânica",
    dueDate: new Date(2026, 2, 21),
    completed: false,
    priority: "high",
    subjectId: "s2",
  },
  {
    id: "t3",
    title: "Seminário de História",
    dueDate: new Date(2026, 2, 25),
    completed: false,
    priority: "medium",
    subjectId: "s3",
  },
  {
    id: "t4",
    title: "Relatório de lab — Biologia",
    dueDate: new Date(2026, 2, 22),
    completed: false,
    priority: "medium",
    subjectId: "s4",
  },
  {
    id: "t5",
    title: "Redação — tema livre",
    dueDate: new Date(2026, 2, 28),
    completed: true,
    priority: "low",
    subjectId: "s5",
  },
  {
    id: "t6",
    title: "Revisão de Química Orgânica",
    dueDate: new Date(2026, 2, 19),
    completed: false,
    priority: "high",
    subjectId: "s6",
  },
];
