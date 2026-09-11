import { NavigationContainer, DefaultTheme } from "expo-router/react-navigation";
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { ArtisanNavigator } from '@/navigation/ArtisanNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { BuyerNavigator } from '@/navigation/BuyerNavigator';
import { colors, typography } from '@/theme';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.primary,
    primary: colors.accent,
    text: colors.textPrimary,
    border: colors.primary,
    notification: colors.secondary,
  },
};

function BootScreen({ label }) {
  return (
    <View style={styles.boot}>
      <View style={styles.mark} />
      <ActivityIndicator color={colors.accent} />
      <Text style={styles.bootLabel}>{label}</Text>
    </View>
  );
}

export default function RootNavigator() {
  const { initializing, user, profile, role } = useAuth();

  if (initializing) {
    return <BootScreen label="Opening the hall" />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      {!user || !profile ? (
        <AuthNavigator />
      ) : role === 'artisan' ? (
        <ArtisanNavigator />
      ) : (
        <BuyerNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  mark: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accent,
  },
  bootLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
});
