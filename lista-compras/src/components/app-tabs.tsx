import { NativeTabs } from 'expo-router/native-tabs';

import { FontFamily } from '@/constants/fonts';
import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const theme = useTheme();

  // `md` é o ícone usado no Android (nomes Material Symbols).
  // `sf` é o equivalente iOS: o TypeScript exige dois tipos de ícone,
  // mas a app só tem Android como alvo, por isso o iOS é ignorado.
  return (
    <NativeTabs
      backgroundColor={theme.surfaceContainerLowest}
      indicatorColor={theme.navIndicator}
      iconColor={{ default: theme.onSurfaceVariant, selected: theme.navActiveContent }}
      labelStyle={{
        default: { color: theme.onSurfaceVariant, fontFamily: FontFamily.semiBold },
        selected: { color: theme.navActiveContent, fontFamily: FontFamily.bold },
      }}>
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