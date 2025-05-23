import { Todo } from "@/entities/todo.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { TodoFilter, TodoRepository } from "@/repositories/todo.repository";
import { UserID, UserPagination } from "@/repositories/user.repository";

export class ViewAllTodosUseCase implements BaseUseCase<Todo[]> {
  constructor(private readonly todo: TodoRepository) {}

  async execute(
    userId: UserID,
    data?: {
      filter?: TodoFilter;
      pagination?: UserPagination;
    }
  ): Promise<Todo[]> {
    const todos = await this.todo.findAll(
      userId,
      data?.filter,
      data?.pagination
    );
    return todos;
  }
}
