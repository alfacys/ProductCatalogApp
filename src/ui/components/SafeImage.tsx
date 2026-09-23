import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/theme';

type Props = { uri: string; style?: StyleProp<ViewStyle>; resizeMode?: 'contain' | 'cover' };

// Image with a loading placeholder and a fallback when it fails to load. //
export function SafeImage({ uri, style, resizeMode = 'contain' }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => setState('loading'), [uri]);

  return (
    <View style={[styles.box, style]}>
      {state !== 'error' && (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode={resizeMode}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
      {state === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.muted} />
        </View>
      )}
      {state === 'error' && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Image unavailable</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: colors.surface, overflow: 'hidden' },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 11, color: colors.muted },
});
