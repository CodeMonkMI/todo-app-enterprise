import { login, register } from "@/controller/auth.controller";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
