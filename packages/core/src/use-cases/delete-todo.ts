import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { TodoID, TodoRepository } from "@/repositories/todo.repository";

export class DeleteTodoUseCase implements BaseUseCase<void> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(id: TodoID): Promise<void> {
    const todo = await this.todo.findById(id);
    if (!todo) throw new Error("Todo not found"); // todo add custom exception

    await this.todo.remove(id);
  }
}
