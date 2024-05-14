export class Task {
  private id: number;
  private description: string = '';
  private isCompleted: boolean = false;

  constructor(
    description: string,
    isCompleted: boolean,
    id: number = Date.now(),
  ) {
    this.id = id;
    this.description = description;
    this.isCompleted = isCompleted;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): boolean {
    return this.isCompleted;
  }

  public getId(): number {
    return this.id;
  }

  public changeStatus(): void {
    this.isCompleted = !this.isCompleted;
  }
}
