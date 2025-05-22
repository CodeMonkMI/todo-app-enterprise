export interface JsonWebToken<T> {
  sign(payload: T): string | Promise<string>;
  verify(token: string): T | Promise<T>;
}
