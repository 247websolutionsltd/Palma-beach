import Button from "@/components/button";
import Container from "@/components/custom-container";
import { ThemedText } from "@/components/themed-text";
import { Card, DetailRow } from "@/components/ui";
import { categoryById, Competition, TBA } from "@/constants/competition";
import { Colors, Spacing } from "@/constants/theme";
import { useRegistrations } from "@/context/RegistrationContext";
import { go, goReplace } from "@/lib/nav";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Registered() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { registrations } = useRegistrations();
  const r = registrations.find((x) => x.id === id);

  return (
    <Container>
      <View style={{ alignItems: "center", padding: Spacing.four, paddingTop: Spacing.six }}>
        <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.sun, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="checkmark" size={56} color={Colors.palette.ocean950} />
        </View>
        <ThemedText type="large" style={{ marginTop: Spacing.four, textAlign: "center" }}>You're registered!</ThemedText>
        <ThemedText themeColor="textSecondary" style={{ marginTop: Spacing.two, textAlign: "center" }}>
          Keep your reference number. We'll share updates and announcements as the event gets closer.
        </ThemedText>
      </View>

      {r ? (
        <View style={{ paddingHorizontal: Spacing.three }}>
          <Card>
            <DetailRow label="Reference" value={r.id} bold />
            <DetailRow label="Name" value={r.name} />
            <DetailRow label="Category" value={`${categoryById(r.category)?.label ?? r.category} (age ${r.age})`} />
            <DetailRow label="Event date" value={Competition.date ?? TBA} />
            <DetailRow label="Venue" value={Competition.venue ?? TBA} last />
          </Card>
          {!r.synced && (
            <ThemedText type="caption" themeColor="textSecondary" style={{ marginTop: Spacing.three, textAlign: "center" }}>
              Saved on this device. It will be sent to the organisers automatically when you're back online.
            </ThemedText>
          )}
        </View>
      ) : null}

      <View style={{ padding: Spacing.three, paddingTop: Spacing.four, gap: Spacing.two + 2 }}>
        <Button title="Back to home" onPress={() => goReplace("/(tabs)/home")} />
        <Button variant="secondary" title="My registrations" onPress={() => go("/registrations")} />
      </View>
    </Container>
  );
}
