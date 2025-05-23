import { CreateTodoUseCase } from "@todo/core/use-cases/create-todo";
import { DeleteTodoUseCase } from "@todo/core/use-cases/delete-todo";
import { UpdateTodoUseCase } from "@todo/core/use-cases/update-todo copy";
import { ViewAllTodosUseCase } from "@todo/core/use-cases/view-all-todos";
import { ViewTodoUseCase } from "@todo/core/use-cases/view-todo";
import { getTodoRepository } from "@todo/database";
import { Request, Response } from "express";

export const getAllTodos = async (_req: Request, res: Response) => {
  const viewAllTodosUseCase = new ViewAllTodosUseCase(getTodoRepository());
  const todos = await viewAllTodosUseCase.execute();

  res.status(200).json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  // todo: add validation with zod
  const data = req.body;

  const createTodoUseCase = new CreateTodoUseCase(getTodoRepository());
  const todo = await createTodoUseCase.execute(data);

  res.status(201).json(todo);
  return;
};

export const singleTodo = async (req: Request, res: Response) => {
  // todo: add validation with zod
  const id = req.params.id;

  const viewTodoUseCase = new ViewTodoUseCase(getTodoRepository());
  const todo = await viewTodoUseCase.execute(id);

  res.status(201).json(todo);
  return;
};

export const updateTodo = async (req: Request, res: Response) => {
  // todo: add validation with zod
  const id = req.params.id;
  const data = req.body;

  const updateTodoUseCase = new UpdateTodoUseCase(getTodoRepository());
  const todo = await updateTodoUseCase.execute(id, data);

  res.status(201).json(todo);
  return;
};

export const removeTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteTodoUseCase = new DeleteTodoUseCase(getTodoRepository());
  const todo = await deleteTodoUseCase.execute(id);

  res.status(201).json(todo);
  return;
};
