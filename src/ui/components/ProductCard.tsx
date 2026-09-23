import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../data/types';
import { formatPrice } from '../../utils/format';
import { colors, radius, spacing } from '../../theme/theme';
import { SafeImage } from './SafeImage';

type Props = { product: Product; width: number; onPress: (p: Product) => void };

export const ProductCard = React.memo(function ProductCard({ product, width, onPress }: Props) {
  const showDiscount = product.discountPercentage >= 10;
  return (
    <Pressable
      onPress={() => onPress(product)}
      style={({ pressed }) => [{ width }, pressed && { opacity: 0.85 }]}
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, ${formatPrice(product.price)}`}
    >
      <View>
        <SafeImage uri={product.thumbnail} style={styles.image} />
        {showDiscount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <View style={styles.row}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 0.9, borderRadius: radius.md },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.sale,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  title: { marginTop: spacing.sm, fontSize: 13, color: colors.text, lineHeight: 18 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  price: { fontSize: 15, fontWeight: '700', color: colors.text },
  rating: { fontSize: 12, color: colors.muted },
});
