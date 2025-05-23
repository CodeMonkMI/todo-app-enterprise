import { JsonWebToken } from "@todo/core/interfaces/JsonWebToken";

import jwt from "jsonwebtoken";

export class ImplJsonWebToken<T> implements JsonWebToken<T> {
  sign(payload: T): string | Promise<string> {
    const jwtSecret = process.env.JWT_SECRET || "my_old_secret";
    return jwt.sign(JSON.stringify(payload), jwtSecret);
  }
  verify(token: string): T | Promise<T> {
    const jwtSecret = process.env.JWT_SECRET || "my_old_secret";
    return jwt.verify(token, jwtSecret) as T;
  }
}
