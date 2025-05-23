import { CustomError } from "./CustomError";

export type ZodError = {
  code: string | number;
  expected?: string;
  received?: string;
  path: string[];
  message: string;
};

export interface ValidationError extends CustomError {
  getErrors(): ZodError[];
}
