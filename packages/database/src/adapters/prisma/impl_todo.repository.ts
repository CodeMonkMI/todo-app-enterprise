import { PrismaClient, Todo as PrismaTodo } from "@prisma/client";
import { Todo } from "@todo/core/entities/todo.entities";
import {
  CreateTodoDTO,
  TodoFilter,
  TodoID,
  TodoPagination,
  TodoRepository,
  UpdateTodoDTO,
} from "@todo/core/repositories/todo.repository";
import { UserID } from "@todo/core/repositories/user.repository";

export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    userId: UserID,
    filter?: TodoFilter,
    pagination?: TodoPagination
  ): Promise<Todo[]> {
    // todo: add pagination

    const todos = await this.prisma.todo.findMany({
      where: {
        deletedAt: null,
        userId,
        ...filter,
      },
    });
    return todos.map(this.toTodo);
  }

  async findById(userId: UserID, id: TodoID): Promise<null | Todo> {
    const findTodo = await this.prisma.todo.findUnique({
      where: { id, deletedAt: null, userId },
    });
    if (!findTodo) return null;
    return this.toTodo(findTodo);
  }

  async create(data: CreateTodoDTO): Promise<null | Todo> {
    const newTodo = await this.prisma.todo.create({
      data,
    });
    return this.toTodo(newTodo);
  }

  async update(userId: UserID, id: TodoID, data: UpdateTodoDTO): Promise<Todo> {
    const findTodo = await this.findById(userId, id);
    if (!findTodo) throw new Error("Todo not found");
    const updatedTodo = await this.prisma.todo.update({
      where: { id, deletedAt: null },
      data,
    });
    return this.toTodo(updatedTodo);
  }

  async remove(userId: UserID, id: TodoID): Promise<unknown> {
    const findTodo = await this.findById(userId, id);
    if (!findTodo) throw new Error("Todo not found");
    return await this.prisma.todo.delete({
      where: { id },
    });
  }

  private toTodo(todo: PrismaTodo): Todo {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      description: todo.description,
    };
  }
}
