import { z } from "zod";

export const CreateTodoSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  userId: z.string().min(1, "User id is required!"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export const UpdateTodoSchema = CreateTodoSchema.partial();
