import { DateFormatter } from "@todo/core/interfaces/DateFromatter";

export class ImplDateFormatter implements DateFormatter {
  xAgo(date: Date): string {
    throw new Error("Method not implemented.");
  }
  xRemaining(date: Date): string {
    throw new Error("Method not implemented.");
  }
  xDate(date: Date): Date {
    throw new Error("Method not implemented.");
  }
  difference(date: Date): number | Date {
    throw new Error("Method not implemented.");
  }
}
