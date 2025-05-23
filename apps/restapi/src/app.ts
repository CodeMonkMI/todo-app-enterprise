import { BasicError } from "@todo/errors/custom-error/basic-error";
import { ImplValidationError } from "@todo/errors/custom-error/validation-error";
import { PermissionManger } from "@todo/pm";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import passport from "passport";
import { authMiddleware } from "./niddleware/auth.middleware";
import authRouter from "./routers/auth.router";
import todoRouter from "./routers/todo.router";
import userRouter from "./routers/user.router";

dotenv.config();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
      pm?: PermissionManger;
    }
  }
}

export function createApp() {
  const app: Express = express();

  // basic middlewares
  app.use(cors({ origin: true }));
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // auth middleware
  app.use(passport.initialize());
  authMiddleware.init();

  app.use("/todos", todoRouter);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);

  // health route
  app.get("/health", (req: Request, res: Response): any => {
    try {
      return res.status(200).json({ message: "UP" });
    } catch (e) {
      return res.status(500).json({ message: "DOWN" });
    }
  });
  // 404 not found handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  // 500 internal server error handler
  app.use((err: any, _req: any, res: Response, _next: any) => {
    if (err instanceof BasicError) {
      res.status(err.getCode()).json({ message: err.getMessage() });
      return;
    }
    if (err instanceof ImplValidationError) {
      res.status(err.getCode()).json(err.getErrors());
      return;
    }
    res
      .status(500)
      .json({ message: "Something Went wrong! Please try again later!" });
  });

  return app;
}
