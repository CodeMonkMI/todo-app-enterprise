import { Todo } from "@/entities/todo.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { TodoFilter, TodoRepository } from "@/repositories/todo.repository";
import { UserID, UserPagination } from "@/repositories/user.repository";

export class ViewAllTodosUseCase
  implements BaseUseCase<{ total: number; data: Todo[] }>
{
  constructor(private readonly todo: TodoRepository) {}

  async execute(
    userId: UserID,
    options?: {
      filter?: TodoFilter;
      pagination?: UserPagination;
    }
  ): Promise<{ total: number; data: Todo[] }> {
    const todos = await this.todo.findAll(userId, options);
    return todos;
  }
}
