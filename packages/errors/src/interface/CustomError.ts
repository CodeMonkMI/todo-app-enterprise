export interface CustomError {
  getCode(): number;
  getMessage(): string;
  getErrors(): unknown[];
}
