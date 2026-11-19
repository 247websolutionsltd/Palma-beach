import Button from "@/components/button";
import Container from "@/components/custom-container";
import Header from "@/components/header";
import { ThemedText } from "@/components/themed-text";
import { Card, IconBadge } from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { announcements } from "@/data/content";
import { go } from "@/lib/nav";
import { View } from "react-native";

export default function Announcements() {
  return (
    <Container>
      <Header title="Announcements" />
      <View style={{ paddingHorizontal: Spacing.three, gap: Spacing.three }}>
        {announcements.map((a) => (
          <Card key={a.id}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconBadge icon="megaphone-outline" size={46} />
              <View style={{ marginLeft: Spacing.three }}>
                <ThemedText type="big">{a.title}</ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">{a.date}</ThemedText>
              </View>
            </View>
            {a.body.map((b, i) => (
              <View key={i} style={{ marginTop: Spacing.three }}>
                {b.heading ? <ThemedText type="bold">{b.heading}</ThemedText> : null}
                <ThemedText themeColor="textSecondary" style={{ marginTop: b.heading ? 2 : 0 }}>{b.text}</ThemedText>
              </View>
            ))}
            <View style={{ marginTop: Spacing.four }}>
              <Button variant="soft" title="Contact us" iconLeft="chatbubble-ellipses-outline" onPress={() => go("/contact")} />
            </View>
          </Card>
        ))}
      </View>
    </Container>
  );
}
