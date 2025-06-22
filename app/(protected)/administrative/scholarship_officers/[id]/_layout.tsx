import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function ScholarshipOfficerDetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Encargado de Becas</CustomHeader.Title>
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
              <CustomHeader.Title>Editar Encargado de Becas</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
