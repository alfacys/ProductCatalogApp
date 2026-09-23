import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchProducts } from '../data/productsApi';
import { Product } from '../data/types';

export type ListStatus = 'loading' | 'error' | 'empty' | 'success';

function friendlyMessage(e: unknown): string {
  if (e instanceof TypeError) return "Can't reach the server. Check your connection and try again.";
  if (e instanceof Error) return e.message;
  return 'Something went wrong. Please try again.';
}

export function useProducts(query: string, category: string | null) {
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<ListStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreFailed, setLoadMoreFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Every request gets an id; responses from older requests are ignored.
  // This prevents a slow "ph" search from overwriting a newer "phone" search.
  const requestId = useRef(0);

  const loadFirstPage = useCallback(
    async (mode: 'initial' | 'refresh') => {
      const id = ++requestId.current;
      setLoadingMore(false);
      setLoadMoreFailed(false);
      if (mode === 'initial') setStatus('loading');
      else setRefreshing(true);
      try {
        const data = await fetchProducts(0, query, category);
        if (id !== requestId.current) return;
        setItems(data.products);
        setTotal(data.total);
        setError(null);
        setStatus(data.products.length === 0 ? 'empty' : 'success');
      } catch (e) {
        if (id !== requestId.current) return;
        if (mode === 'initial') {
          setError(friendlyMessage(e));
          setStatus('error');
        }
      } finally {
        if (id === requestId.current) setRefreshing(false);
      }
    },
    [query, category]
  );

  useEffect(() => {
    loadFirstPage('initial');
  }, [loadFirstPage]);

  const hasMore = items.length < total;

  const loadMore = useCallback(
    async (force = false) => {
      if (status !== 'success' || loadingMore || refreshing || !hasMore) return;
      if (loadMoreFailed && !force) return; // don't auto-retry in a loop
      const id = requestId.current;
      setLoadingMore(true);
      setLoadMoreFailed(false);
      try {
        const data = await fetchProducts(items.length, query, category);
        if (id !== requestId.current) return;
        setItems((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          return [...prev, ...data.products.filter((p) => !seen.has(p.id))];
        });
        setTotal(data.total);
      } catch {
        if (id === requestId.current) setLoadMoreFailed(true);
      } finally {
        if (id === requestId.current) setLoadingMore(false);
      }
    },
    [status, loadingMore, refreshing, hasMore, loadMoreFailed, items.length, query, category]
  );

  return {
    items,
    total,
    status,
    error,
    loadingMore,
    loadMoreFailed,
    refreshing,
    hasMore,
    reload: () => loadFirstPage('initial'),
    refresh: () => loadFirstPage('refresh'),
    loadMore,
  };
}