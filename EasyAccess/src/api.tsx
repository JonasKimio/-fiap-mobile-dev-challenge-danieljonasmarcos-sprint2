import { Reserva } from "./types";

let bancoDeDados: Reserva[] = [];

export async function carregarReservas(): Promise<Reserva[]> {
  return bancoDeDados;
}

export async function obterReservaPorId(id: string): Promise<Reserva | undefined> {
  const reserva = bancoDeDados.find(r => r.id === id);
  return reserva;
}

export async function salvarReserva(novaReserva: Omit<Reserva, 'id'>): Promise<Reserva> {
  const reservaCriada: Reserva = {
    ...novaReserva,
    id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
  };
  bancoDeDados.push(reservaCriada);
  return reservaCriada;
}

export async function atualizarReserva(reservaAtualizada: Reserva): Promise<Reserva> {
  const indice = bancoDeDados.findIndex(r => r.id === reservaAtualizada.id);
  
  if (indice === -1) {
    throw new Error("Reserva não encontrada para atualização.");
  }
  
  bancoDeDados[indice] = reservaAtualizada;
  return reservaAtualizada;
}

export async function removerReserva(id: string): Promise<void> {
  bancoDeDados = bancoDeDados.filter(r => r.id !== id);
}

export async function limparTodasReservas(): Promise<void> {
  bancoDeDados = [];
}