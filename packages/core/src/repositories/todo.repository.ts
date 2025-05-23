import { Todo } from "@/entities/todo.entities";

export type TodoFilter = {
  completed?: boolean;
};

export type TodoPagination = {
  page: number;
  limit: number;
};

export type TodoID = string | number;

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
  findAll(filter?: TodoFilter, pagination?: TodoPagination): Promise<Todo[]>;
  findById(id: TodoID): Promise<null | Todo>;
  create(data: CreateTodoDTO): Promise<null | Todo>;
  update(id: TodoID, data: CreateTodoDTO): Promise<Todo>;
  remove(id: TodoID): Promise<unknown>;
}
