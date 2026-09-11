import { Platform } from 'react-native';

/**
 * ArtisanHub design system
 *
 * Visual language: gallery-like, geometric, asymmetric.
 * Sharp corners (never pills). Mixed-weight headlines. Tiny uppercase labels.
 * Decorative triangles, arcs, and dots occupy empty space.
 */

export const colors = {
  primary: '#1B2A4A',
  secondary: '#C0563A',
  accent: '#D9A441',
  background: '#F7F4EF',
  surface: '#EDE6DA',
  textPrimary: '#1A1A1A',
  textSecondary: '#6E6A63',
  success: '#3E5C4B',
  error: '#9B3A2E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32,
  48: 48,
};

/** Sharp corners only — never pill radii. */
export const radius = {
  none: 0,
  hairline: 1,
  sharp: 2,
  card: 4,
  max: 4,
};

const systemFont = Platform.select({
  ios: 'System',
  android: 'Roboto',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  default: 'System',
});

export const typography = {
  fontFamily: systemFont,
  header: {
    fontFamily: systemFont,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.6,
    color: colors.textPrimary,
  },
  headerLarge: {
    fontFamily: systemFont,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.8,
    color: colors.textPrimary,
  },
  headerSmall: {
    fontFamily: systemFont,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  headerBold: {
    fontWeight: '700',
  },
  headerLight: {
    fontWeight: '300',
  },
  subheader: {
    fontFamily: systemFont,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: colors.textPrimary,
  },
  subheaderLarge: {
    fontFamily: systemFont,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subheaderSmall: {
    fontFamily: systemFont,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontFamily: systemFont,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  bodyLarge: {
    fontFamily: systemFont,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  bodySmall: {
    fontFamily: systemFont,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  label: {
    fontFamily: systemFont,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  labelLarge: {
    fontFamily: systemFont,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
};

const ANGLED_CORNERS = {
  'top-right': {
    borderTopLeftRadius: radius.sharp,
    borderTopRightRadius: 0,
    borderBottomRightRadius: radius.card,
    borderBottomLeftRadius: radius.sharp,
  },
  'top-left': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: radius.card,
    borderBottomRightRadius: radius.sharp,
    borderBottomLeftRadius: radius.sharp,
  },
  'bottom-right': {
    borderTopLeftRadius: radius.sharp,
    borderTopRightRadius: radius.sharp,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: radius.card,
  },
  'bottom-left': {
    borderTopLeftRadius: radius.sharp,
    borderTopRightRadius: radius.card,
    borderBottomRightRadius: radius.sharp,
    borderBottomLeftRadius: 0,
  },
};

/**
 * Product / listing card. Sharp rectangle with one corner left square
 * so a triangle accent can sit on that edge.
 */
export function cardStyle({
  angledCorner = 'top-right',
  elevated = false,
} = {}) {
  return {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(27, 42, 74, 0.08)',
    ...(ANGLED_CORNERS[angledCorner] ?? ANGLED_CORNERS['top-right']),
    ...(elevated
      ? {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }
      : {}),
  };
}

/**
 * Triangle overlay for the square card corner. Place as an absolute child.
 */
export function cardCornerAccentStyle({
  corner = 'top-right',
  size = 18,
  color = colors.accent,
} = {}) {
  const triangle = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  };

  const map = {
    'top-right': {
      top: 0,
      right: 0,
      borderTopWidth: size,
      borderLeftWidth: size,
      borderTopColor: color,
      borderLeftColor: 'transparent',
    },
    'top-left': {
      top: 0,
      left: 0,
      borderTopWidth: size,
      borderRightWidth: size,
      borderTopColor: color,
      borderRightColor: 'transparent',
    },
    'bottom-right': {
      bottom: 0,
      right: 0,
      borderBottomWidth: size,
      borderLeftWidth: size,
      borderBottomColor: color,
      borderLeftColor: 'transparent',
    },
    'bottom-left': {
      bottom: 0,
      left: 0,
      borderBottomWidth: size,
      borderRightWidth: size,
      borderBottomColor: color,
      borderRightColor: 'transparent',
    },
  };

  return { ...triangle, ...map[corner] };
}

const BUTTON_VARIANTS = {
  primary: {
    backgroundColor: colors.primary,
    textColor: colors.background,
  },
  secondary: {
    backgroundColor: colors.secondary,
    textColor: colors.background,
  },
  accent: {
    backgroundColor: colors.accent,
    textColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
};

/**
 * Sharp rectangular buttons — never pills / never fully rounded.
 */
export function buttonStyle({ variant = 'primary', compact = false } = {}) {
  const palette = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary;
  const { textColor, ...surface } = palette;

  return {
    container: {
      ...surface,
      borderRadius: radius.sharp,
      paddingVertical: compact ? spacing.sm : spacing.md,
      paddingHorizontal: compact ? spacing.lg : spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
      minHeight: compact ? 36 : 48,
    },
    label: {
      ...typography.label,
      fontSize: 12,
      color: textColor,
    },
    textColor,
  };
}

/**
 * Mixed-weight display header.
 * Example: <Text style={bold}>Discover</Text><Text style={light}>Handmade Treasures</Text>
 */
export function headerStyle({ size = 'default' } = {}) {
  const sizes = {
    large: typography.headerLarge,
    default: typography.header,
    small: typography.headerSmall,
  };
  const base = sizes[size] ?? typography.header;

  return {
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing.xs,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      columnGap: spacing.sm,
    },
    bold: {
      ...base,
      fontWeight: '700',
    },
    light: {
      ...base,
      fontWeight: '300',
    },
    eyebrow: {
      ...typography.label,
      color: colors.secondary,
      marginBottom: spacing.sm,
    },
  };
}

/** Geometric accents for empty sides of asymmetric layouts. */
export const shapes = {
  triangle: (size = 24, color = colors.accent) => ({
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: size / 2,
    borderRightWidth: size / 2,
    borderBottomWidth: size,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color,
  }),
  invertedTriangle: (size = 24, color = colors.secondary) => ({
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: size / 2,
    borderRightWidth: size / 2,
    borderTopWidth: size,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: color,
  }),
  dot: (size = 6, color = colors.accent) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  }),
  /** Arc approximation using a clipped circle. */
  arc: (size = 64, color = colors.primary, thickness = 2) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: thickness,
    borderColor: color,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  }),
};

/**
 * Offset content + decorative column on the empty side.
 */
export function asymmetricLayout({ offset = spacing.xxl, decorate = 'right' } = {}) {
  return {
    row: {
      flexDirection: decorate === 'right' ? 'row' : 'row-reverse',
      alignItems: 'flex-start',
    },
    content: {
      flex: 1,
      paddingLeft: decorate === 'left' ? 0 : offset,
      paddingRight: decorate === 'right' ? 0 : offset,
    },
    accentColumn: {
      width: 48,
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: spacing.md,
      paddingTop: spacing.sm,
    },
  };
}

/**
 * Subtle repeating-dot field for section backgrounds.
 * Render a wrap of `dot` views, or use `svgPattern` on web.
 */
export const patterns = {
  dots: {
    color: 'rgba(27, 42, 74, 0.08)',
    size: 3,
    gap: 16,
  },
  grid: {
    color: 'rgba(192, 86, 58, 0.06)',
    size: 24,
  },
  /** CSS / SVG tile for web backgrounds. */
  svgPattern:
    "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%231B2A4A' fill-opacity='0.08'/%3E%3C/svg%3E\")",
};

export const rules = {
  noPills: true,
  maxRadius: radius.max,
  mixedWeightHeaders: true,
  geometricAccents: true,
  asymmetricLayouts: true,
};

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shapes,
  patterns,
  rules,
  cardStyle,
  cardCornerAccentStyle,
  buttonStyle,
  headerStyle,
  asymmetricLayout,
};

export default theme;
