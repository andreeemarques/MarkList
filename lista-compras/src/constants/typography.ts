/**
 * Escala tipográfica da app (valores do DESIGN.md dos mockups).
 *
 * O peso escolhe-se pela família (FontFamily.bold…), e não com `fontWeight`,
 * porque no Android cada peso da Plus Jakarta Sans é um ficheiro diferente.
 */

import type { TextStyle } from 'react-native';

import { FontFamily } from '@/constants/fonts';

// O design indica o espaçamento entre letras em "em" (relativo ao tamanho da
// fonte), mas o React Native usa píxeis. Esta função faz a conversão.
const em = (fontSize: number, value: number) => fontSize * value;

export const Typography = {
  displayLg: {
    fontFamily: FontFamily.extraBold,
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: em(34, -0.02),
  },
  headlineLg: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: em(26, -0.01),
  },
  headlineMd: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: em(22, -0.01),
  },
  headlineSm: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    lineHeight: 24,
  },
  bodyLg: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: em(14, 0.01),
  },
  bodySm: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: em(12, 0.01),
  },
  labelLg: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: em(14, 0.01),
  },
  labelMd: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: em(12, 0.02),
  },
  labelSm: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: em(11, 0.04),
  },
  priceDisplay: {
    fontFamily: FontFamily.extraBold,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: em(24, -0.02),
  },
  priceBadge: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: em(14, -0.01),
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof Typography;