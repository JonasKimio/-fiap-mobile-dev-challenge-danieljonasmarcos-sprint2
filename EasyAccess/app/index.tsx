import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EasyAccess</Text>
      <Text style={styles.subtitle}>Agende e reserve a sala de festas</Text>

      <View style={styles.buttons}>
        <Button title="Nova Reserva" onPress={() => router.push("/form")} />
      </View>

      <View style={styles.buttons}>
        <Button title="Minhas Reservas" onPress={() => router.push("/lista")} />
      </View>

      <View style={styles.buttons}>
        <Button title="Sobre" onPress={() => router.push("/sobre")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#ffffffff" },
  title: { fontSize: 32, fontWeight: "700", color: "#000000ff", marginBottom: 8 },
  subtitle: { color: "#000000ff", marginBottom: 20 },
  buttons: { width: "100%", marginVertical: 6 },
});
