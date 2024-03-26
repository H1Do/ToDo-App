export class Task {
  private description: string = '';
  private isCompleted: boolean = false;

  constructor(description: string, isCompleted: boolean) {
    this.description = description;
    this.isCompleted = isCompleted;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): boolean {
    return this.isCompleted;
  }

  public changeStatus(): void {
    this.isCompleted = !this.isCompleted;
  }
}
