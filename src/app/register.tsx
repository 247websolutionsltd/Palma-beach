import Button from "@/components/button";
import Container from "@/components/custom-container";
import Input from "@/components/custom-input";
import Header from "@/components/header";
import { ThemedText } from "@/components/themed-text";
import { Card, Chip, Toggle } from "@/components/ui";
import { CategoryId, CATEGORIES, categoryForAge, categoryById, Competition } from "@/constants/competition";
import { Spacing } from "@/constants/theme";
import { useRegistrations } from "@/context/RegistrationContext";
import { goWith } from "@/lib/nav";
import { emptyRegister, isMinor, RegisterErrors, RegisterValues, validateRegistration } from "@/lib/validate";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Register() {
  const params = useLocalSearchParams<{ category?: string }>();
  const { register } = useRegistrations();
  const [v, setV] = useState<RegisterValues>(() => ({
    ...emptyRegister,
    category: categoryById(params.category ?? "")?.id ?? "",
  }));
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof RegisterValues>(k: K, value: RegisterValues[K]) => {
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onAge = (text: string) => {
    const digits = text.replace(/[^\d]/g, "").slice(0, 2);
    setV((p) => {
      // Suggest the matching category as the age is typed, unless one was already chosen.
      const match = digits ? categoryForAge(Number(digits)) : undefined;
      return { ...p, age: digits, category: p.category || (match?.id ?? "") };
    });
    setErrors((p) => ({ ...p, age: undefined }));
  };

  const submit = async () => {
    if (busy) return;
    const found = validateRegistration(v);
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      const minor = isMinor(v.age);
      const entry = await register({
        name: v.name.trim(),
        email: v.email.trim().toLowerCase(),
        phone: v.phone.trim(),
        age: Number(v.age),
        category: v.category as CategoryId,
        ...(minor ? { guardianName: v.guardianName.trim(), guardianPhone: v.guardianPhone.trim() } : {}),
      });
      goWith("/registered", { id: entry.id });
    } catch (e) {
      console.error(e);
      Alert.alert("Could not register", "Something went wrong saving your entry. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const minor = isMinor(v.age);

  return (
    <Container>
      <Header title="Register" />
      <View style={{ paddingHorizontal: Spacing.three }}>
        <ThemedText type="large">Palmabeach Competition Registration</ThemedText>
        <ThemedText themeColor="textSecondary" style={{ marginTop: Spacing.one + 2 }}>{Competition.name}</ThemedText>

        <View style={{ marginTop: Spacing.three }}>
          <Input label="Full name" placeholder="John Doe" icon="person-outline" value={v.name} onChangeText={(t) => set("name", t)} error={errors.name} autoCapitalize="words" autoComplete="name" />
          <Input label="Email" placeholder="john@example.com" icon="mail-outline" value={v.email} onChangeText={(t) => set("email", t)} error={errors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
          <Input label="Phone number" placeholder="+234 800 123 4567" icon="call-outline" value={v.phone} onChangeText={(t) => set("phone", t)} error={errors.phone} keyboardType="phone-pad" autoComplete="tel" />
          <Input label="Age" placeholder="Enter your age" icon="calendar-outline" value={v.age} onChangeText={onAge} error={errors.age} keyboardType="number-pad" maxLength={2} />

          <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: Spacing.two, marginBottom: Spacing.two }}>Category</ThemedText>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.two }}>
            {CATEGORIES.map((c) => (
              <Chip key={c.id} label={`${c.label} · ${c.min}${c.max >= 99 ? "+" : `-${c.max}`}`} icon={c.icon} selected={v.category === c.id} onPress={() => set("category", c.id)} />
            ))}
          </View>
          {errors.category ? (
            <ThemedText type="caption" themeColor="danger" style={{ marginTop: Spacing.two }}>{errors.category}</ThemedText>
          ) : null}

          {minor && (
            <Card alt style={{ marginTop: Spacing.four }}>
              <ThemedText type="bold">Parent or guardian</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: 2 }}>Required for swimmers under 18.</ThemedText>
              <Input label="Guardian's full name" placeholder="Jane Doe" icon="person-outline" value={v.guardianName} onChangeText={(t) => set("guardianName", t)} error={errors.guardianName} autoCapitalize="words" />
              <Input label="Guardian's phone" placeholder="+234 800 123 4567" icon="call-outline" value={v.guardianPhone} onChangeText={(t) => set("guardianPhone", t)} error={errors.guardianPhone} keyboardType="phone-pad" />
            </Card>
          )}

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: Spacing.four, gap: Spacing.three }}>
            <Toggle value={v.consent} onValueChange={(x) => set("consent", x)} label="Agree to take part" />
            <ThemedText type="small" themeColor="textSecondary" style={{ flex: 1 }}>
              {minor
                ? "I am the parent or guardian and I agree that this swimmer may take part in the competition."
                : "I agree to take part in the competition and follow the event rules."}
            </ThemedText>
          </View>
          {errors.consent ? (
            <ThemedText type="caption" themeColor="danger" style={{ marginTop: Spacing.two }}>{errors.consent}</ThemedText>
          ) : null}

          <View style={{ marginTop: Spacing.four }}>
            <Button title="Register Now" loading={busy} onPress={submit} />
          </View>
        </View>
      </View>
    </Container>
  );
}
