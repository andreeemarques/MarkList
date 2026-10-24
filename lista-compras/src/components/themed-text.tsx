import { Text, type TextProps } from 'react-native';

import type { ThemeColor } from '@/constants/theme';
import { Typography, type TypographyVariant } from '@/constants/typography';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  /** Estilo da escala tipográfica (tamanho, peso, altura de linha). */
  variant?: TypographyVariant;
  /** Cor do tema; por defeito `onSurface`. */
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  variant = 'bodyLg',
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor ?? 'onSurface'] }, Typography[variant], style]}
      {...rest}
    />
  );
}