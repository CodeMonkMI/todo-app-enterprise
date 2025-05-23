export interface CustomError {
  getCode(): number | string;
  getMessage(): string;
  getErrors(): unknown[];
}
