import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { FontFamily } from '@/constants/fonts';

type PlaceholderScreenProps = {
  title: string;
};

// Ecrã provisório, usado enquanto os ecrãs reais não existem.
// O estilo do título é um teste temporário da fonte (a tipografia final vem na 1.4.3).
export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText themeColor="onSurfaceVariant">Ecrã em construção</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  title: {
    fontFamily: FontFamily.extraBold,
    // O peso já vem do ficheiro; evitamos que o Android tente "engrossar" a fonte.
    fontWeight: 'normal',
  },
});