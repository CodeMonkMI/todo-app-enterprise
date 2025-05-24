import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { HashPassword } from "@/interfaces/HashPassword";
import { CreateUserDTO, UserRepository } from "@/repositories/user.repository";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { ZodError } from "@todo/errors/interface/ValidationError";

export class CreateNewUserUseCase implements BaseUseCase<User> {
  constructor(
    private readonly user: UserRepository,
    private readonly hashPassword: HashPassword
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = await this.user.findByEmail(data.email);
    if (user) {
      const errors: ZodError[] = [
        {
          code: "custom",
          message: "Email is already exists",
          path: ["email"],
        },
      ];
      throw new ImplValidationError(400, "Email is already exists", errors);
    }

    const hashPassword = await this.hashPassword.hash(data.password);
    const createdUser = await this.user.create({
      ...data,
      password: hashPassword,
    });

    return createdUser;
  }
}
