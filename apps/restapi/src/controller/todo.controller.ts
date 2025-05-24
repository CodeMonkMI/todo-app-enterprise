import { Todo } from "@todo/core/entities/todo.entities";
import { User } from "@todo/core/entities/user.entities";
import { CreateTodoUseCase } from "@todo/core/use-cases/create-todo";
import { DeleteTodoUseCase } from "@todo/core/use-cases/delete-todo";
import { UpdateTodoUseCase } from "@todo/core/use-cases/update-todo";
import { ViewAllTodosUseCase } from "@todo/core/use-cases/view-all-todos";
import { ViewTodoUseCase } from "@todo/core/use-cases/view-todo";
import { getTodoRepository } from "@todo/database";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { ZodError } from "@todo/errors/interface/ValidationError";
import { CreateTodoSchema, UpdateTodoSchema } from "@todo/schemas";
import { Request, Response } from "express";

export const getAllTodos = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || undefined;
  const completed = req.query.completed || undefined;

  const filter: Partial<Todo> = {};
  if (completed) {
    filter.completed = completed === "true" ? true : false;
  }
  const pagination: {
    limit: number | null | undefined;
    page: number;
    totalPages: number;
  } = {
    limit,
    page,
    totalPages: 1,
  };

  const viewAllTodosUseCase = new ViewAllTodosUseCase(getTodoRepository());
  const { total, data: todos } = await viewAllTodosUseCase.execute(
    (req.user as User).id,
    {
      pagination,
      filter: { ...filter },
    }
  );
  if (limit) {
    pagination.totalPages = total;
  } else {
    pagination.limit = null;
  }
  res.status(200).json({ pagination, data: todos });
};

export const createTodo = async (req: Request, res: Response) => {
  const parsedData = CreateTodoSchema.safeParse(req.body);
  if (!parsedData.success) {
    const errors = parsedData.error.errors as ZodError[];
    throw new ImplValidationError(400, "Todo Creation failed!", errors);
  }
  const data = { ...parsedData.data, userId: (req.user as User).id };

  const createTodoUseCase = new CreateTodoUseCase(getTodoRepository());
  const todo = await createTodoUseCase.execute(data);

  res.status(201).json(todo);
  return;
};

export const singleTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  const viewTodoUseCase = new ViewTodoUseCase(getTodoRepository());
  const todo = await viewTodoUseCase.execute((req.user as User).id, id);

  res.status(200).json(todo);
  return;
};

export const updateTodo = async (req: Request, res: Response) => {
  const parsedData = UpdateTodoSchema.safeParse(req.body);
  if (!parsedData.success) {
    const errors = parsedData.error.errors as ZodError[];
    throw new ImplValidationError(400, "Todo Creation failed!", errors);
  }
  const id = req.params.id;
  const data = parsedData.data;

  const updateTodoUseCase = new UpdateTodoUseCase(getTodoRepository());
  const todo = await updateTodoUseCase.execute((req.user as User).id, id, data);

  res.status(202).json(todo);
  return;
};

export const removeTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteTodoUseCase = new DeleteTodoUseCase(getTodoRepository());
  const todo = await deleteTodoUseCase.execute((req.user as User).id, id);

  res.status(204).json(todo);
  return;
};
