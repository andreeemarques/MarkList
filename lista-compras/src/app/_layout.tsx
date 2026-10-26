import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';

import { fontAssets } from '@/constants/fonts';
import { DATABASE_NAME, initializeDatabase } from '@/database/database';

// Mantém o splash visível até as fontes estarem carregadas.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    // Escondemos o splash quando as fontes carregaram OU falharam:
    // a app nunca deve ficar presa por causa de uma fonte.
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Enquanto não há resultado, não desenhamos nada (o splash continua visível).
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={initializeDatabase} useSuspense>
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </Suspense>
  );
}