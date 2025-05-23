export interface CustomError {
  getCode(): number | string;
  getMessage(): string;
  getErrors(): unknown[];
}

export type ZodError = {
  code: string | number;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

export interface ValidationError extends CustomError {
  getErrors(): ZodError[];
}
