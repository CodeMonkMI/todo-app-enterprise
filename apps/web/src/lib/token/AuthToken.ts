"use client";
import { jwtDecode } from "jwt-decode";
import { LocalStorage } from "../localStorage";

class AuthToken extends LocalStorage {
  key: string = "authToken";
  decode(token: string = this.get()) {
    return jwtDecode(token);
  }
}

export const authToken = new AuthToken();
