import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "EasyAccess" }} />
        <Stack.Screen name="form" options={{ title: "Nova Reserva" }} />
        <Stack.Screen name="lista" options={{ title: "Minhas Reservas" }} />
        <Stack.Screen name="sobre" options={{ headerShown: false }} /> 
      </Stack>
    </>
  );
}