import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { TodoID, TodoRepository } from "@/repositories/todo.repository";
import { UserID } from "@/repositories/user.repository";
import { BasicError } from "@todo/errors/custom-error/basic-error";

export class DeleteTodoUseCase implements BaseUseCase<void> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(userId: UserID, id: TodoID): Promise<void> {
    const todo = await this.todo.findById(userId, id);
    if (!todo) throw new BasicError(404, "Todo not found", ["Todo not found"]); // todo add custom exception

    await this.todo.remove(userId, id);
  }
}
