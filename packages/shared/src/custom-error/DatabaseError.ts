import { CustomError } from "@todo/core/interfaces/CustomError";

export class DatabaseError implements CustomError {
  constructor(
    private readonly code: string | number,
    private message: string,
    private errors: string[]
  ) {}
  getCode(): number | string {
    return this.code;
  }
  getMessage(): string {
    return this.message;
  }
  getErrors(): unknown[] {
    return this.errors;
  }
}
