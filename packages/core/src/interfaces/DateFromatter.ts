export interface DateFormatter {
  xAgo(date: Date): string;
  xRemaining(date: Date): string;
  xDate(date: Date): Date;
  difference(date: Date): number | Date;
}
