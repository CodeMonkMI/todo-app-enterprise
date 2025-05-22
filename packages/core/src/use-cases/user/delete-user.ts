import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { UserID, UserRepository } from "@/repositories/user.repository";

export class DeleteUserUseCase implements BaseUseCase<void> {
  constructor(private readonly user: UserRepository) {}

  async execute(id: UserID): Promise<void> {
    const user = await this.user.findById(id);
    if (!user) throw new Error("User not found!");

    this.user.remove(id);
  }
}
