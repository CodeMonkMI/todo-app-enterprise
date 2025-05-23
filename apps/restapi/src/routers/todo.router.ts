import {
  createTodo,
  getAllTodos,
  removeTodo,
  singleTodo,
  updateTodo,
} from "@/controller/todo.controller";
import { Router } from "express";

const todoRouter: Router = Router();

todoRouter.get("/", getAllTodos);
todoRouter.get("/:id", singleTodo);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", removeTodo);

export default todoRouter;
