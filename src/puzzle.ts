export abstract class Puzzle<T> {
  constructor(protected input: string) {}
  abstract solution(): T;
}
