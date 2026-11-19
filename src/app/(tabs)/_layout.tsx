import { Colors, Radius } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { go } from "@/lib/nav";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { BottomTabBarProps } from "expo-router/build/layouts/Tabs";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_META: Record<
  string,
  { label: string; icon: IconName; iconActive: IconName }
> = {
  home: { label: "Home", icon: "home-outline", iconActive: "home" },
  competition: {
    label: "Compete",
    icon: "trophy-outline",
    iconActive: "trophy",
  },
  services: {
    label: "Services",
    icon: "sparkles-outline",
    iconActive: "sparkles",
  },
  more: { label: "More", icon: "menu-outline", iconActive: "menu" },
};

const ORDER = ["home", "competition", "services", "more"];

function CustomTabBar({ state, navigateToTab }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const routes = ORDER.map((name) =>
    state.routes.find((r) => r.name === name),
  ).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const focusedName = state.routes[state.index]?.name;

  const renderTab = (route: (typeof routes)[number]) => {
    const meta = TAB_META[route.name];
    const focused = focusedName === route.name;
    const color = focused ? theme.accent : theme.textSecondary;
    return (
      <Pressable
        key={route.key}
        onPress={() => navigateToTab(route.key)}
        style={styles.tab}
        accessibilityRole="button"
        accessibilityLabel={meta.label}
        accessibilityState={{ selected: focused }}
      >
        <Ionicons
          name={focused ? meta.iconActive : meta.icon}
          size={22}
          color={color}
        />
        <Text
          style={[styles.label, { color, fontWeight: focused ? "700" : "500" }]}
        >
          {meta.label}
        </Text>
        <View
          style={[
            styles.dot,
            { backgroundColor: focused ? theme.accent : "transparent" },
          ]}
        />
      </Pressable>
    );
  };

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: theme.card,
            borderColor: theme.line,
            shadowColor: "#000",
          },
        ]}
      >
        {routes.slice(0, 2).map(renderTab)}
        <View style={styles.fabSlot}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => go("/register")}
            accessibilityRole="button"
            accessibilityLabel="Register for the competition"
            style={[styles.fab, { borderColor: theme.background }]}
          >
            <Ionicons name="pencil" size={24} color={Colors.palette.ocean950} />
          </TouchableOpacity>
          <Text
            style={[styles.label, { color: theme.textSecondary, marginTop: 2 }]}
          >
            Register
          </Text>
        </View>
        {routes.slice(2).map(renderTab)}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="competition" options={{ title: "Competition" }} />
      <Tabs.Screen name="services" options={{ title: "Services" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderRadius: Radius.xl,
    borderWidth: 1,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    ...(Platform.OS === "android" ? { elevation: 12 } : {}),
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  label: { fontSize: 11 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  fabSlot: {
    width: 76,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 70,
    paddingBottom: 14,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.sun,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -34,
    borderWidth: 5,
    shadowColor: Colors.sun,
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    ...(Platform.OS === "android" ? { elevation: 8 } : {}),
  },
});
