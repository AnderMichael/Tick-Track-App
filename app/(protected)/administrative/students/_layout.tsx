import { CustomHeader } from "@/components/common";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function StudentsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Estudiantes</CustomHeader.Title>
              <CustomHeader.Action
                icon={<Ionicons name="add" size={24} color="black" />}
                onPress={() =>
                  router.push("/(protected)/administrative/students/create")
                }
              />
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          header: () => (
            <CustomHeader>
              <CustomHeader.Title>Crear Estudiante</CustomHeader.Title>
            </CustomHeader>
          ),
        }}
      />
    </Stack>
  );
}
