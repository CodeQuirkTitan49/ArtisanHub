import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/theme';

const ICONS = {
  Home: ['home-outline', 'home'],
  Explore: ['search-outline', 'search'],
  Cart: ['bag-outline', 'bag'],
  Orders: ['file-tray-full-outline', 'file-tray-full'],
  Profile: ['person-outline', 'person'],
};

export function AbstractTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      <View style={styles.accentEdge} />
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const icons = ICONS[label] ?? ICONS.Home;
          const color = focused ? colors.accent : 'rgba(247, 244, 239, 0.48)';

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={styles.item}>
              {focused ? <View style={styles.activeTriangle} /> : <View style={styles.triangleSpacer} />}
              <Ionicons name={focused ? icons[1] : icons[0]} size={20} color={color} />
              <Text style={[styles.label, { color }]}>{String(label).toUpperCase()}</Text>
              <View style={[styles.marker, focused && styles.markerActive]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    borderRadius: 0,
  },
  accentEdge: {
    height: 3,
    backgroundColor: colors.accent,
  },
  row: {
    flexDirection: 'row',
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  activeTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accent,
  },
  triangleSpacer: {
    height: 6,
  },
  label: {
    ...typography.label,
    fontSize: 10,
    color: 'rgba(247, 244, 239, 0.48)',
  },
  marker: {
    width: 16,
    height: 2,
    backgroundColor: 'transparent',
    borderRadius: radius.none,
  },
  markerActive: {
    backgroundColor: colors.accent,
  },
});
