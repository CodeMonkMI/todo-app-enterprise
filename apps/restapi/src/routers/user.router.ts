import {
  createUser,
  getAllUsers,
  removeUser,
  singleUser,
  updateUser,
} from "@/controller/user.controller";
import { authMiddleware } from "@/niddleware/auth.middleware";
import { Router } from "express";
const { authenticate, authorize } = authMiddleware;

const userRouter: Router = Router();
userRouter.use(authenticate);
userRouter.get(
  "/",
  authorize({ role: "admin", permissions: ["user:all"] }),
  getAllUsers
);
userRouter.get(
  "/:id",
  authorize({ role: "admin", permissions: ["user:one"] }),
  singleUser
);
userRouter.post(
  "/",
  authorize({ role: "admin", permissions: ["user:create"] }),
  createUser
);
userRouter.put(
  "/:id",
  authorize({ role: "super_admin", permissions: ["user:update"] }),
  updateUser
);
userRouter.delete(
  "/:id",
  authorize({ role: "super_admin", permissions: ["user:delete"] }),
  removeUser
);

export default userRouter;
