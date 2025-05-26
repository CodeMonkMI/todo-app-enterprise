import { User } from "@todo/core/entities/user.entities";
import { UserRoleEnum } from "@todo/core/repositories/user.repository";
import { CreateNewUserUseCase } from "@todo/core/use-cases/create-new-user";
import { DeleteUserUseCase } from "@todo/core/use-cases/delete-user";
import { UpdateUserUseCase } from "@todo/core/use-cases/udpate-user";
import { ViewAllUsersUseCase } from "@todo/core/use-cases/view-all-user";
import { ViewUserUseCase } from "@todo/core/use-cases/view-user";
import { getUserRepository } from "@todo/database";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { ZodError } from "@todo/errors/interface/ValidationError";
import { CreateUserSchema, UpdateUserSchema } from "@todo/schemas";
import { BcryptJsHashPassword } from "@todo/shared";
import { Request, Response } from "express";

const hashPassword = new BcryptJsHashPassword();

export const getAllUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || undefined;

  const pagination: {
    limit: number | null | undefined;
    page: number;
    totalPages: number;
  } = {
    limit,
    page,
    totalPages: 1,
  };

  const viewAllUsersUseCase = new ViewAllUsersUseCase(getUserRepository());
  const { total, data: users } = await viewAllUsersUseCase.execute({
    pagination,
  });
  if (limit) {
    pagination.totalPages = total;
  } else {
    pagination.limit = null;
  }
  res.status(200).json({ pagination, data: users });
};

export const createUser = async (req: Request, res: Response) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    const errors = parsedData.error.errors as ZodError[];
    throw new ImplValidationError(400, "Todo Creation failed!", errors);
  }
  const data = parsedData.data;

  if ((req.user as User).role !== "SUPER_ADMIN") {
    data.role = UserRoleEnum.USER;
  }

  const createUserUseCase = new CreateNewUserUseCase(
    getUserRepository(),
    hashPassword
  );
  const user = await createUserUseCase.execute(data);

  res.status(201).json(user);
  return;
};

export const singleUser = async (req: Request, res: Response) => {
  // user: add validation with zod
  const id = req.params.id;

  const viewUserUseCase = new ViewUserUseCase(getUserRepository());
  const user = await viewUserUseCase.execute(id);

  res.status(200).json(user);
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  const parsedData = UpdateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    const errors = parsedData.error.errors as ZodError[];
    throw new ImplValidationError(400, "Todo Creation failed!", errors);
  }

  const id = req.params.id;
  const data = parsedData.data;

  const updateUserUseCase = new UpdateUserUseCase(getUserRepository());
  const user = await updateUserUseCase.execute(id, data);

  res.status(202).json(user);
  return;
};

export const removeUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteUserUseCase = new DeleteUserUseCase(getUserRepository());
  const user = await deleteUserUseCase.execute(id);

  res.status(204).json(user);
  return;
};
