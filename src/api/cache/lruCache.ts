export class LRUCache<Key, Value> {
  private capacity: number;
  private refreshInterval: number;
  private cache: Map<Key, Value>;
  private timerId: NodeJS.Timeout | null = null;

  constructor(capacity: number, refreshInterval: number) {
    this.capacity = capacity;
    this.refreshInterval = refreshInterval;
    this.cache = new Map<Key, Value>();
    this.setTimerForCacheClearance();
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

  set(key: Key, value: Value): void {
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

  clear(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.cache.clear();
    this.setTimerForCacheClearance();
  }

  private setTimerForCacheClearance(): void {
    this.timerId = setInterval(() => {
      this.clear();
    }, this.refreshInterval);
  }
}
