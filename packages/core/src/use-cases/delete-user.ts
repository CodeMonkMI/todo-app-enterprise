import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { UserID, UserRepository } from "@/repositories/user.repository";
import { BasicError } from "@todo/errors/custom-error/basic-error";

export class DeleteUserUseCase implements BaseUseCase<void> {
  constructor(private readonly user: UserRepository) {}

  async execute(id: UserID): Promise<void> {
    const user = await this.user.findById(id);
    if (!user) throw new BasicError(404, "User not found!", ["User not found"]);

    this.user.remove(id);
  }
}
