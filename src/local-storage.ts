export class LocalStorageManager<T> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getData(): T[] | [] {
    const storedData = window.localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  setData(data: T[]): void {
  window.localStorage.setItem(this.storageKey, JSON.stringify(data));
 
  }

  clearData(): void {
    window.localStorage.removeItem(this.storageKey);
  }
}
