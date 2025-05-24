"use client";
interface ILocalStorage {
  get: () => string;
  set: (value: string) => void;
  remove: () => void;
}

export abstract class LocalStorage implements ILocalStorage {
  abstract key: string;
  get(): string {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(this.key) || "";
  }
  set(value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.key, value);
  }
  remove(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.key);
  }
}
