import { CustomHeader } from "@/components/common";
import { Slot, Stack } from "expo-router";

export default function StudentInscriptionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit"
        options={{
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Editar Inscripción</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
