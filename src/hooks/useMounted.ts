/**
 * useMounted Hook
 * 组件是否已挂载
 */

import { useState, useEffect } from 'react';

const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted;
};

export default useMounted;
