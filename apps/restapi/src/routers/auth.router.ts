import { login } from "@/controller/auth.controller";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/login", login);

export default authRouter;
