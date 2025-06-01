export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface ProgressItem {
  name: string;
  progress: number;
  color: string;
}

export interface UploadItem {
  name: string;
  type: string;
  date: string;
  size: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MoodOption {
  emoji: string;
  label: string;
}

export interface Debt {
  id: string;
  creditor: string;
  amount: number;
  status: 'offen' | 'teilweise' | 'bezahlt';
  dueDate: string;
}