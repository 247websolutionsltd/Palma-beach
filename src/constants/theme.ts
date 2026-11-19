/**
 * Palmabeach design tokens.
 * Ocean blues (matching the website) with a warm "sun" accent taken from the logo.
 * Light mode is the default; a dark mode is available in More > Appearance.
 * The "hero" surfaces (headers, banners) stay brand blue in both modes.
 */
import '@/global.css';

import { Platform } from 'react-native';

const palette = {
  ocean950: '#050F26',
  ocean900: '#08173A',
  ocean850: '#0B1F4D',
  ocean800: '#0F2A66',
  ocean700: '#14388A',
  ocean600: '#1D4ED8',
  ocean500: '#2563EB',
  ocean400: '#4F86F7',
  sky300: '#9CC4FF',
  sky100: '#DCEAFF',
  sun: '#FFB43B',
  sunDeep: '#F59E0B',
  white: '#FFFFFF',
  danger: '#F87171',
  warning: '#FBBF24',
  success: '#34D399',
} as const;

export const Colors = {
  // Brand constants (theme independent)
  primary: palette.ocean500,
  primaryDark: palette.ocean800,
  primaryTint: palette.sky100,
  sun: palette.sun,
  palette,

  // Hero surfaces stay blue in both modes
  hero: palette.ocean500,
  heroDeep: palette.ocean600,
  heroGlow: palette.ocean400,
  heroText: '#FFFFFF',
  heroMuted: 'rgba(255,255,255,0.78)',
  heroChip: 'rgba(255,255,255,0.16)',

  light: {
    text: '#0B1B3F',
    textSecondary: '#52617F',
    background: '#F3F6FC',
    paper: '#F3F6FC',
    card: '#FFFFFF',
    cardAlt: '#E8EEFB',
    backgroundElement: '#E8EEFB',
    backgroundSelected: '#D6E1F7',
    line: '#DCE4F3',
    tint: '#DCEAFF',
    inkSoft: '#8593B0',
    accent: '#1D4ED8',
    accentSurface: '#E3ECFF',
    accentText: '#163DA8',
    cta: '#1D4ED8',
    ctaText: '#FFFFFF',
    controlOff: '#C7D2E8',
    controlThumb: '#FFFFFF',
    danger: '#D64545',
    success: '#168A57',
    warning: '#B97A00',
    overlay: 'rgba(5,15,38,0.5)',
  },
  dark: {
    text: '#EEF3FF',
    textSecondary: '#93A5C9',
    background: palette.ocean950,
    paper: palette.ocean950,
    card: palette.ocean850,
    cardAlt: palette.ocean800,
    backgroundElement: palette.ocean800,
    backgroundSelected: palette.ocean700,
    line: '#173063',
    tint: palette.ocean700,
    inkSoft: '#6379A6',
    accent: palette.sun,
    accentSurface: '#12285C',
    accentText: palette.sun,
    cta: palette.sun,
    ctaText: palette.ocean950,
    controlOff: '#2A427C',
    controlThumb: '#FFFFFF',
    danger: palette.danger,
    success: palette.success,
    warning: palette.warning,
    overlay: 'rgba(0,0,0,0.6)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export type AppColors = typeof Colors.light | typeof Colors.dark;

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64 } as const;
export const Radius = { sm: 12, md: 18, lg: 26, xl: 34, pill: 999 } as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/** Bottom padding tab screens need so content clears the floating tab bar. */
export const TabBarSpace = 128;
