import { HashPassword } from "@todo/core/interfaces/HashPassword";
import bcrypt from "bcryptjs";
export class BcryptJsHashPassword implements HashPassword {
  hash(password: string): string | Promise<string> {
    return bcrypt.hash(password, 10);
  }
  compare(password: string, hash: string): boolean | Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
