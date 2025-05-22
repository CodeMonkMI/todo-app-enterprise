import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { UserID, UserRepository } from "@/repositories/user.repository";

export class ViewUserUseCase implements BaseUseCase<User> {
  constructor(private readonly user: UserRepository) {}

  async execute(id: UserID): Promise<User> {
    const user = await this.user.findById(id);
    if (!user) throw new Error("User not found!");

    return user;
  }
}
