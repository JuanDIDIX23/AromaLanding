import { useCallback, useEffect, useState } from 'react';

export interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook genérico de lectura asíncrona con estado de carga/error y refetch.
 * `fetcher` debe ser estable (envuélvelo en useCallback si depende de props).
 */
export function useQuery<T>(fetcher: () => Promise<T>): QueryState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(() => {
    let active = true;
    setLoading(true);
    fetcher()
      .then((d) => {
        if (!active) return;
        setData(d);
        setError(null);
      })
      .catch((e) => {
        if (!active) return;
        setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetcher]);

  useEffect(() => run(), [run]);

  return { data, loading, error, refetch: run };
}
