import Button from "@/components/button";
import Container from "@/components/custom-container";
import { RoundButton } from "@/components/header";
import { Logo } from "@/components/brand";
import { ThemedText } from "@/components/themed-text";
import { Card, DetailRow, IconBadge, ListRow, SectionHeader } from "@/components/ui";
import { HeroDecor } from "@/components/ui";
import { Competition, HIGHLIGHTS, TBA } from "@/constants/competition";
import { Colors, Radius, Spacing, TabBarSpace } from "@/constants/theme";
import { announcements } from "@/data/content";
import { useRegistrations } from "@/context/RegistrationContext";
import { go } from "@/lib/nav";
import { View } from "react-native";

export default function Home() {
  const { registrations } = useRegistrations();
  const latest = announcements[0];

  return (
    <Container edges={["top"]} style={{ paddingBottom: TabBarSpace }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: Spacing.three }}>
        <Logo size={38} />
        <RoundButton icon="megaphone-outline" label="Announcements" dot onPress={() => go("/announcements")} />
      </View>

      <View style={{ paddingHorizontal: Spacing.three }}>
        <View style={{ backgroundColor: Colors.hero, borderRadius: Radius.xl, padding: Spacing.four, overflow: "hidden" }}>
          <HeroDecor />
          <ThemedText type="label" style={{ color: Colors.sun }}>NOW OPEN</ThemedText>
          <ThemedText type="display" style={{ color: "#FFF", marginTop: Spacing.two, fontSize: 34, lineHeight: 38 }}>
            {Competition.name}
          </ThemedText>
          <ThemedText style={{ color: Colors.heroMuted, marginTop: Spacing.three }}>
            Join our exciting swimming competitions designed for all age groups.
          </ThemedText>
          <View style={{ marginTop: Spacing.four }}>
            <Button variant="sun" title="Register for Competition" icon="arrow-forward" onPress={() => go("/register")} />
          </View>
          {registrations.length > 0 && (
            <ThemedText
              type="smallBold"
              onPress={() => go("/registrations")}
              style={{ color: "#FFF", textAlign: "center", marginTop: Spacing.three, textDecorationLine: "underline" }}
            >
              You have {registrations.length} registration{registrations.length > 1 ? "s" : ""}. View
            </ThemedText>
          )}
        </View>
      </View>

      <View style={{ padding: Spacing.three, paddingTop: Spacing.four }}>
        <SectionHeader title="Why take part" />
        <View style={{ gap: Spacing.two + 2 }}>
          {HIGHLIGHTS.map((h) => (
            <Card key={h.title} style={{ flexDirection: "row", alignItems: "center" }}>
              <IconBadge icon={h.icon} size={48} />
              <View style={{ flex: 1, marginLeft: Spacing.three }}>
                <ThemedText type="bold">{h.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: 2 }}>{h.text}</ThemedText>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.three }}>
        <SectionHeader title="Event details" action="Full info" onAction={() => go("/(tabs)/competition")} />
        <Card>
          <DetailRow label="Date" value={Competition.date ?? TBA} />
          <DetailRow label="Venue" value={Competition.venue ?? TBA} />
          <DetailRow label="Entry fee" value={Competition.fee ?? TBA} />
          <DetailRow label="Register by" value={Competition.deadline ?? TBA} last />
        </Card>
      </View>

      <View style={{ padding: Spacing.three, paddingTop: Spacing.four }}>
        <SectionHeader title="Latest announcement" action="See all" onAction={() => go("/announcements")} />
        <Card alt onPress={() => go("/announcements")}>
          <ThemedText type="bold">{latest.title}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: Spacing.one + 2 }}>{latest.summary}</ThemedText>
        </Card>
      </View>

      <View style={{ paddingHorizontal: Spacing.three }}>
        <Card style={{ paddingVertical: 0 }}>
          <ListRow icon="information-circle-outline" title="About the competition" subtitle="Purpose, benefits and how to join" onPress={() => go("/about")} />
          <ListRow icon="sparkles-outline" title="Our services" subtitle="Stay, dine, relax and play" onPress={() => go("/(tabs)/services")} />
          <ListRow icon="chatbubble-ellipses-outline" title="Contact us" subtitle="Questions or bookings" onPress={() => go("/contact")} last />
        </Card>
      </View>
    </Container>
  );
}
