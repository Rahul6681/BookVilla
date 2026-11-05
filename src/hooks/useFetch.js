import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for simulating or executing REST API data fetching.
 * Supports promises, simulated latency, AbortController, and refetching.
 *
 * @param {Function|string} source - An async function returning data or an API URL string
 * @param {Array} dependencies - Dependency array to trigger refetch
 * @param {number} simulatedLatency - Milliseconds to delay for realistic UX transitions
 */
export function useFetch(source, dependencies = [], simulatedLatency = 200) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const executeFetch = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      if (typeof source === 'function') {
        // Simulated latency to mirror realistic network response
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, simulatedLatency);
          abortControllerRef.current.signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });

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
        setData(json);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [source, simulatedLatency, ...dependencies]);

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
