import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cardCornerAccentStyle, cardStyle, colors, headerStyle, spacing, typography } from '@/theme';

export function HubScreen({ eyebrow, bold, light, body, children }) {
  const header = headerStyle({ size: 'default' });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.arc} />
      <View style={styles.dotsColumn}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotAccent]} />
        <View style={styles.dot} />
      </View>

      <View style={styles.content}>
        <Text style={header.eyebrow}>{eyebrow}</Text>
        <View style={header.row}>
          <Text style={header.bold}>{bold} </Text>
          <Text style={header.light}>{light}</Text>
        </View>
        {body ? <Text style={styles.body}>{body}</Text> : null}

        <View style={[cardStyle({ angledCorner: 'top-right' }), styles.card]}>
          <View style={cardCornerAccentStyle({ corner: 'top-right' })} />
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  card: {
    marginTop: spacing.lg,
  },
  arc: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    opacity: 0.18,
    transform: [{ rotate: '-25deg' }],
  },
  dotsColumn: {
    position: 'absolute',
    right: spacing.lg,
    top: 120,
    gap: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: colors.primary,
    opacity: 0.25,
  },
  dotAccent: {
    backgroundColor: colors.accent,
    opacity: 1,
  },
});
