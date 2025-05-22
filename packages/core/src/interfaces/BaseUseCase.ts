export interface BaseUseCase<T> {
  execute(...args: any[]): Promise<T>;
}
