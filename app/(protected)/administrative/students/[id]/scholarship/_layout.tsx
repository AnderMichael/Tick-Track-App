import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentScholarshipLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Becas</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Añadir Beca</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
