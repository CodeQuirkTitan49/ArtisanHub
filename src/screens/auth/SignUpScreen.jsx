import { useMemo, useState } from 'react';
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

const ROLES = {
  artisan: {
    id: 'artisan',
    title: 'Artisan',
    eyebrow: 'For Artisans',
    hint: 'Set up your store and reach customers directly',
    buttonVariant: 'primary',
  },
  buyer: {
    id: 'buyer',
    title: 'Buyer',
    eyebrow: 'For Buyers',
    hint: 'Discover authentic handmade treasures',
    buttonVariant: 'accent',
  },
};

function mapAuthError(error) {
  const code = error?.code ?? '';
  if (code.includes('email-already-in-use')) {
    return 'That email already has an account.';
  }
  if (code.includes('weak-password')) {
    return 'Password must be at least 6 characters.';
  }
  if (code.includes('invalid-email')) {
    return 'Enter a valid email address.';
  }
  return error?.message ?? 'Could not create your account.';
}

export function SignUpScreen({ navigation }) {
  const { signUp, isConfigured } = useAuth();
  const header = headerStyle({ size: 'default' });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('artisan');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const selected = ROLES[role];
  const action = useMemo(
    () => buttonStyle({ variant: selected.buttonVariant }),
    [selected.buttonVariant],
  );

  const onSubmit = async () => {
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Name, email, and password are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setBusy(true);
    try {
      await signUp({ name, email, password, role });
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
          <View style={styles.topRule} />
          <Text style={header.eyebrow}>Join the hall</Text>
          <View style={header.row}>
            <Text style={header.bold}>Create </Text>
            <Text style={header.light}>your place</Text>
          </View>

          {!isConfigured ? (
            <Text style={styles.warning}>
              Firebase keys are missing. Copy `.env.example` to `.env` and restart Expo.
            </Text>
          ) : null}

          <Text style={styles.label}>Name</Text>
          <TextInput
            autoComplete="name"
            placeholder="Your name"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

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
            autoComplete="new-password"
            placeholder="At least 6 characters"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Role</Text>
          <View style={styles.roleRow}>
            {Object.values(ROLES).map((option) => {
              const active = option.id === role;
              const activeColor = option.id === 'artisan' ? colors.primary : colors.accent;

              return (
                <Pressable
                  key={option.id}
                  onPress={() => setRole(option.id)}
                  style={[
                    styles.roleCard,
                    active && { borderColor: activeColor, backgroundColor: colors.surface },
                  ]}>
                  {active ? (
                    <View
                      style={[
                        styles.roleMark,
                        { borderBottomColor: activeColor },
                      ]}
                    />
                  ) : null}
                  <Text style={[styles.roleTitle, active && { color: activeColor }]}>
                    {option.title}
                  </Text>
                  <Text style={styles.roleEyebrow}>{option.eyebrow}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.roleHint}>{selected.hint}</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            disabled={busy}
            onPress={onSubmit}
            style={[action.container, styles.submit, busy && styles.disabled]}>
            <Text style={action.label}>{busy ? 'Creating' : 'Create account'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')} style={styles.switch}>
            <Text style={styles.switchText}>
              Already in the hall? <Text style={styles.switchStrong}>Sign in</Text>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  topRule: {
    width: 48,
    height: 4,
    backgroundColor: colors.accent,
    marginBottom: spacing.lg,
  },
  warning: {
    ...typography.bodySmall,
    color: colors.secondary,
    marginTop: spacing.md,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
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
  roleRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  roleCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(27, 42, 74, 0.16)',
    borderRadius: radius.sharp,
    backgroundColor: colors.background,
    padding: spacing.lg,
    minHeight: 108,
    overflow: 'hidden',
  },
  roleMark: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderLeftWidth: 14,
    borderRightWidth: 0,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  roleTitle: {
    ...typography.subheaderSmall,
    color: colors.textPrimary,
  },
  roleEyebrow: {
    ...typography.label,
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
  roleHint: {
    ...typography.bodySmall,
    marginTop: spacing.md,
    color: colors.textSecondary,
  },
  error: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.md,
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
