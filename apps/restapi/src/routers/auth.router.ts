import { login, me, register } from "@/controller/auth.controller";
import { authMiddleware } from "@/niddleware/auth.middleware";
import { Router } from "express";
const { authenticate } = authMiddleware;

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/me", authenticate, me);

export default authRouter;
