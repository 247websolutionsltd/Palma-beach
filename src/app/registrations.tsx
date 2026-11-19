import Button from "@/components/button";
import Container from "@/components/custom-container";
import Header from "@/components/header";
import { ThemedText } from "@/components/themed-text";
import { Card, DetailRow, IconBadge } from "@/components/ui";
import { categoryById } from "@/constants/competition";
import { Spacing } from "@/constants/theme";
import { useRegistrations } from "@/context/RegistrationContext";
import { go } from "@/lib/nav";
import { View } from "react-native";

export default function Registrations() {
  const { registrations } = useRegistrations();

  return (
    <Container>
      <Header title="My registrations" />
      <View style={{ paddingHorizontal: Spacing.three, gap: Spacing.three }}>
        {registrations.length === 0 ? (
          <Card style={{ alignItems: "center", paddingVertical: Spacing.five }}>
            <IconBadge icon="ticket-outline" size={64} round />
            <ThemedText type="bold" style={{ marginTop: Spacing.three }}>No registrations yet</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: 4, textAlign: "center" }}>
              Register for the competition and your entries will show up here.
            </ThemedText>
            <View style={{ marginTop: Spacing.four, alignSelf: "stretch" }}>
              <Button title="Register" onPress={() => go("/register")} />
            </View>
          </Card>
        ) : (
          registrations.map((r) => (
            <Card key={r.id}>
              <DetailRow label="Reference" value={r.id} bold />
              <DetailRow label="Name" value={r.name} />
              <DetailRow label="Category" value={`${categoryById(r.category)?.label ?? r.category} (age ${r.age})`} />
              <DetailRow label="Registered" value={new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
              {r.guardianName ? <DetailRow label="Guardian" value={r.guardianName} /> : null}
              <DetailRow label="Status" value={r.synced ? "Received" : "Saved on device"} last />
            </Card>
          ))
        )}
      </View>
    </Container>
  );
}
