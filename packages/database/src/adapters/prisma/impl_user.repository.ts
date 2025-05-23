import { PrismaClient } from "@prisma/client";
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

  findAll(filter?: UserFilter, pagination?: UserPagination): Promise<User[]> {
    // todo implement pagination and filter
    return this.prisma.user.findMany();
  }
  async findById(id: UserID): Promise<null | User> {
    return await this.prisma.user.findFirst({
      where: { id: id as string },
    });
  }
  create(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
  }
  findByEmail(email: string): Promise<null | User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  findByEmailWithPassword(email: string): Promise<null | UserWithPassword> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  update(id: UserID, data: UpdateUserDTO): Promise<User> {
    return this.prisma.user.update({
      where: { id: id as string },
      data: {
        ...data,
      },
    });
  }
  remove(id: UserID): Promise<unknown> {
    return this.prisma.user.delete({
      where: { id: id as string },
    });
  }
}
