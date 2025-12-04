import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useLocalStorage
 * Safe localStorage wrapper that:
 * - Handles JSON parse errors and quota issues
 * - Syncs across tabs via storage event
 * - Falls back to in-memory state if persistence fails
 */
// PUBLIC_INTERFACE
export function useLocalStorage(key, initialValue) {
  const inMemoryRef = useRef(initialValue);
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });
  const [error, setError] = useState(null);

  const save = useCallback((val) => {
    setValue(val);
    inMemoryRef.current = val;
    try {
      const json = JSON.stringify(val);
      window.localStorage.setItem(key, json);
      setError(null);
    } catch (e) {
      // Fallback to in-memory without crashing
      setError(e);
    }
  }, [key]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setValue(next);
          inMemoryRef.current = next;
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, initialValue]);

  return { value, setValue: save, error };
}
