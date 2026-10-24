import { NativeTabs } from 'expo-router/native-tabs';

import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const theme = useTheme();

  // `md` é o ícone usado no Android (nomes Material Symbols).
  // `sf` é o equivalente iOS: o TypeScript exige dois tipos de ícone,
  // mas a app só tem Android como alvo, por isso o iOS é ignorado.
  // As cores finais da barra (pílula verde) ficam para a subtarefa 1.4.4.
  return (
    <NativeTabs
      backgroundColor={theme.surface}
      indicatorColor={theme.surfaceContainerHigh}
      labelStyle={{ selected: { color: theme.onSurface } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Início</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="lists">
        <NativeTabs.Trigger.Label>Listas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="checklist" md="checklist" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="products">
        <NativeTabs.Trigger.Label>Produtos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="shippingbox" md="inventory_2" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="stats">
        <NativeTabs.Trigger.Label>Estatísticas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.line.uptrend.xyaxis" md="monitoring" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}