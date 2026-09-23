import { Product, ProductsResponse } from './types';

const BASE_URL = 'https://dummyjson.com';
export const PAGE_SIZE = 20;

// Builds the list URL. With a query we use the server-side search endpoint//
export function buildListUrl(skip: number, query: string): string {
  const q = query.trim();
  const paging = `limit=${PAGE_SIZE}&skip=${skip}`;
  return q
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(q)}&${paging}`
    : `${BASE_URL}/products?${paging}`;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Server error (${res.status}). Please try again.`);
  }
  return res.json() as Promise<T>;
}

export function fetchProducts(skip: number, query: string) {
  return getJson<ProductsResponse>(buildListUrl(skip, query));
}

export function fetchProduct(id: number) {
  return getJson<Product>(`${BASE_URL}/products/${id}`);
}
