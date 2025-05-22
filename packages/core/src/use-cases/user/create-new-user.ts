import { User } from "@/entities/user.entities";
import { BaseUseCase } from "@/interfaces/BaseUseCase";
import { HashPassword } from "@/interfaces/HashPassword";
import { CreateUserDTO, UserRepository } from "@/repositories/user.repository";

export class CreateNewUserUseCase implements BaseUseCase<User> {
  constructor(
    private readonly user: UserRepository,
    private readonly hashPassword: HashPassword
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = await this.user.findByEmail(data.email);
    if (user) throw new Error("User is already exists");

    const hashPassword = await this.hashPassword.hash(data.password);
    const createdUser = await this.user.create({
      ...data,
      password: hashPassword,
    });

    return createdUser;
  }
}
