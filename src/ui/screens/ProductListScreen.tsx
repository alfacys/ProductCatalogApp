import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Product } from '../../data/types';
import { slugToLabel } from '../../data/categoryGroups';
import { useDebounce } from '../../hooks/useDebounce';
import { useProducts } from '../../hooks/useProduct';
import { colors, MAX_WIDTH, spacing } from '../../theme/theme';
import { CategoryMenu } from '../components/CategoryMenu';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { EmptyView, ErrorView, LoadingGrid } from '../components/StateViews';

const PADDING = spacing.lg;
const GAP = spacing.md;

function getColumns(width: number) {
  if (width < 600) return 2;
  if (width < 900) return 3;
  if (width < 1200) return 4;
  return 5;
}

export function ProductListScreen() {
  const { width } = useWindowDimensions();
  const [text, setText] = useState('');
  const query = useDebounce(text, 400); // only hit the API 400ms after the user stops typing
  const [selected, setSelected] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const list = useProducts(query, category);

  const columns = getColumns(width);
  const contentWidth = Math.min(width, MAX_WIDTH);
  const cardWidth = Math.floor((contentWidth - PADDING * 2 - GAP * (columns - 1)) / columns);

  let body: React.ReactNode;
  if (list.status === 'loading') {
    body = <LoadingGrid columns={columns} cardWidth={cardWidth} gap={GAP} />;
  } else if (list.status === 'error') {
    body = <ErrorView message={list.error ?? ''} onRetry={list.reload} />;
  } else if (list.status === 'empty') {
    body = <EmptyView query={query} onClear={() => setText('')} />;
  } else {
    body = (
      <FlatList
        key={columns} // FlatList needs a new key when numColumns changes
        data={list.items}
        keyExtractor={(p) => String(p.id)}
        numColumns={columns}
        columnWrapperStyle={{ gap: GAP, marginBottom: spacing.xl }}
        contentContainerStyle={{ paddingHorizontal: PADDING, paddingTop: spacing.lg, paddingBottom: spacing.xl }}
        renderItem={({ item }) => <ProductCard product={item} width={cardWidth} onPress={setSelected} />}
        onEndReached={() => list.loadMore()}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={list.refreshing} onRefresh={list.refresh} />}
        ListHeaderComponent={
          query.trim() ? <Text style={styles.count}>{list.total} results for "{query.trim()}"</Text> : null
        }
        ListFooterComponent={
          <Footer
            loadingMore={list.loadingMore}
            failed={list.loadMoreFailed}
            hasMore={list.hasMore}
            onRetry={() => list.loadMore(true)}
          />
        }
      />
    );
  }

  return (
    <View style={styles.root}>
      <Header
        value={text}
        onChange={setText}
        onOpenCategories={() => setMenuOpen(true)}
        categoryLabel={category ? slugToLabel(category) : null}
      />
      <CategoryMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={setCategory}
        selected={category}
      />
      <View style={styles.body}>{body}</View>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

function Footer({
  loadingMore,
  failed,
  hasMore,
  onRetry,
}: {
  loadingMore: boolean;
  failed: boolean;
  hasMore: boolean;
  onRetry: () => void;
}) {
  if (loadingMore) return <ActivityIndicator style={styles.footer} color={colors.muted} />;
  if (failed) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Couldn't load more products.</Text>
        <Pressable onPress={onRetry} accessibilityRole="button">
          <Text style={styles.retry}>Retry</Text>
        </Pressable>
      </View>
    );
  }
  if (!hasMore) return <Text style={[styles.footer, styles.footerText]}>You've reached the end</Text>;
  return null;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' },
  count: { fontSize: 13, color: colors.muted, marginBottom: spacing.lg },
  footer: { paddingVertical: spacing.xl, alignItems: 'center' },
  footerText: { fontSize: 13, color: colors.muted, textAlign: 'center' },
  retry: { marginTop: spacing.sm, fontSize: 14, fontWeight: '700', color: colors.text, textDecorationLine: 'underline' },
});