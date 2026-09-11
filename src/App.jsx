import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import RootNavigator from '@/navigation/RootNavigator';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

function AppShell() {
  const { initializing } = useAuth();

  useEffect(() => {
    if (!initializing) {
      SplashScreen.hideAsync();
    }
  }, [initializing]);

  return <RootNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
