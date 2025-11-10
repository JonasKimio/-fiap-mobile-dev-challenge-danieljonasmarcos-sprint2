import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type Integrante = {
  id: string;
  nome: string;
  rm: string;
};

const integrantes: Integrante[] = [
  {
    id: "1",
    nome: "Jonas Kimio Isiki",
    rm: "560560",
  },
  {
    id: "2",
    nome: "Daniel Kendi Saijo Araki",
    rm: "553043",
  },
  {
    id: "3",
    nome: "Marcos Vinicius Alves Marques",
    rm: "560475",
  },
];

export default function About() {
  const router = useRouter();

  return (
    <View style={styles.container}>
            <View style={{ marginTop: 12, width: "10%" }}>
              <Button title="Voltar" onPress={() => router.push("/")} />
            </View>
      <Text style={styles.title}>Integrantes do Projeto</Text>
      <FlatList
        data={integrantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.rm}>RM: {item.rm}</Text>
            </View>
            <Button
              title="Ver Detalhes"
              onPress={() => router.push(`/detalhes/${item.id}`)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 16,
  },
  title: {
    color: "#000000ff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#bebebeff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  rm: {
    fontSize: 14,
    color: "#555",
  },
});
