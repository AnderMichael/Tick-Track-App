import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentInscriptionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit"
        options={{
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Inscripción</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
