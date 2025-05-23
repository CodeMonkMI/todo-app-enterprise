import { UserRoleEnum } from "@todo/core/repositories/user.repository";
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.string().min(1, "Email is required!").email("Email must be valid!"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(6, "Password must be more than 6 chars")
    .max(32, "Password must not be more than 32 chars"),
  role: z.nativeEnum(UserRoleEnum),
});

export const UpdateUserSchema = CreateUserSchema.omit({
  password: true,
}).partial();
