import { Todo } from "@/entities/todo.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { TodoRepository } from "@/repositories/todo.repository";

export class ViewAllTodosUseCase implements BaseUseCase<Todo[]> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    const todos = await this.todo.findAll();
    return todos;
  }
}
