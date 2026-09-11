import { StyleSheet, Text } from 'react-native';

import { HubScreen } from '@/components/HubScreen';
import { colors, typography } from '@/theme';

export function ArtisanHomeScreen() {
  return (
    <HubScreen
      eyebrow="Studio"
      bold="Your"
      light="Work"
      body="List pieces, follow commissions, and keep the stall open.">
      <Text style={styles.copy}>No listings yet. New work will land here.</Text>
    </HubScreen>
  );
}

export function ArtisanExploreScreen() {
  return (
    <HubScreen
      eyebrow="Market pulse"
      bold="Search"
      light="Makers"
      body="See what buyers are browsing and how your craft sits in the hall.">
      <Text style={styles.copy}>Search by material, region, or technique.</Text>
    </HubScreen>
  );
}

export function ArtisanOrdersScreen() {
  return (
    <HubScreen
      eyebrow="Fulfillment"
      bold="Open"
      light="Orders"
      body="Commissions and paid pieces wait in a sharp queue — never a pill badge.">
      <Text style={styles.copy}>Incoming orders will appear in this tray.</Text>
    </HubScreen>
  );
}

const styles = StyleSheet.create({
  copy: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
