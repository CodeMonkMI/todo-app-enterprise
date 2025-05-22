import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import {
  CreateUserDTO,
  UserID,
  UserRepository,
} from "@/repositories/user.repository";

export class UpdateUserUseCase implements BaseUseCase<User> {
  constructor(private readonly user: UserRepository) {}

  async execute(id: UserID, data: CreateUserDTO): Promise<User> {
    const user = await this.user.findById(id);
    if (!user) throw new Error("User not found!");

    const findUserWithEmail = await this.user.findByEmail(data.email);
    if (findUserWithEmail.email !== user.email)
      throw new Error("Email is already exists!");

    const updatedUser = await this.user.update(id, data);
    if (!updatedUser) throw new Error("User not found!");

    return updatedUser;
  }
}
