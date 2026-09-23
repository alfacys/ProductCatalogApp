import React from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, MAX_WIDTH, radius, spacing } from '../../theme/theme';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onOpenCategories: () => void;
  categoryLabel: string | null;
};

export function Header({ value, onChange, onOpenCategories, categoryLabel }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.promo}>
        <Text style={styles.promoText}>Free delivery on orders over $50</Text>
      </View>
      <View style={styles.bar}>
        <Text style={styles.logo}>Welcome to Shopping</Text>
        <View style={styles.search}>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Search products"
            placeholderTextColor={colors.muted}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)]}
          />
          {value.length > 0 && (
            <Pressable onPress={() => onChange('')} hitSlop={10} accessibilityLabel="Clear search">
              <Text style={styles.clear}>✕</Text>
            </Pressable>
          )}
        </View>
        <Pressable onPress={onOpenCategories} style={styles.categoryButton} accessibilityRole="button">
          <Text style={styles.categoryText}>{categoryLabel ?? 'Categories'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.bg, borderBottomWidth: 1, borderBottomColor: colors.border },
  promo: { backgroundColor: colors.accent, paddingVertical: 6, alignItems: 'center' },
  promoText: { color: '#fff', fontSize: 12 },
  bar: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  logo: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5, color: colors.text },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,                  // Added border width
    borderColor: colors.border,       // Added border color
    borderRadius: radius.pill || 9999, // Pill rounded ends
    paddingHorizontal: spacing.lg,
    height: 42,
  },
  input: { flex: 1, fontSize: 15, color: colors.text },
  clear: { fontSize: 14, color: colors.muted, paddingLeft: spacing.sm },
  categoryButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    height: 42,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: { fontSize: 14, fontWeight: '600', color: colors.text },
});