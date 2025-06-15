import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function ScholarshipLayout() {
  return (
    <Stack>
      <Stack.Screen name="percentages" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Editar Beca</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="delete"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Eliminar Beca</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
