import { Brand } from "@/constants/brand";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { ThemedText } from "./themed-text";

/**
 * Wordmark. TODO: swap the icon tile for the real Palmabeach logo image
 * (put it in /assets and render it with <Image/> here) once you have the file.
 */
export function Logo({ size = 40, showName = true, light = false }: { size?: number; showName?: boolean; light?: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.3,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="sunny" size={size * 0.34} color={Colors.sun} style={{ position: "absolute", top: size * 0.12, left: size * 0.14 }} />
        <Ionicons name="water" size={size * 0.56} color={Colors.primary} style={{ marginTop: size * 0.1 }} />
      </View>
      {showName && (
        <ThemedText
          style={{
            marginLeft: size * 0.3,
            fontSize: size * 0.58,
            lineHeight: size * 0.8,
            fontWeight: "800",
            letterSpacing: -0.6,
            color: light ? "#FFFFFF" : undefined,
          }}
        >
          {Brand.name}
        </ThemedText>
      )}
    </View>
  );
}
