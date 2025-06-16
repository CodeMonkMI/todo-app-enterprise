"use client";
import { jwtDecode } from "jwt-decode";
import { LocalStorage } from "../localStorage";

class AuthToken<T> extends LocalStorage {
  key: string = "authToken";
  decode(token: string = this.getItem()): T {
    return jwtDecode(token);
  }
}

export const authToken = new AuthToken();
