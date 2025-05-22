import { User } from "@/entities/user.entities";

export type UserFilter = {
  completed?: boolean;
};

export type UserPagination = {
  page: number;
  limit: number;
};

export type UserID = string | number;

export enum UserRoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

export type UserRole = `${UserRoleEnum}`;

export type CreateUserDTO = {
  email: string;
  name: string;
  password: string;
  role: UserRole;
};

export type UserWithPassword = User & {
  password: string;
};

export interface UserRepository {
  findAll(filter?: UserFilter, pagination?: UserPagination): Promise<User[]>;
  findById(id: UserID): Promise<User>;
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByEmailWithPassword(email: string): Promise<UserWithPassword>;
  update(id: UserID, data: CreateUserDTO): Promise<User>;
  remove(id: UserID): Promise<unknown>;
}
