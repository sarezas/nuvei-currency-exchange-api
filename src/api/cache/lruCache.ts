export class LRUCache<Key, Value> {
  private capacity: number;
  private cache: Map<Key, Value>;
  // private intervalId: NodeJS.Timeout | null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<Key, Value>();
    // this.intervalId = this.setInterval();
  }

  get(key: Key): Value | undefined {
    const value = this.cache.get(key);

    if (!value) {
      return undefined;
    }

    // reset position
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key: Key, value: Value): void {
    // rm least recently used item if cache is full
    if (this.cache.size === this.capacity) {
      const lruItem = this.cache.keys().next().value;

      if (lruItem) {
        this.cache.delete(lruItem);
      }
    }

    // update position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);
  }

  debug(): void {
    console.log("Items in cache: ", Array.from(this.cache.entries()));
  }

  // TODO: 3600000
  // clear(): void {
  //   this.cache.clear();
  // }

  // clearInterval(): void {
  //   console.log(typeof this.intervalId, this.intervalId);
  //   if (this.intervalId !== null) {
  //     console.log(`clear old interval - ${this.intervalId}`);
  //     clearInterval(this.intervalId);
  //     // this.intervalId?.unref();
  //     this.intervalId = null;
  //   }
  // }

  // setInterval(interval: number = 2000): NodeJS.Timeout {
  //   this.clearInterval();
  //   return setInterval(() => {
  //     console.log(`set new interval - ${this.intervalId}`);
  //   }, interval);
  // }
}
