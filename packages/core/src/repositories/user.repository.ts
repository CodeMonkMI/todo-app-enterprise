import { User } from "@/entities/user.entities";

export type UserFilter = {
  completed?: boolean;
};

export type UserPagination = {
  page: number;
  limit: number;
};

export type UserID = string;

export enum UserRoleEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserRole = `${UserRoleEnum}`;

export type CreateUserDTO = {
  email: string;
  name: string;
  password: string;
  role: UserRole;
};
export type UpdateUserDTO = {
  email?: string;
  name?: string;
  role?: UserRole;
};

export type UserWithPassword = User & {
  password: string;
};

export interface UserRepository {
  findAll(options?: {
    filter?: UserFilter;
    pagination?: UserPagination;
  }): Promise<{ total: number; data: User[] }>;
  findById(id: UserID): Promise<User>;
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByEmailWithPassword(email: string): Promise<UserWithPassword>;
  update(id: UserID, data: CreateUserDTO): Promise<User>;
  remove(id: UserID): Promise<unknown>;
}
