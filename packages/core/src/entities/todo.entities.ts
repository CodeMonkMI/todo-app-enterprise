export interface Todo {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  completed: boolean;
}
