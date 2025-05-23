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

// todo: filter out soft deleted items
export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    filter?: TodoFilter,
    pagination?: TodoPagination
  ): Promise<Todo[]> {
    // todo: add filter and pagination
    const todos = await this.prisma.todo.findMany();
    return todos.map(this.toTodo);
  }

  async findById(id: TodoID): Promise<null | Todo> {
    const findTodo = await this.prisma.todo.findUnique({
      where: { id: id as string },
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

  async update(id: TodoID, data: UpdateTodoDTO): Promise<Todo> {
    const updatedTodo = await this.prisma.todo.update({
      where: { id: id as string },
      data,
    });
    return this.toTodo(updatedTodo);
  }

  async remove(id: TodoID): Promise<unknown> {
    return await this.prisma.todo.delete({
      where: { id: id as string },
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
