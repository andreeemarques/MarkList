import { Stack } from "expo-router";

export default function RootLayout() {
  // Layout raiz: uma pilha de ecrãs sem cabeçalho nativo.
  // Na subtarefa 1.3 passa a conter os separadores.
  return <Stack screenOptions={{ headerShown: false }} />;
}