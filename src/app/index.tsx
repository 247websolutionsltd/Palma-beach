import { Logo } from '@/components/brand';
import { ThemedText } from '@/components/themed-text';
import { HeroDecor } from '@/components/ui';
import { Brand } from '@/constants/brand';
import { Colors } from '@/constants/theme';
import { goReplace } from '@/lib/nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';

const SPLASH_MS = 1200;

/** Branded splash. First launch goes to onboarding, returning visitors straight to Home. */
export default function Splash() {
  useEffect(() => {
    const t = setTimeout(async () => {
      let target = '/onboard';
      try {
        if ((await AsyncStorage.getItem('onboarded')) === 'true') target = '/(tabs)/home';
      } catch (e) {
        console.warn('Unable to read onboarding status', e);
      }
      goReplace(target);
    }, SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.hero, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="light-content" />
      <HeroDecor />
      <Logo size={64} light />
      <ThemedText style={{ color: Colors.heroMuted, marginTop: 14, letterSpacing: 2, fontWeight: '600' }}>
        {Brand.tagline.toUpperCase()}
      </ThemedText>
    </View>
  );
}
