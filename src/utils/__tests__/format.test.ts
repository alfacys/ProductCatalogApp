import { originalPrice, stars } from '../format';

describe('originalPrice', () => {
  it('reverses a discount', () => {
    expect(originalPrice(80, 20)).toBeCloseTo(100);
  });
  it('returns the price when there is no discount', () => {
    expect(originalPrice(50, 0)).toBe(50);
  });
});

describe('stars', () => {
  it('rounds and clamps', () => {
    expect(stars(4.4)).toBe('★★★★☆');
    expect(stars(9)).toBe('★★★★★');
  });
});
