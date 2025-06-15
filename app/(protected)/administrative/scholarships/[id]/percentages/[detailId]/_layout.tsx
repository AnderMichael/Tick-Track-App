import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function PercentageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit"
        options={{
          headerTransparent: false,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Editar Porcentaje</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="delete"
        options={{
          headerTransparent: false,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Eliminar Porcentaje</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
