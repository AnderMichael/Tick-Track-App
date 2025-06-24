import { CustomHeader } from "@/components/common";
import { CurrentStudentProvider } from "@/context/administrative";
import { Stack } from "expo-router";

export default function StudentLayout() {
  return (
    <CurrentStudentProvider>
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
        <Stack.Screen
          name="scholarship"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="inscriptions"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </CurrentStudentProvider>
  );
}
