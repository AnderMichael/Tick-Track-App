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
        header: () => <CustomHeader>
          <CustomHeader.Title>Trabajo</CustomHeader.Title>
        </CustomHeader>,
      }} />
      <Stack.Screen name="scanQR" options={{
        headerTransparent: true,
        header: () => <CustomHeader>
          <CustomHeader.Title>Escanear QR</CustomHeader.Title>
        </CustomHeader>,
      }} />
      <Stack.Screen name="payment-form" options={{
        headerTransparent: true,
        header: () => <CustomHeader>
          <CustomHeader.Title>Pagar QR</CustomHeader.Title>
        </CustomHeader>,
      }} />
    </Stack>
  )
}