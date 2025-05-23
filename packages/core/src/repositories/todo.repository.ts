import { Todo } from "@/entities/todo.entities";
import { UserID } from "./user.repository";

export type TodoFilter = {
  completed?: boolean;
};

export type TodoPagination = {
  page: number;
  limit: number;
};

export type TodoID = string;

export type CreateTodoDTO = {
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
};

export type UpdateTodoDTO = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export interface TodoRepository {
  findAll(
    userId: UserID,
    options?: { filter?: TodoFilter; pagination?: TodoPagination }
  ): Promise<{ total: number; data: Todo[] }>;
  findById(userId: UserID, id: TodoID): Promise<null | Todo>;
  create(data: CreateTodoDTO): Promise<Todo>;
  update(userId: UserID, id: TodoID, data: CreateTodoDTO): Promise<Todo>;
  remove(userId: UserID, id: TodoID): Promise<unknown>;
}
