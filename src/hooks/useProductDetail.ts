import { useEffect, useState } from 'react';
import { fetchProduct } from '../data/productsApi';
import { Product } from '../data/types';

/**
 * Shows blist data immediately, then swaps in the full detail response.
 * If the request fails the panel still works, with a retry notice.
 */
export function useProductDetail(initial: Product) {
  const [product, setProduct] = useState(initial);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchProduct(initial.id)
      .then((p) => {
        if (cancelled) return;
        setProduct(p);
        setStatus('success');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [initial.id, attempt]);

  return { product, status, retry: () => setAttempt((a) => a + 1) };
}
