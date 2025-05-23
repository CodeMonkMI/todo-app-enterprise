import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import todoRouter from "./routers/todo.router";
import userRouter from "./routers/user.router";

dotenv.config();

export function createApp() {
  const app: Express = express();

  // basic middlewares
  app.use(cors({ origin: true }));
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/todos", todoRouter);
  app.use("/users", userRouter);

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
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  });

  return app;
}
