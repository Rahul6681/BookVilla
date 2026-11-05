import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * High-performance data fetching hook.
 * Features:
 * - Instant rendering with initial/cached data (Zero waiting time)
 * - Zero artificial delays (Simulated latency eliminated)
 * - Stale-while-revalidate pattern for seamless background updates
 * - sourceRef prevents unnecessary re-fetches when passing inline arrow functions
 * - AbortController for race-condition prevention
 */
export function useFetch(source, dependencies = [], initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialData === null);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // Keep latest reference to source without triggering re-fetch on every parent re-render
  const sourceRef = useRef(source);
  sourceRef.current = source;

  const executeFetch = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (data === null) {
      setLoading(true);
    }
    setError(null);

    try {
      const currentSource = sourceRef.current;
      if (typeof currentSource === 'function') {
        const result = await currentSource();
        setData(result);
      } else if (typeof currentSource === 'string') {
        const response = await fetch(currentSource, {
          signal: abortControllerRef.current.signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.data || json);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    executeFetch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
}
