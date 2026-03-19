import {
  Calculator,
  Atom,
  BookOpen,
  Leaf,
  PenLine,
  FlaskConical,
  BookMarked,
} from "lucide-react";

interface SubjectIconProps {
  icon: string;
  className?: string;
}

export function SubjectIcon({ icon, className = "w-4 h-4" }: SubjectIconProps) {
  switch (icon) {
    case "calculator":
      return <Calculator className={className} />;
    case "atom":
      return <Atom className={className} />;
    case "book-open":
      return <BookOpen className={className} />;
    case "leaf":
      return <Leaf className={className} />;
    case "pen-line":
      return <PenLine className={className} />;
    case "flask-conical":
      return <FlaskConical className={className} />;
    default:
      return <BookMarked className={className} />;
  }
}
