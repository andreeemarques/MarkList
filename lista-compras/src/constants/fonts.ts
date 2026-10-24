/**
 * Fonte da app: Plus Jakarta Sans, empacotada dentro da app (funciona offline).
 *
 * No Android, cada peso é um ficheiro diferente, por isso o peso escolhe-se
 * pelo nome da família (FontFamily.bold) e NÃO com `fontWeight`.
 */

export const FontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
} as const;

// Mapa "nome da família → ficheiro", no formato que o `useFonts` espera.
export const fontAssets = {
  [FontFamily.regular]: require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
  [FontFamily.medium]: require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
  [FontFamily.semiBold]: require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  [FontFamily.bold]: require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
  [FontFamily.extraBold]: require('@/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
};