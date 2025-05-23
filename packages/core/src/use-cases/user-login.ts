import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { HashPassword } from "@/interfaces/HashPassword";
import { JsonWebToken } from "@/interfaces/JsonWebToken";
import { UserRepository } from "@/repositories/user.repository";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { ZodError } from "node_modules/@todo/errors/dist/interface/ValidationError";

export class UserLoginUseCase implements BaseUseCase<string> {
  constructor(
    private readonly user: UserRepository,
    private readonly hashPassword: HashPassword,
    private readonly jsonwebtoken: JsonWebToken<{ id: string; role: string }>
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const errors: ZodError[] = [
      {
        code: "custom",
        message: "Invalid Credentials!",
        path: ["email", "password"],
      },
    ];
    const user = await this.user.findByEmailWithPassword(email);
    if (!user) {
      throw new ImplValidationError(400, "Failed to login!", errors);
    }

    const isValid = await this.hashPassword.compare(password, user.password);

    if (!isValid)
      throw new ImplValidationError(400, "Failed to login!", errors);

    const token: string = await this.jsonwebtoken.sign({
      id: user.id,
      role: user.role.toLocaleLowerCase(),
    });

    return token;
  }
}
