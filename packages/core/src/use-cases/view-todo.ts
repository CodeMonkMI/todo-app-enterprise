import { Todo } from "@/entities/todo.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { TodoID, TodoRepository } from "@/repositories/todo.repository";

export class ViewTodoUseCase implements BaseUseCase<null | Todo> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(id: TodoID): Promise<null | Todo> {
    const todo = await this.todo.findById(id);
    return todo;
  }
}
