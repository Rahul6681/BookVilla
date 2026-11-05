import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * High-performance data fetching hook.
 * Features:
 * - Instant rendering with initial/cached data (Zero waiting time)
 * - Zero artificial delays (Simulated latency eliminated)
 * - Stale-while-revalidate pattern for seamless background updates
 * - AbortController for race-condition prevention
 */
export function useFetch(source, dependencies = [], initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialData === null);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const executeFetch = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // If we don't have initial data, set loading to true
    if (data === null) {
      setLoading(true);
    }
    setError(null);

    try {
      if (typeof source === 'function') {
        const result = await source();
        setData(result);
      } else if (typeof source === 'string') {
        const response = await fetch(source, {
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
  }, [source, ...dependencies]);

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
