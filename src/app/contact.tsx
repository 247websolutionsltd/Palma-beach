import Button from "@/components/button";
import Container from "@/components/custom-container";
import Input from "@/components/custom-input";
import Header from "@/components/header";
import { ThemedText } from "@/components/themed-text";
import { Card, ListRow } from "@/components/ui";
import { Brand } from "@/constants/brand";
import { Spacing } from "@/constants/theme";
import { sendContactMessage } from "@/services/messages";
import { useState } from "react";
import { Alert, Linking, View } from "react-native";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [busy, setBusy] = useState(false);

  const send = async () => {
    if (busy) return;
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Enter your name.";
    if (!EMAIL.test(email.trim())) e.email = "Enter a valid email address.";
    if (message.trim().length < 5) e.message = "Write a short message.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    try {
      const payload = { name: name.trim(), email: email.trim(), message: message.trim() };
      const result = await sendContactMessage(payload);
      if (result === "sent") {
        setName(""); setEmail(""); setMessage("");
        Alert.alert("Message sent", "Thanks for reaching out. We'll get back to you soon.");
      } else {
        // No cloud configured: hand the message to the person's email app instead.
        const subject = encodeURIComponent(`Message from ${payload.name}`);
        const body = encodeURIComponent(`${payload.message}\n\n${payload.name} (${payload.email})`);
        await Linking.openURL(`mailto:${Brand.supportEmail}?subject=${subject}&body=${body}`);
      }
    } catch (err) {
      Alert.alert("Could not send", err instanceof Error ? err.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container>
      <Header title="Contact" />
      <View style={{ paddingHorizontal: Spacing.three }}>
        <ThemedText type="large">Get in touch</ThemedText>
        <ThemedText themeColor="textSecondary" style={{ marginTop: Spacing.two }}>
          Questions about the competition or a booking? Send us a message.
        </ThemedText>

        <Card style={{ paddingVertical: 0, marginTop: Spacing.three }}>
          <ListRow icon="call-outline" title="Call us" subtitle={Brand.supportPhone} onPress={() => Linking.openURL(`tel:${Brand.supportPhone.replace(/\s/g, "")}`).catch(() => {})} />
          <ListRow icon="mail-outline" title="Email us" subtitle={Brand.supportEmail} onPress={() => Linking.openURL(`mailto:${Brand.supportEmail}`).catch(() => {})} last />
        </Card>

        <View style={{ marginTop: Spacing.three }}>
          <Input label="Your name" placeholder="John Doe" icon="person-outline" value={name} onChangeText={setName} error={errors.name} autoCapitalize="words" />
          <Input label="Email" placeholder="john@example.com" icon="mail-outline" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
          <Input label="Message" placeholder="How can we help?" desc value={message} onChangeText={setMessage} error={errors.message} />
          <View style={{ marginTop: Spacing.three }}>
            <Button title="Send message" iconLeft="paper-plane-outline" loading={busy} onPress={send} />
          </View>
        </View>
      </View>
    </Container>
  );
}
