import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Product } from '../../data/types';
import { useProductDetail } from '../../hooks/useProductDetail';
import { formatPrice, originalPrice, stars } from '../../utils/format';
import { colors, radius, spacing } from '../../theme/theme';
import { SafeImage } from './SafeImage';

type Props = { product: Product | null; onClose: () => void };

export function ProductModal({ product, onClose }: Props) {
  return (
    <Modal visible={!!product} transparent animationType="fade" onRequestClose={onClose}>
      {product && <Panel key={product.id} initial={product} onClose={onClose} />}
    </Modal>
  );
}

function Panel({ initial, onClose }: { initial: Product; onClose: () => void }) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 720; // wide: centered pop-up (image | details). narrow: bottom sheet.
  const { product, status, retry } = useProductDetail(initial);
  const [selected, setSelected] = useState(0);

  const images = product.images.length ? product.images : [product.thumbnail];
  const main = images[Math.min(selected, images.length - 1)];

  const info = (
    <Info product={product} images={images} selected={selected} onSelect={setSelected} status={status} onRetry={retry} />
  );

  return (
    <View style={[styles.overlay, { justifyContent: isWide ? 'center' : 'flex-end' }]}>
      {/* tapping the dark area closes the panel */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />

      <View
        style={[
          styles.box,
          isWide
            ? { width: Math.min(960, width - 48), height: Math.min(600, height - 48), flexDirection: 'row', borderRadius: radius.lg }
            : { width: '100%', maxHeight: height * 0.92, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
        ]}
      >
        <Pressable onPress={onClose} style={styles.close} accessibilityLabel="Close" accessibilityRole="button">
          <Text style={styles.closeText}>✕</Text>
        </Pressable>

        {isWide ? (
          <>
            <View style={styles.imagePane}>
              <SafeImage uri={main} style={StyleSheet.absoluteFill} />
            </View>
            <ScrollView style={styles.infoPane} contentContainerStyle={styles.infoContent}>
              {info}
            </ScrollView>
          </>
        ) : (
          <ScrollView>
            <View style={{ height: 280 }}>
              <SafeImage uri={main} style={StyleSheet.absoluteFill} />
            </View>
            <View style={styles.infoContent}>{info}</View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

type InfoProps = {
  product: Product;
  images: string[];
  selected: number;
  onSelect: (i: number) => void;
  status: 'loading' | 'success' | 'error';
  onRetry: () => void;
};

function Info({ product, images, selected, onSelect, status, onRetry }: InfoProps) {
  const hasDiscount = product.discountPercentage > 0;
  return (
    <View>
      <Text style={styles.category}>{product.category.replace(/-/g, ' ')}</Text>
      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.row}>
        <Text style={styles.stars}>{stars(product.rating)}</Text>
        <Text style={styles.ratingText}>{product.rating.toFixed(1)} / 5</Text>
      </View>

      <View style={[styles.row, { marginTop: spacing.md }]}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        {hasDiscount && (
          <>
            <Text style={styles.original}>{formatPrice(originalPrice(product.price, product.discountPercentage))}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>-{Math.round(product.discountPercentage)}%</Text>
            </View>
          </>
        )}
      </View>

      {status === 'error' && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Couldn't refresh details.</Text>
          <Pressable onPress={onRetry} accessibilityRole="button">
            <Text style={styles.noticeLink}>Retry</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.section}>Description</Text>
      <Text style={styles.body}>{product.description}</Text>

      <Text style={styles.section}>Gallery</Text>
      <View style={styles.thumbs}>
        {images.map((uri, i) => (
          <Pressable
            key={uri + i}
            onPress={() => onSelect(i)}
            style={[styles.thumb, i === selected && styles.thumbActive]}
            accessibilityLabel={`Show image ${i + 1}`}
          >
            <SafeImage uri={uri} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          </Pressable>
        ))}
      </View>

      <View style={styles.meta}>
        {product.brand ? <MetaRow label="Brand" value={product.brand} /> : null}
        <MetaRow label="Availability" value={product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'} />
      </View>
    </View>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center' },
  box: { backgroundColor: colors.bg, overflow: 'hidden' },
  close: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 14, color: colors.text },
  imagePane: { flex: 1, backgroundColor: colors.surface },
  infoPane: { flex: 1 },
  infoContent: { padding: spacing.xl },
  category: { fontSize: 13, color: colors.muted, textTransform: 'capitalize' },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 4, letterSpacing: -0.3, paddingRight: 36 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  stars: { fontSize: 16, color: colors.star, letterSpacing: 1 },
  ratingText: { fontSize: 13, color: colors.muted },
  price: { fontSize: 26, fontWeight: '800', color: colors.text },
  original: { fontSize: 15, color: colors.muted, textDecorationLine: 'line-through' },
  badge: { backgroundColor: colors.sale, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    backgroundColor: colors.errorBg,
    padding: spacing.md,
    borderRadius: radius.sm,
  },
  noticeText: { color: colors.error, fontSize: 13 },
  noticeLink: { color: colors.error, fontWeight: '700', fontSize: 13, textDecorationLine: 'underline' },
  section: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: spacing.xl, marginBottom: spacing.sm },
  body: { fontSize: 14, color: colors.text, lineHeight: 21 },
  thumbs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbActive: { borderColor: colors.accent },
  meta: { marginTop: spacing.xl, borderTopWidth: 1, borderTopColor: colors.border },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metaLabel: { fontSize: 13, color: colors.muted },
  metaValue: { fontSize: 13, color: colors.text, fontWeight: '600' },
});
