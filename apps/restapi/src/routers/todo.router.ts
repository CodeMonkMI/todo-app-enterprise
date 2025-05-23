import {
  createTodo,
  getAllTodos,
  removeTodo,
  singleTodo,
  updateTodo,
} from "@/controller/todo.controller";
import { authMiddleware } from "@/niddleware/auth.middleware";
import { Router } from "express";

const { authenticate } = authMiddleware;

const todoRouter: Router = Router();

todoRouter.use(authenticate);

todoRouter.get("/", getAllTodos);
todoRouter.get("/:id", singleTodo);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", removeTodo);

export default todoRouter;
