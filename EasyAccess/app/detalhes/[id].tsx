import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export type Contato = {
  id: number;
  nome: string;
  rm: string;
  github: string;
  linkedin: string;
  email: string;
};

export const listaContato: Contato[] = [
  {
    id: 1,
    nome: "Jonas Kimio Isiki",
    rm: "560560",
    github: "https://github.com/JonasKimio",
    linkedin: "https://www.linkedin.com/in/jonaskimio",
    email: "mailto:rm560560@fiap.com.br",
  },
  {
    id: 2,
    nome: "Daniel Kendi Saijo Araki",
    rm: "553043",
    github: "https://github.com/DanKendi",
    linkedin: "https://www.linkedin.com/in/daniel-kendi-saijo-araki/",
    email: "mailto:rm553043@fiap.com.br",
  },
  {
    id: 3,
    nome: "Marcos Vinicius Alves Marques",
    rm: "560475",
    github: "https://github.com/M4rkitos",
    linkedin: "https://www.linkedin.com/in/marcos-vin%C3%ADcius-marques-9a5284264/",
    email: "mailto:rm560475@fiap.com.br",
  },
];

export default function DetalhesIntegrante() { 
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const contato = listaContato.find((item) => item.id === Number(id));

  if (!contato) {
    return (
      <View style={styles.container}>
        <Text style={styles.naoencontrado}>Contato não encontrado.</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginTop: 12, width: "10%" }}>
        <Button title="Voltar" onPress={() => router.push("/sobre")} /> 
      </View>
      <Text style={styles.nome}>{contato.nome}</Text>
      <Text style={styles.rm}>RM: {contato.rm}</Text>

      <View style={styles.links}>
        <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL(contato.github)}>
          <Text style={styles.textoBotao}>GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: "#0077b5" }]} onPress={() => Linking.openURL(contato.linkedin)}>
          <Text style={styles.textoBotao}>LinkedIn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: "#34a853" }]} onPress={() => Linking.openURL(contato.email)}>
          <Text style={styles.textoBotao}>E-mail</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffffff",
    padding: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000ff",
    marginTop: 20,
    textAlign: "center",
  },
  rm: {
    fontSize: 16,
    color: "#575757ff",
    textAlign: "center",
    marginBottom: 20,
  },
  links: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  botao: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 6,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoVoltar: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginTop: 20,
  },
  naoencontrado: {
    color: "#000000", 
    fontSize: 18,
    marginBottom: 20,
  },
});