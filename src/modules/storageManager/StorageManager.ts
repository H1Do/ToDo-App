class StorageManager<T> {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getData(): T | null {
    if (!localStorage.getItem(this.name)) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.name)!);
  }

  public setData(data: T) {
    console.log(data);
    localStorage.setItem(this.name, JSON.stringify(data));
  }
}

export default StorageManager;
