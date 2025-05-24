import { z } from "zod";

export const CreateTodoSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().optional(),
});

export const UpdateTodoSchema = CreateTodoSchema.partial();
