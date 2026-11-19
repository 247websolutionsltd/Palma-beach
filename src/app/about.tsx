import Button from "@/components/button";
import Container from "@/components/custom-container";
import Header from "@/components/header";
import { ThemedText } from "@/components/themed-text";
import { Card, SectionHeader } from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { about } from "@/data/content";
import { go } from "@/lib/nav";
import { View } from "react-native";

export default function About() {
  return (
    <Container>
      <Header title="About" />
      <View style={{ paddingHorizontal: Spacing.three, gap: Spacing.four }}>
        <View>
          <ThemedText type="large">{about.title}</ThemedText>
          <ThemedText themeColor="textSecondary" style={{ marginTop: Spacing.two }}>{about.intro}</ThemedText>
        </View>

        <View>
          <SectionHeader title="Purpose" />
          <Card><ThemedText themeColor="textSecondary">{about.purpose}</ThemedText></Card>
        </View>

        <View>
          <SectionHeader title="Benefits" />
          <Card style={{ gap: Spacing.two + 2 }}>
            {about.benefits.map((b) => (
              <ThemedText key={b} themeColor="textSecondary">{"•  " + b}</ThemedText>
            ))}
          </Card>
        </View>

        <View>
          <SectionHeader title="How to participate" />
          <Card><ThemedText themeColor="textSecondary">{about.howTo}</ThemedText></Card>
        </View>

        <Button title="Register now" icon="arrow-forward" onPress={() => go("/register")} />
      </View>
    </Container>
  );
}
