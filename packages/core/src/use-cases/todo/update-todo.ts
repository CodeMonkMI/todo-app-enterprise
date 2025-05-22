import { Todo } from "@/entities/todo.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import {
  CreateTodoDTO,
  TodoID,
  TodoRepository,
} from "@/repositories/todo.repository";

export class CreateTodoUseCase implements BaseUseCase<Todo> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(id: TodoID, data: CreateTodoDTO): Promise<Todo> {
    const todo = await this.todo.findById(id);
    if (!todo) throw new Error("Todo not found"); // todo add custom exception

    return await this.todo.update(id, data);
  }
}
