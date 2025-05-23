import {
  createUser,
  getAllUsers,
  removeUser,
  singleUser,
  updateUser,
} from "@/controller/user.controller";
import { Router } from "express";

const userRouter: Router = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", singleUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", removeUser);

export default userRouter;
