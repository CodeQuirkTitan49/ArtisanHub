import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { HubScreen } from '@/components/HubScreen';
import { buttonStyle, colors, spacing, typography } from '@/theme';

export function ProfileScreen() {
  const { profile, logout } = useAuth();
  const action = buttonStyle({ variant: 'ghost' });

  return (
    <HubScreen
      eyebrow="Your atelier"
      bold="Profile"
      light={profile?.name ?? ''}
      body="Account details live with your role. Sign out to switch identities.">
      <Text style={styles.label}>Signed in as</Text>
      <Text style={styles.name}>{profile?.name}</Text>
      <Text style={styles.meta}>{profile?.email}</Text>
      <Text style={styles.role}>{profile?.role === 'artisan' ? 'Artisan' : 'Buyer'}</Text>

      <Pressable onPress={logout} style={[action.container, styles.logout]}>
        <Ionicons name="log-out-outline" size={16} color={action.textColor} />
        <Text style={action.label}>Sign out</Text>
      </Pressable>
    </HubScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.subheader,
    color: colors.primary,
  },
  meta: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  role: {
    ...typography.label,
    color: colors.secondary,
    marginTop: spacing.md,
  },
  logout: {
    marginTop: spacing.xl,
    alignSelf: 'flex-start',
  },
});
