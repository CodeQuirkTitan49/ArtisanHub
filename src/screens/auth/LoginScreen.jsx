import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import {
  buttonStyle,
  colors,
  headerStyle,
  radius,
  spacing,
  typography,
} from '@/theme';

function mapAuthError(error) {
  const code = error?.code ?? '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'Email or password is incorrect.';
  }
  if (code.includes('invalid-email')) {
    return 'Enter a valid email address.';
  }
  if (code.includes('too-many-requests')) {
    return 'Too many attempts. Wait a moment and try again.';
  }
  return error?.message ?? 'Could not sign in.';
}

export function LoginScreen({ navigation }) {
  const { login, isConfigured } = useAuth();
  const header = headerStyle({ size: 'large' });
  const action = buttonStyle({ variant: 'primary' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setError('');
    if (!email.trim() || !password) {
      setError('Email and password are required.');
      return;
    }

    setBusy(true);
    try {
      await login({ email, password });
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.decor}>
            <View style={styles.arc} />
            <View style={styles.triangle} />
            <View style={styles.dot} />
          </View>

          <Text style={header.eyebrow}>ArtisanHub</Text>
          <View style={header.row}>
            <Text style={header.bold}>Enter </Text>
            <Text style={header.light}>the hall</Text>
          </View>
          <Text style={styles.lede}>Sign in to your stall or your collection.</Text>

          {!isConfigured ? (
            <Text style={styles.warning}>
              Firebase keys are missing. Copy `.env.example` to `.env` and restart Expo.
            </Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="you@studio.com"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            placeholder="••••••••"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            disabled={busy}
            onPress={onSubmit}
            style={[action.container, styles.submit, busy && styles.disabled]}>
            <Text style={action.label}>{busy ? 'Signing in' : 'Sign in'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.switch}>
            <Text style={styles.switchText}>
              New here? <Text style={styles.switchStrong}>Create an account</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  decor: {
    height: 72,
    marginBottom: spacing.lg,
  },
  arc: {
    position: 'absolute',
    left: 0,
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    opacity: 0.35,
  },
  triangle: {
    position: 'absolute',
    right: 24,
    top: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accent,
  },
  dot: {
    position: 'absolute',
    right: 0,
    bottom: 8,
    width: 8,
    height: 8,
    backgroundColor: colors.secondary,
  },
  lede: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(27, 42, 74, 0.18)',
    borderRadius: radius.sharp,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    minHeight: 48,
  },
  error: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.md,
  },
  warning: {
    ...typography.bodySmall,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  submit: {
    marginTop: spacing.xl,
  },
  disabled: {
    opacity: 0.6,
  },
  switch: {
    marginTop: spacing.xl,
    alignSelf: 'flex-start',
  },
  switchText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  switchStrong: {
    color: colors.primary,
    fontWeight: '700',
  },
});
