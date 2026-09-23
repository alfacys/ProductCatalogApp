import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProductListScreen } from './src/ui/screens/ProductListScreen';
import { colors } from './src/theme/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.accent }} edges={['top']}>
        <StatusBar style="light" />
        <ProductListScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
