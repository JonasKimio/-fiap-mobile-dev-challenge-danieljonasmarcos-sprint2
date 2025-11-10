import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { salvarReserva, atualizarReserva, obterReservaPorId } from "../src/api"; 
import { Reserva } from "../src/types";

const formatarParaExibicao = (data: string): string => {
  if (!data || data.length !== 10) return data;
  const partes = data.split('-');
  return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
};

const formatarParaArmazenamento = (data: string): string => {
  if (!data || data.length !== 10) return '';
  const partes = data.split('/');
  return partes.length === 3 ? `${partes[2]}-${partes[1]}-${partes[0]}` : '';
};

export default function Form() {
  const { id: reservaId } = useLocalSearchParams();
  const isEditing = typeof reservaId === 'string' && reservaId.length > 0;

  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");
  const [dataInput, setDataInput] = useState(""); 
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [descricao, setDescricao] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const loadDataForEdit = async () => {
        setIsLoading(true);
        try {
          const reserva = await obterReservaPorId(reservaId); 
          if (reserva) {
            setNome(reserva.nome);
            setSala(reserva.sala);

            setDataInput(formatarParaExibicao(reserva.data));
            setInicio(reserva.inicio);
            setFim(reserva.fim);
            setDescricao(reserva.descricao || "");
          } else {
            Alert.alert("Erro", "Reserva não encontrada para edição.");
            router.push("/lista");
          }
        } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar os dados da reserva.");
        } finally {
          setIsLoading(false);
        }
      };
      loadDataForEdit();
    }
  }, [reservaId]);

  const handleSave = async () => {

    const dataParaArmazenamento = formatarParaArmazenamento(dataInput);
    
    if (!nome || !sala || !dataParaArmazenamento || !inicio || !fim) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios corretamente (incluindo a data no formato DD/MM/AAAA).");
      return;
    }

    setIsLoading(true);

    const reservaData = {
      nome,
      sala,
      data: dataParaArmazenamento, 
      inicio,
      fim,
      descricao,
    };
    
    try {
      if (isEditing) {
        const updatedReserva: Reserva = {
            id: reservaId, 
            ...reservaData
        }
        await atualizarReserva(updatedReserva);
        Alert.alert("Sucesso", "Reserva atualizada com sucesso!");
      } else {
        await salvarReserva(reservaData);
        Alert.alert("Sucesso", "Reserva salva com sucesso!");
      }

      router.push("/lista");

    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar a operação.");
      console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginTop: 12, width: "10%" }}>
        <Button title="Voltar" onPress={() => router.push("/lista")} />
      </View>
      <Text style={styles.headerTitle}>
        {isEditing ? "Editar Reserva" : "Nova Reserva"}
      </Text> 
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Seu nome" placeholderTextColor="#2c2c2cff" editable={!isLoading} />

      <Text style={styles.label}>Sala</Text>
      <TextInput style={styles.input} value={sala} onChangeText={setSala} placeholder="Sala que deseja reservar" placeholderTextColor="#2c2c2cff" editable={!isLoading} />

      <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
      <TextInput 
        style={styles.input} 
        value={dataInput} 
        onChangeText={setDataInput} 
        placeholder="15/10/2025" 
        placeholderTextColor="#2c2c2cff" 
        editable={!isLoading} 
      />

      <Text style={styles.label}>Horário de início</Text>
      <TextInput style={styles.input} value={inicio} onChangeText={setInicio} placeholder="18:00" placeholderTextColor="#2c2c2cff" editable={!isLoading} />

      <Text style={styles.label}>Horário de término</Text>
      <TextInput style={styles.input} value={fim} onChangeText={setFim} placeholder="23:00" placeholderTextColor="#2c2c2cff" editable={!isLoading} />

      <Text style={styles.label}>Descrição / Observações</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Aniversário, reunião..."
        multiline
        placeholderTextColor="#999"
        editable={!isLoading}
      />

      <View style={{ marginTop: 12, marginLeft: 20, marginRight: 20}}>
        <Button 
          title={isEditing ? (isLoading ? "Atualizando..." : "Salvar Alterações") : (isLoading ? "Salvando..." : "Salvar Reserva")} 
          onPress={handleSave} 
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#ffffffff", minHeight: "100%" },
  headerTitle: { color: "#000000ff", fontSize: 22, fontWeight: "bold", textAlign: 'center', marginBottom: 20 },
  label: { color: "#000000ff", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#b3b3b3ff", color: "#000000ff", padding: 10, borderRadius: 6 },
});