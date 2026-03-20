export interface Room {
  id: string;
  name: string;
  code: string;
  professor: string;
  memberCount: number;
  onlineCount: number;
  discipline: string;
}

export type Visibility = "public" | "private";

export interface Note {
  id: string;
  authorName: string;
  authorInitials: string;
  title: string;
  body: string;
  discipline: string;
  visibility: Visibility;
  likes: number;
  createdAt: string;
  isTyping?: boolean;
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  color: string;
  isOnline: boolean;
}
