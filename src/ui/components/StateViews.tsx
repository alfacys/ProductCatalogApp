import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

/** Loading: grey skeleton cards that match the real grid. */
export function LoadingGrid({ columns, cardWidth, gap }: { columns: number; cardWidth: number; gap: number }) {
  return (
    <View style={[styles.grid, { gap, paddingHorizontal: spacing.lg }]}>
      {Array.from({ length: columns * 2 }).map((_, i) => (
        <View key={i} style={{ width: cardWidth }}>
          <View style={styles.skelImage} />
          <View style={[styles.skelLine, { width: '80%' }]} />
          <View style={[styles.skelLine, { width: '40%' }]} />
        </View>
      ))}
    </View>
  );
}

/** Error: red icon + message + Retry. */
export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <View style={[styles.iconCircle, { backgroundColor: colors.errorBg }]}>
        <Text style={[styles.icon, { color: colors.error }]}>!</Text>
      </View>
      <Text style={styles.heading}>Couldn't load products</Text>
      <Text style={styles.body}>{message}</Text>
      <Pressable onPress={onRetry} style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

/** Empty: neutral icon + tip on what to do next. */
export function EmptyView({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <View style={styles.center}>
      <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
        <Text style={[styles.icon, { color: colors.muted }]}>?</Text>
      </View>
      <Text style={styles.heading}>No results for "{query}"</Text>
      <Text style={styles.body}>Check the spelling or try a shorter keyword.</Text>
      <Pressable onPress={onClear} style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>Clear search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingTop: spacing.lg },
  skelImage: { width: '100%', aspectRatio: 0.9, backgroundColor: colors.surface, borderRadius: radius.md },
  skelLine: { height: 10, backgroundColor: colors.surface, borderRadius: 5, marginTop: 10 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl * 1.5 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 28, fontWeight: '700' },
  heading: { marginTop: spacing.lg, fontSize: 17, fontWeight: '700', color: colors.text, textAlign: 'center' },
  body: { marginTop: 6, fontSize: 14, color: colors.muted, textAlign: 'center', maxWidth: 320 },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: radius.pill,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
