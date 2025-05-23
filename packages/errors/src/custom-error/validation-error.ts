import { ValidationError, ZodError } from "../interface/ValidationError";

export class ImplValidationError implements ValidationError {
  constructor(
    private readonly code: string | number,
    private message: string,
    private errors: ZodError[]
  ) {}
  getErrors(): ZodError[] {
    return this.errors;
  }
  getCode(): number | string {
    return this.code;
  }
  getMessage(): string {
    return this.message;
  }
}
