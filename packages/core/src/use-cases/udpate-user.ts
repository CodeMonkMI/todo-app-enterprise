import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import {
  UpdateUserDTO,
  UserID,
  UserRepository,
} from "@/repositories/user.repository";
import { BasicError } from "@todo/errors/custom-error/basic-error";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { ZodError } from "node_modules/@todo/errors/dist/interface/ValidationError";

export class UpdateUserUseCase implements BaseUseCase<User> {
  constructor(private readonly user: UserRepository) {}

  async execute(id: UserID, data: UpdateUserDTO): Promise<User> {
    const user = await this.user.findById(id);
    if (!user)
      throw new BasicError(404, "User not found!", ["User not found!"]);
    if (data.email) {
      const findUserWithEmail = await this.user.findByEmail(data.email);
      if (findUserWithEmail && findUserWithEmail.email !== user.email) {
        const errors: ZodError[] = [
          {
            code: "custom",
            message: "Email is already exists!",
            path: ["email"],
          },
        ];
        throw new ImplValidationError(404, "Email is already exists!", errors);
      }
    }

    const updatedUser = await this.user.update(id, data);
    if (!updatedUser) {
      throw new BasicError(404, "User update failed!", ["User update failed"]);
    }

    return updatedUser;
  }
}
