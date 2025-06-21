import { CustomHeader } from "@/components/common";
import { CurrentWorkProvider } from "@/context/administrative";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function WorksLayout() {
  const router = useRouter();
  return (
    <CurrentWorkProvider>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerTransparent: true,
            header: () => (
              <CustomHeader>
                <CustomHeader.Title>Trabajos</CustomHeader.Title>
                <CustomHeader.Action
                  onPress={() =>
                    router.push("/(protected)/administrative/works/create")
                  }
                  icon={<Ionicons name="add" size={24} color="black" />}
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
                <CustomHeader.Title>Crear Trabajo</CustomHeader.Title>
              </CustomHeader>
            ),
          }}
        />
      </Stack>
    </CurrentWorkProvider>
  );
}
