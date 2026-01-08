/**
 * useDebounce Hook
 * 防抖值
 */

import { useState, useEffect } from 'react';
import { debounce } from '@/utils';

const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      // 清理
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
