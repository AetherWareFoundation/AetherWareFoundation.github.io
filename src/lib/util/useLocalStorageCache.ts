import { useCallback } from "react";

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export function useLocalStorageCache(prefix = "cache") {
  const getKey = useCallback((key: string) => `${prefix}:${key}`, [prefix]);

  const get = useCallback(
    <T>(key: string, lifetimeSeconds: number): T | null => {
      if (typeof window === "undefined") return null;

      try {
        const item = localStorage.getItem(getKey(key));
        if (!item) return null;

        const entry: CacheEntry<T> = JSON.parse(item);
        const age = (Date.now() - entry.timestamp) / 1000;

        if (age > lifetimeSeconds) {
          localStorage.removeItem(getKey(key));
          return null;
        }

        return entry.data;
      } catch {
        return null;
      }
    },
    [getKey],
  );

  const set = useCallback(
    <T>(key: string, data: T): void => {
      if (typeof window === "undefined") return;

      try {
        const entry: CacheEntry<T> = { data, timestamp: Date.now() };
        localStorage.setItem(getKey(key), JSON.stringify(entry));
      } catch {}
    },
    [getKey],
  );

  const delete_ = useCallback(
    (key: string): void => {
      if (typeof window === "undefined") return;
      try {
        localStorage.removeItem(getKey(key));
      } catch {}
    },
    [getKey],
  );

  const clear = useCallback((): void => {
    if (typeof window === "undefined") return;

    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith(`${prefix}:`)) {
          localStorage.removeItem(key);
        }
      }
    } catch {}
  }, [prefix]);

  return { get, set, delete: delete_, clear };
}
