import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { HashPassword } from "@/interfaces/HashPassword";
import { JsonWebToken } from "@/interfaces/JsonWebToken";
import { UserRepository } from "@/repositories/user.repository";

export class UserLoginUseCase implements BaseUseCase<string> {
  constructor(
    private readonly user: UserRepository,
    private readonly hashPassword: HashPassword,
    private readonly jsonwebtoken: JsonWebToken<{ id: string }>
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.user.findByEmailWithPassword(email);
    if (!user) throw new Error("User not found");

    const isValid = this.hashPassword.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const token: string = await this.jsonwebtoken.sign({ id: user.id });

    return token;
  }
}
