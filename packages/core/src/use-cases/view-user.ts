import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { UserID, UserRepository } from "@/repositories/user.repository";
import { BasicError } from "@todo/errors/custom-error/basic-error";

export class ViewUserUseCase implements BaseUseCase<User> {
  constructor(private readonly user: UserRepository) {}

  async execute(id: UserID): Promise<User> {
    const user = await this.user.findById(id);
    if (!user)
      throw new BasicError(404, "User not found!", ["User not found!"]);

    return user;
  }
}
