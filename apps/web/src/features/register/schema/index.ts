import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.string().min(1, "Email is required!").email("Email must be valid!"),
  password: z.string().min(1, "Password is required!"),
});

export type RegisterFormInputs = z.infer<typeof RegisterUserSchema>;

export type RegisterResponse = {
  token: string;
};
