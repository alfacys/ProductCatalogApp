export interface CategoryGroup {
  label: string;
  slugs: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { label: 'Beauty', slugs: ['beauty', 'fragrances', 'skin-care'] },
  { label: 'Electronics', slugs: ['smartphones', 'laptops', 'tablets', 'mobile-accessories'] },
  {
    label: 'Fashion',
    slugs: [
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'womens-dresses',
      'womens-shoes',
      'womens-watches',
      'womens-bags',
      'womens-jewellery',
      'tops',
      'sunglasses',
    ],
  },
  { label: 'Home', slugs: ['furniture', 'home-decoration', 'groceries', 'kitchen-accessories'] },
  { label: 'Other', slugs: ['automotive', 'motorcycle', 'lighting'] },
];

/** Turns a slug like "mens-shirts" into "Mens Shirts" for display. */
export function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}