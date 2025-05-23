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

  async findAll(options?: {
    filter?: UserFilter;
    pagination?: UserPagination;
  }): Promise<{ total: number; data: User[] }> {
    const page = options?.pagination?.page;
    const limit = options?.pagination?.limit;

    const whereOptions = { deletedAt: null, ...options?.filter };

    const users = await this.prisma.user.findMany({
      where: {
        ...whereOptions,
      },
      skip: page && limit ? limit * page - limit : undefined,
      take: limit,
    });
    const total = await this.count(whereOptions);
    const data = users.map(this.toUser);
    return { total: Math.ceil(total / (limit ?? 1)), data };
  }

  private async count(options: any): Promise<number> {
    return this.prisma.user.count({ where: options });
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
