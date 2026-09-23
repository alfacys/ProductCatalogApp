export const formatPrice = (n: number) => `$${n.toFixed(2)}`;

/** DummyJSON gives the discounted price; work backwards to the original. */
export function originalPrice(price: number, discountPercentage: number): number {
  if (discountPercentage <= 0 || discountPercentage >= 100) return price;
  return price / (1 - discountPercentage / 100);
}

export function stars(rating: number): string {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}
