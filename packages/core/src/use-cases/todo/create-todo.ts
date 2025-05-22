import { Todo } from "@/entities/todo.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { CreateTodoDTO, TodoRepository } from "@/repositories/todo.repository";

export class CreateTodoUseCase implements BaseUseCase<Todo> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(data: CreateTodoDTO): Promise<Todo> {
    const todo = await this.todo.create(data);
    return todo;
  }
}
