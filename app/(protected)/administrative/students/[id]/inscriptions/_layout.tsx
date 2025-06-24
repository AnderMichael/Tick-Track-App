import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentInscriptionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Inscripciones</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Nueva Inscripción</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
