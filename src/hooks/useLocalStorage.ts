/**
 * useLocalStorage Hook
 * 本地存储状态管理
 */

import { useState, useCallback, useEffect } from 'react';
import Storage from '@/utils/storage';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = Storage.getLocal<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        Storage.setLocal(key, valueToStore);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
