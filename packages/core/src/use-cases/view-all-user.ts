import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import {
  UserFilter,
  UserPagination,
  UserRepository,
} from "@/repositories/user.repository";

export class ViewAllUsersUseCase
  implements BaseUseCase<{ total: number; data: User[] }>
{
  constructor(private readonly user: UserRepository) {}

  async execute(options?: {
    filter?: UserFilter;
    pagination?: UserPagination;
  }): Promise<{ total: number; data: User[] }> {
    return await this.user.findAll(options);
  }
}
