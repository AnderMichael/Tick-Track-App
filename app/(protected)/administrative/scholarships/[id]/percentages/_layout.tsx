import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function PercentagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[detailId]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: false,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Porcentajes</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTransparent: false,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Crear Porcentaje</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
