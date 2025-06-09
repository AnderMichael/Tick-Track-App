import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function SemesterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Editar Semestre</CustomHeader.Title>
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
              <CustomHeader.Title>Eliminar Semestre</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  ); 
}
