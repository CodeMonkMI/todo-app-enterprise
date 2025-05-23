import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { User } from "@todo/core/entities/user.entities";
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserFilter,
  UserID,
  UserPagination,
  UserRepository,
  UserWithPassword,
} from "@todo/core/repositories/user.repository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    filter?: UserFilter,
    pagination?: UserPagination
  ): Promise<User[]> {
    // todo implement pagination and filter
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
    return users.map(this.toUser);
  }
  async findById(id: UserID): Promise<null | User> {
    const user = await this.prisma.user.findFirst({
      where: { id: id as string, deletedAt: null },
    });
    if (!user) return null;
    return this.toUser(user);
  }
  async create(data: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });
    return this.toUser(user);
  }
  async findByEmail(email: string): Promise<null | User> {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
    if (!user) return null;
    return this.toUser(user);
  }
  /**
   * this method only use for login
   * @param email
   * @returns
   */
  findByEmailWithPassword(email: string): Promise<null | UserWithPassword> {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }
  async update(id: UserID, data: UpdateUserDTO): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found!");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id as string },
      data: {
        ...data,
      },
    });
    return this.toUser(updatedUser);
  }
  async remove(id: UserID): Promise<unknown> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found!");
    }
    return this.prisma.user.update({
      where: { id: id as string },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  private toUser(user: PrismaUser): User {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
