import { PrismaTodoRepository } from "./adapters/prisma/impl_todo.repository";
import { PrismaUserRepository } from "./adapters/prisma/impl_user.repository";
import { prismaClient } from "./client/prisma";

export type Adapter = "prisma";

export const getUserRepository = (adapter: Adapter = "prisma") => {
  if (adapter === "prisma") {
    return new PrismaUserRepository(prismaClient);
  }
  throw new Error(`Adapter ${adapter} not found`);
};
export const getTodoRepository = (adapter: Adapter = "prisma") => {
  if (adapter === "prisma") {
    return new PrismaTodoRepository(prismaClient);
  }
  throw new Error(`Adapter ${adapter} not found`);
};
