import { StyleSheet, Text } from 'react-native';

import { HubScreen } from '@/components/HubScreen';
import { colors, typography } from '@/theme';

export function BuyerHomeScreen() {
  return (
    <HubScreen
      eyebrow="ArtisanHub"
      bold="Discover"
      light="Handmade Treasures"
      body="Offset aisles of craft. Geometric marks hold the empty side of the hall.">
      <Text style={styles.copy}>Featured makers will appear on this board.</Text>
    </HubScreen>
  );
}

export function BuyerExploreScreen() {
  return (
    <HubScreen
      eyebrow="Catalog"
      bold="Explore"
      light="The Hall"
      body="Filter by clay, textile, wood, and metal — labels stay tiny and uppercase.">
      <Text style={styles.copy}>Search the collection. Results will fill this card.</Text>
    </HubScreen>
  );
}

export function BuyerCartScreen() {
  return (
    <HubScreen
      eyebrow="Atelier bag"
      bold="Your"
      light="Cart"
      body="Pieces you intend to take home. Sharp corners, no rounded checkout pills.">
      <Text style={styles.copy}>Your cart is empty.</Text>
    </HubScreen>
  );
}

const styles = StyleSheet.create({
  copy: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
