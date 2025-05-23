import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().min(1, "Email is required!"),
  password: z.string().min(1, "Password is required!"),
});

export const UpdateUserSchema = LoginUserSchema.omit({
  password: true,
}).partial();
