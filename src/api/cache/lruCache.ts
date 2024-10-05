export class LRUCache<Key, Value> {
  private capacity: number;
  private cache: Map<Key, Value>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<Key, Value>();
    this.clear();
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

  clear(interval: number = 3600000): void {
    setInterval(() => this.cache.clear(), interval);
  }
}
