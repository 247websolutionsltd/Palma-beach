import Button from "@/components/button";
import Container from "@/components/custom-container";
import PageHero from "@/components/hero";
import { ThemedText } from "@/components/themed-text";
import { Card, DetailRow, IconBadge, ListRow, SectionHeader } from "@/components/ui";
import { CATEGORIES, Competition, TBA } from "@/constants/competition";
import { Spacing, TabBarSpace } from "@/constants/theme";
import { useRegistrations } from "@/context/RegistrationContext";
import { about } from "@/data/content";
import { go, goWith } from "@/lib/nav";
import { View } from "react-native";

export default function CompetitionTab() {
  const { registrations } = useRegistrations();

  return (
    <Container edges={["top"]} style={{ paddingBottom: TabBarSpace }}>
      <View style={{ padding: Spacing.three }}>
        <PageHero
          eyebrow="COMPETITION"
          title="Palmabeach Swimming Competition"
          subtitle="Pick your category and register to take part."
        />
      </View>

      <View style={{ paddingHorizontal: Spacing.three }}>
        <SectionHeader title="Categories" />
        <View style={{ gap: Spacing.two + 2 }}>
          {CATEGORIES.map((c) => (
            <Card key={c.id} onPress={() => goWith("/register", { category: c.id })} style={{ flexDirection: "row", alignItems: "center" }}>
              <IconBadge icon={c.icon} size={48} />
              <View style={{ flex: 1, marginLeft: Spacing.three }}>
                <ThemedText type="bold">{c.label}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">{c.blurb}</ThemedText>
              </View>
              <ThemedText type="smallBold" themeColor="accent">Register</ThemedText>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ padding: Spacing.three, paddingTop: Spacing.four }}>
        <SectionHeader title="Event details" />
        <Card>
          <DetailRow label="Date" value={Competition.date ?? TBA} />
          <DetailRow label="Venue" value={Competition.venue ?? TBA} />
          <DetailRow label="Entry fee" value={Competition.fee ?? TBA} />
          <DetailRow label="Register by" value={Competition.deadline ?? TBA} last />
        </Card>
      </View>

      <View style={{ paddingHorizontal: Spacing.three }}>
        <SectionHeader title="About" />
        <Card>
          <ThemedText type="bold">Purpose</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: Spacing.one + 2 }}>{about.purpose}</ThemedText>
          <ThemedText type="bold" style={{ marginTop: Spacing.three }}>Benefits</ThemedText>
          {about.benefits.map((b) => (
            <ThemedText key={b} type="small" themeColor="textSecondary" style={{ marginTop: Spacing.one + 2 }}>{"•  " + b}</ThemedText>
          ))}
          <ThemedText type="smallBold" themeColor="accent" onPress={() => go("/about")} style={{ marginTop: Spacing.three }}>
            Read more
          </ThemedText>
        </Card>
      </View>

      <View style={{ padding: Spacing.three, paddingTop: Spacing.four, gap: Spacing.three }}>
        <Button variant="primary" title="Register now" icon="arrow-forward" onPress={() => go("/register")} />
        {registrations.length > 0 && (
          <Card style={{ paddingVertical: 0 }}>
            <ListRow
              icon="ticket-outline"
              title="My registrations"
              subtitle={`${registrations.length} saved on this device`}
              onPress={() => go("/registrations")}
              last
            />
          </Card>
        )}
      </View>
    </Container>
  );
}
