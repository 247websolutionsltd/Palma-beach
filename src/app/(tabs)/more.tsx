import Container from "@/components/custom-container";
import { Logo } from "@/components/brand";
import { ThemedText } from "@/components/themed-text";
import { Card, ListRow, Toggle } from "@/components/ui";
import { Brand } from "@/constants/brand";
import { Spacing, TabBarSpace } from "@/constants/theme";
import { useAppTheme } from "@/context/PageContext";
import { useRegistrations } from "@/context/RegistrationContext";
import { go } from "@/lib/nav";
import { Linking, View } from "react-native";

export default function More() {
  const { themeMode, setThemeMode } = useAppTheme();
  const { registrations } = useRegistrations();

  return (
    <Container edges={["top"]} style={{ paddingBottom: TabBarSpace }}>
      <View style={{ padding: Spacing.three }}>
        <ThemedText type="large">More</ThemedText>
      </View>

      <View style={{ paddingHorizontal: Spacing.three, gap: Spacing.three }}>
        <Card style={{ paddingVertical: 0 }}>
          <ListRow icon="information-circle-outline" title="About" subtitle="The competition, its purpose and benefits" onPress={() => go("/about")} />
          <ListRow icon="megaphone-outline" title="Announcements" subtitle="News, events and offers" onPress={() => go("/announcements")} />
          <ListRow
            icon="ticket-outline"
            title="My registrations"
            subtitle={registrations.length ? `${registrations.length} saved on this device` : "Nothing registered yet"}
            onPress={() => go("/registrations")}
          />
          <ListRow icon="chatbubble-ellipses-outline" title="Contact" subtitle="Questions, bookings and support" onPress={() => go("/contact")} last />
        </Card>

        <Card style={{ paddingVertical: 0 }}>
          <ListRow
            icon="moon-outline"
            title="Dark mode"
            subtitle="Easier on the eyes at night"
            onPress={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
            right={<Toggle label="Dark mode" value={themeMode === "dark"} onValueChange={(on) => setThemeMode(on ? "dark" : "light")} />}
          />
          <ListRow icon="globe-outline" title="Visit our website" subtitle={Brand.website.replace("https://", "")} onPress={() => Linking.openURL(Brand.website).catch(() => {})} last />
        </Card>

        <View style={{ alignItems: "center", paddingTop: Spacing.three, opacity: 0.8 }}>
          <Logo size={30} />
          <ThemedText type="caption" themeColor="textSecondary" style={{ marginTop: Spacing.two }}>{Brand.tagline} · Version 1.0.0</ThemedText>
        </View>
      </View>
    </Container>
  );
}
