import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import {
  UserFilter,
  UserPagination,
  UserRepository,
} from "@/repositories/user.repository";

export class ViewAllUsersUseCase implements BaseUseCase<User[]> {
  constructor(private readonly user: UserRepository) {}

  async execute(data: {
    filter?: UserFilter;
    pagination?: UserPagination;
  }): Promise<User[]> {
    const user = await this.user.findAll(data.filter, data.pagination);
    if (!user) return [];
    return user;
  }
}
