import { CustomHeader } from "@/components/common";
import { WorkStateProvider } from "@/context/administrative";
import { Stack } from "expo-router";

export default function WorkLayout() {
  return (
    <WorkStateProvider>
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
        <Stack.Screen name="edit" options={{
          headerTransparent: true,
          header: () => <CustomHeader>
            <CustomHeader.Title>Editar Trabajo</CustomHeader.Title>
          </CustomHeader>,
        }} />
        <Stack.Screen name="scanQR" options={{
          headerTransparent: true,
          header: () => <CustomHeader>
            <CustomHeader.Title color="#FFFFFF">Escanear QR</CustomHeader.Title>
          </CustomHeader>,
        }} />
        <Stack.Screen name="payment-form" options={{
          headerTransparent: true,
          header: () => <CustomHeader>
            <CustomHeader.Title>Pagar QR</CustomHeader.Title>
          </CustomHeader>,
        }} />
      </Stack>
    </WorkStateProvider>
  )
}