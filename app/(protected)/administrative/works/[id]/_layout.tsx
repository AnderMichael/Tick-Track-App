import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function WorkLayout() {
  return (
    <Stack>
      <Stack.Screen name="transactions" options={{
        headerShown: false,
      }} />
      <Stack.Screen name="index" options={{
        headerTransparent: true,
        header: () => <CustomHeader title="Trabajo" />,
      }} />
      <Stack.Screen name="scanQR" options={{
        headerTransparent: true,
        header: () => <CustomHeader title="Escanear QR" />,
      }} />
      <Stack.Screen name="payment-form" options={{
        headerTransparent: true,
        header: () => <CustomHeader title="Pagar Horas" />,
      }} />
    </Stack>
  )
}