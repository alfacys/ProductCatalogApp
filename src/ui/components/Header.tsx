import React from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, MAX_WIDTH, radius, spacing } from '../../theme/theme';

type Props = { value: string; onChange: (v: string) => void };

export function Header({ value, onChange }: Props) {
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
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    height: 42,
  },
  input: { flex: 1, fontSize: 15, color: colors.text },
  clear: { fontSize: 14, color: colors.muted, paddingLeft: spacing.sm },
});
