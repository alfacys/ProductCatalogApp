import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CATEGORY_GROUPS, slugToLabel } from '../../data/categoryGroups';
import { colors, radius, spacing } from '../../theme/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (slug: string | null) => void;
  selected: string | null;
};

export function CategoryMenu({ visible, onClose, onSelect, selected }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>Categories</Text>
            <Pressable onPress={onClose} accessibilityLabel="Close" accessibilityRole="button">
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>
          <ScrollView>
            <Pressable
              style={styles.mainRow}
              onPress={() => {
                onSelect(null);
                onClose();
              }}
            >
              <Text style={[styles.mainLabel, !selected && styles.activeLabel]}>All products</Text>
            </Pressable>

            {CATEGORY_GROUPS.map((group) => (
              <View key={group.label}>
                <Pressable
                  style={styles.mainRow}
                  onPress={() => setExpanded(expanded === group.label ? null : group.label)}
                  accessibilityRole="button"
                >
                  <Text style={styles.mainLabel}>{group.label}</Text>
                  <Text style={styles.chevron}>{expanded === group.label ? '−' : '+'}</Text>
                </Pressable>

                {expanded === group.label && (
                  <View style={styles.subWrap}>
                    {group.slugs.map((slug) => (
                      <Pressable
                        key={slug}
                        style={styles.subRow}
                        onPress={() => {
                          onSelect(slug);
                          onClose();
                        }}
                      >
                        <Text style={[styles.subLabel, selected === slug && styles.activeLabel]}>
                          {slugToLabel(slug)}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  panel: {
    backgroundColor: colors.bg,
    maxHeight: '75%',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 17, fontWeight: '800', color: colors.text },
  close: { fontSize: 16, color: colors.muted },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mainLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  chevron: { fontSize: 18, color: colors.muted },
  subWrap: { backgroundColor: colors.surface },
  subRow: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
  subLabel: { fontSize: 14, color: colors.text },
  activeLabel: { fontWeight: '800' },
});