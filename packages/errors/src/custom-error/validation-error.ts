import { ValidationError, ZodError } from "../interface/ValidationError";

export class ImplValidationError implements ValidationError {
  constructor(
    private readonly code: number,
    private message: string,
    private errors: ZodError[]
  ) {}
  getErrors(): ZodError[] {
    return this.errors;
  }
  getCode(): number {
    return this.code;
  }
  getMessage(): string {
    return this.message;
  }
}
