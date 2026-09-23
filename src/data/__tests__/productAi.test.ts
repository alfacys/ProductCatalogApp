import { buildListUrl, fetchProducts } from '../productApi';

describe('buildListUrl', () => {
  it('uses the list endpoint with skip when there is no query', () => {
    expect(buildListUrl(40, '')).toBe('https://dummyjson.com/products?limit=20&skip=40');
  });

  it('uses the search endpoint and encodes the trimmed query', () => {
    expect(buildListUrl(0, ' red phone ')).toBe(
      'https://dummyjson.com/products/search?q=red%20phone&limit=20&skip=0'
    );
  });
});

describe('fetchProducts', () => {
  it('throws a readable error on a non-ok response', async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    await expect(fetchProducts(0, '')).rejects.toThrow('500');
  });
});
