import Button from "@/components/button";
import Container from "@/components/custom-container";
import PageHero from "@/components/hero";
import { ThemedText } from "@/components/themed-text";
import { Card, IconBadge } from "@/components/ui";
import { Spacing, TabBarSpace } from "@/constants/theme";
import { services } from "@/data/content";
import { go } from "@/lib/nav";
import { View } from "react-native";

export default function Services() {
  return (
    <Container edges={["top"]} style={{ paddingBottom: TabBarSpace }}>
      <View style={{ padding: Spacing.three }}>
        <PageHero
          eyebrow="OUR SERVICES"
          title="Everything for a relaxing stay"
          subtitle="At Palmabeach, we offer a wide range of services to ensure your stay is as relaxing and enjoyable as possible."
        />
      </View>

      <View style={{ paddingHorizontal: Spacing.three, gap: Spacing.two + 2 }}>
        {services.map((s, i) => (
          <Card key={s.title} style={{ flexDirection: "row", alignItems: "center" }}>
            <IconBadge icon={s.icon} size={52} />
            <View style={{ flex: 1, marginLeft: Spacing.three }}>
              <ThemedText type="bold">{`${i + 1}. ${s.title}`}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: 2 }}>{s.text}</ThemedText>
            </View>
          </Card>
        ))}
      </View>

      <View style={{ padding: Spacing.three, paddingTop: Spacing.four }}>
        <Button variant="secondary" title="Ask about a booking" iconLeft="chatbubble-ellipses-outline" onPress={() => go("/contact")} />
      </View>
    </Container>
  );
}
