import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Estudiante</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Editar Estudiante</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
