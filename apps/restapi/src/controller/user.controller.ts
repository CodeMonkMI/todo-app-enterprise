import { CreateNewUserUseCase } from "@todo/core/use-cases/create-new-user";
import { DeleteUserUseCase } from "@todo/core/use-cases/delete-user";
import { UpdateUserUseCase } from "@todo/core/use-cases/udpate-user";
import { ViewAllUsersUseCase } from "@todo/core/use-cases/view-all-user";
import { ViewUserUseCase } from "@todo/core/use-cases/view-user";
import { getUserRepository } from "@todo/database";
import { BcryptJsHashPassword } from "@todo/shared";
import { Request, Response } from "express";

const hashPassword = new BcryptJsHashPassword();

export const getAllUsers = async (_req: Request, res: Response) => {
  const viewAllUsersUseCase = new ViewAllUsersUseCase(getUserRepository());
  const user = await viewAllUsersUseCase.execute();

  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  // todo: add validation with zod
  const data = req.body;

  console.log(data);
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

  res.status(201).json(user);
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  // user: add validation with zod
  const id = req.params.id;
  const data = req.body;

  const updateUserUseCase = new UpdateUserUseCase(getUserRepository());
  const user = await updateUserUseCase.execute(id, data);

  res.status(201).json(user);
  return;
};

export const removeUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteUserUseCase = new DeleteUserUseCase(getUserRepository());
  const user = await deleteUserUseCase.execute(id);

  res.status(201).json(user);
  return;
};
