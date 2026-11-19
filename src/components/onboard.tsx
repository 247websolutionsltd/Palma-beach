import { Colors, Radius, Spacing } from "@/constants/theme";
import { Slide } from "@/data/onboardData";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions, View } from "react-native";
import { ThemedText } from "./themed-text";

const O = Colors.palette;

const glass = { backgroundColor: O.ocean700, borderWidth: 1, borderColor: "rgba(255,255,255,0.14)" } as const;

function Illustration({ kind }: { kind: Slide["kind"] }) {
  return (
    <View style={{ height: 300, alignItems: "center", justifyContent: "center" }}>
      <View style={{ position: "absolute", width: 290, height: 290, borderRadius: 145, backgroundColor: O.ocean600, opacity: 0.55 }} />
      <View style={{ position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: O.ocean500, opacity: 0.45 }} />

      {kind === "compete" && (
        <>
          <View style={[glass, { width: 270, borderRadius: Radius.lg, padding: Spacing.three + 2 }]}>
            {[
              { icon: "happy-outline", label: "Kids", note: "Ages 6 to 12" },
              { icon: "fitness-outline", label: "Teens", note: "Ages 13 to 17" },
              { icon: "trophy-outline", label: "Adults", note: "Ages 18 and over" },
            ].map((r, i) => (
              <View key={r.label} style={{ flexDirection: "row", alignItems: "center", marginTop: i ? Spacing.three : 0 }}>
                <View style={{ width: 40, height: 40, borderRadius: 13, backgroundColor: Colors.sun, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name={r.icon as any} size={20} color={O.ocean950} />
                </View>
                <View style={{ marginLeft: Spacing.three }}>
                  <ThemedText type="smallBold" style={{ color: "#FFF" }}>{r.label}</ThemedText>
                  <ThemedText type="caption" style={{ color: Colors.heroMuted }}>{r.note}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {kind === "prizes" && (
        <>
          <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: Colors.sun, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="trophy" size={78} color={O.ocean950} />
          </View>
          <View style={[glass, { position: "absolute", left: 18, bottom: 34, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999 }]}>
            <Ionicons name="medal" size={16} color={Colors.sun} />
            <ThemedText type="caption" style={{ color: "#FFF", marginLeft: 6 }}>Medals</ThemedText>
          </View>
          <View style={[glass, { position: "absolute", right: 18, top: 44, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999 }]}>
            <Ionicons name="gift" size={16} color={Colors.sun} />
            <ThemedText type="caption" style={{ color: "#FFF", marginLeft: 6 }}>Gifts</ThemedText>
          </View>
        </>
      )}

      {kind === "stay" && (
        <>
          <View style={[glass, { width: 270, borderRadius: Radius.lg, padding: Spacing.three + 2, flexDirection: "row", flexWrap: "wrap", gap: Spacing.three, justifyContent: "center" }]}>
            {(["bed", "flower", "restaurant", "boat"] as const).map((n) => (
              <View key={n} style={{ width: 106, height: 78, borderRadius: Radius.md, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name={n} size={30} color={Colors.sun} />
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

export default function OnboardingItem({ item }: { item: Slide }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ width, paddingHorizontal: Spacing.four, paddingTop: Spacing.six }}>
      <Illustration kind={item.kind} />
      <View style={{ marginTop: Spacing.four }}>
        <ThemedText type="label" style={{ color: Colors.sun }}>{item.eyebrow}</ThemedText>
        <ThemedText type="title" style={{ color: "#FFF", marginTop: Spacing.two }}>{item.title}</ThemedText>
        <ThemedText style={{ color: Colors.heroMuted, marginTop: Spacing.three, lineHeight: 24 }}>{item.description}</ThemedText>
      </View>
    </View>
  );
}
