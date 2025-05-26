import { z } from "zod";
import { CreateUserSchema } from "./user.schemas";

export const LoginUserSchema = z.object({
  email: z.string().min(1, "Email is required!"),
  password: z.string().min(1, "Password is required!"),
});
export const RegisterUserSchema = CreateUserSchema.omit({ role: true });
