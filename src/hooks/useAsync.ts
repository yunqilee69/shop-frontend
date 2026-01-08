/**
 * useAsync Hook
 * 异步操作管理
 */

import { useState, useCallback } from 'react';

interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: () => Promise<void>;
}

const useAsync = <T>(asyncFunction: () => Promise<T>): UseAsyncReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return {
    data,
    loading,
    error,
    execute,
  };
};

export default useAsync;
