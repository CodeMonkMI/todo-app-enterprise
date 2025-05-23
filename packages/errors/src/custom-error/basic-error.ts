import { CustomError } from "@/interface/CustomError";

export class BasicError implements CustomError {
  constructor(
    private readonly code: number,
    private message: string,
    private errors: string[]
  ) {}
  getCode(): number {
    return this.code;
  }
  getMessage(): string {
    return this.message;
  }
  getErrors(): unknown[] {
    return this.errors;
  }
}
