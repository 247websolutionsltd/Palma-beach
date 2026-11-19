import { Colors, Radius, Spacing } from "@/constants/theme";
import { ReactNode } from "react";
import { View } from "react-native";
import { ThemedText } from "./themed-text";
import { HeroDecor } from "./ui";

/** Blue banner that opens each tab screen: title, optional subtitle and a slot for actions. */
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.hero,
        borderRadius: Radius.xl,
        padding: Spacing.four,
        overflow: "hidden",
      }}
    >
      <HeroDecor />
      <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          {eyebrow ? (
            <ThemedText type="label" style={{ color: Colors.sun, marginBottom: Spacing.one }}>
              {eyebrow}
            </ThemedText>
          ) : null}
          <ThemedText type="title" style={{ color: "#FFF" }}>
            {title}
          </ThemedText>
          {subtitle ? <ThemedText style={{ color: Colors.heroMuted, marginTop: Spacing.two }}>{subtitle}</ThemedText> : null}
        </View>
        {right}
      </View>
      {children}
    </View>
  );
}
