import { Colors } from '@/constants/theme';
import { AppThemeProvider, useAppTheme } from '@/context/PageContext';
import { RegistrationProvider } from '@/context/RegistrationContext';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Shell() {
  const { themeMode } = useAppTheme();
  const c = Colors[themeMode];
  const base = themeMode === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: c.background, card: c.card, text: c.text, border: c.line, primary: c.accent },
  };

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: c.background },
          animation: 'slide_from_right',
        }}
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider initialTheme="light">
        <RegistrationProvider>
          <Shell />
        </RegistrationProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
