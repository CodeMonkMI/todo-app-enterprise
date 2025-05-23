import { UserLoginUseCase } from "@todo/core/use-cases/user-login";
import { getUserRepository } from "@todo/database";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { ZodError } from "@todo/errors/interface/ValidationError";
import { LoginUserSchema } from "@todo/schemas";
import { BcryptJsHashPassword, ImplJsonWebToken } from "@todo/shared";
import { Request, Response } from "express";
const hashPassword = new BcryptJsHashPassword();
const jwt = new ImplJsonWebToken();
export const login = async (req: Request, res: Response) => {
  const parsedData = LoginUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    const errors = parsedData.error.errors as ZodError[];
    throw new ImplValidationError(400, "Login failed!", errors);
  }
  const data = parsedData.data;

  const createTodoUseCase = new UserLoginUseCase(
    getUserRepository(),
    hashPassword,
    jwt
  );
  const token = await createTodoUseCase.execute(data.email, data.password);

  res.status(202).json({ token });
  return;
};
