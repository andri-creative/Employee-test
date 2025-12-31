import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5,
});

export const getCache = (key: string) => cache.get(key);
export const setCache = (key: string, value: any) => cache.set(key, value);
export const deleteCache = (key: string) => cache.delete(key);
export const clearCache = () => cache.clear();
