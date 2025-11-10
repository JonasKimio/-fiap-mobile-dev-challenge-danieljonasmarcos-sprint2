import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert, Platform, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router"; 
import { carregarReservas, removerReserva, limparTodasReservas } from "../src/api"; 
import { Reserva } from "../src/types";

export default function List() {
  const router = useRouter();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await carregarReservas();
      setReservas(data);
    } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as reservas.");
        setReservas([]);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
        load();
        return () => {}; 
    }, [load])
  );

  const handleRemove = async (id: string) => {
    const performRemove = async () => {
      try {
        await removerReserva(id);
        load();
      } catch (error) {
        Alert.alert("Erro", "Não foi possível remover a reserva.");
      }
    };

    if (Platform.OS === "web") {
      const confirmDelete = window.confirm("Deseja realmente remover esta reserva?");
      if (confirmDelete) {
        performRemove();
      }
    } else {
      Alert.alert("Remover", "Deseja realmente remover esta reserva?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: performRemove,
        },
      ]);
    }
  };

  const handleClearAll = async () => {
    const performClearAll = async () => {
        try {
            await limparTodasReservas();
            load();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível apagar todas as reservas.");
        }
    };

    if (Platform.OS === "web") {
      const confirmDelete = window.confirm("Deseja apagar todas as reservas?");
      if (confirmDelete) {
        performClearAll();
      }
    } else {
      Alert.alert("Apagar tudo", "Deseja apagar todas as reservas?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: performClearAll,
        },
      ]);
    }
  };

  const renderItem = ({ item }: { item: Reserva }) => {
    const dataOriginal = item.data; 
    let dataFormatada = item.data;

    if (dataOriginal && dataOriginal.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const partes = dataOriginal.split('-');
      if (partes.length === 3) {
        dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`; 
      }
    }

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Nome: {item.nome}</Text>
        <Text style={styles.title}>Sala: {item.sala}</Text>
        <Text>
          {dataFormatada} — {item.inicio} às {item.fim}
        </Text>
        {item.descricao ? <Text style={{ marginTop: 6 }}>Obs: {item.descricao}</Text> : null}
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => router.push(`/form?id=${item.id}`)}
          >
              <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={[styles.actionButton, styles.removeButton]}
              onPress={() => handleRemove(item.id)}
          >
              <Text style={styles.buttonText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 12, marginLeft: 20, width: "10%" }}>
        <Button title="Voltar" onPress={() => router.push("/")} />
      </View>

      {isLoading ? (
        <Text style={styles.loading}>Carregando reservas...</Text>
      ) : reservas.length === 0 ? (
        <Text style={styles.empty}>Nenhuma reserva encontrada.</Text>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
        />
      )}

      <View style={{ marginTop: 12, marginBottom: 20 }}>
        <Button title="Apagar todas as reservas" color="#800000" onPress={handleClearAll} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#ffffffff" },
  empty: { color: "#000000ff", textAlign: "center", marginTop: 20 },
  loading: { color: "#000000ff", textAlign: "center", marginTop: 20, fontSize: 16 },
  card: { backgroundColor: "#bebebeff", padding: 12, borderRadius: 8, marginBottom: 10 },
  title: { color: "#000000ff", fontWeight: "700" },
  buttonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop: 10,
    gap: 10
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#007bff', 
  },
  removeButton: {
    backgroundColor: '#c00', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});