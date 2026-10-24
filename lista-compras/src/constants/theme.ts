/**
 * Tema da app: tokens de cor do Material Design 3, retirados dos mockups
 * (Fresh Harvest para o modo claro, Nocturne Harvest para o modo escuro).
 *
 * Convenção: `onX` é a cor a usar POR CIMA de `X` (ex.: texto dentro de um botão primary).
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#faf8ff',
    onBackground: '#131b2e',

    surface: '#faf8ff',
    onSurface: '#131b2e',
    onSurfaceVariant: '#3d4a42',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f2f3ff',
    surfaceContainer: '#eaedff',
    surfaceContainerHigh: '#e2e7ff',
    surfaceContainerHighest: '#dae2fd',

    outline: '#6d7a72',
    outlineVariant: '#bccac0',

    primary: '#006948',
    onPrimary: '#ffffff',
    primaryContainer: '#00855d',
    onPrimaryContainer: '#f5fff7',
    primaryFixed: '#85f8c4',

    secondary: '#855300',
    onSecondary: '#ffffff',
    secondaryContainer: '#fea619',
    onSecondaryContainer: '#684000',

    tertiary: '#006194',
    onTertiary: '#ffffff',
    tertiaryContainer: '#007bb9',
    onTertiaryContainer: '#fdfcff',

    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',

    inverseSurface: '#283044',
    inverseOnSurface: '#eef0ff',
  },
  dark: {
    background: '#0b1326',
    onBackground: '#dae2fd',

    surface: '#0b1326',
    onSurface: '#dae2fd',
    onSurfaceVariant: '#bbcabf',
    surfaceContainerLowest: '#060e20',
    surfaceContainerLow: '#131b2e',
    surfaceContainer: '#171f33',
    surfaceContainerHigh: '#222a3d',
    surfaceContainerHighest: '#2d3449',

    outline: '#86948a',
    outlineVariant: '#3c4a42',

    primary: '#4edea3',
    onPrimary: '#003824',
    primaryContainer: '#10b981',
    onPrimaryContainer: '#00422b',
    primaryFixed: '#6ffbbe',

    secondary: '#45dfa4',
    onSecondary: '#003825',
    secondaryContainer: '#00bd85',
    onSecondaryContainer: '#00452e',

    tertiary: '#68dba9',
    onTertiary: '#003825',
    tertiaryContainer: '#3eb686',
    onTertiaryContainer: '#00422c',

    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',

    inverseSurface: '#dae2fd',
    inverseOnSurface: '#283044',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// Mantido do template; é substituído pela Plus Jakarta Sans na subtarefa 1.4.2.
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;