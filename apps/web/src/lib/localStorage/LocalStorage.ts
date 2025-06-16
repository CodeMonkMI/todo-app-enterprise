"use client";
interface ILocalStorage {
  getItem: () => string;
  setItem: (value: string) => void;
  removeItem: () => void;
}

export abstract class LocalStorage implements ILocalStorage {
  abstract key: string;
  getItem(): string {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(this.key) || "";
  }
  setItem(value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.key, value);
  }
  removeItem(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.key);
  }
}
