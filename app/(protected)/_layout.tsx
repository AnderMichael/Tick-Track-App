import { SemesterProvider } from "@/context/home";
import { useSession } from "@/hooks";
import { Redirect, Slot, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) return <Redirect href="/auth/welcome" />;

  return (
    <SemesterProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerBackVisible: true,
            headerTransparent: true,
            headerTitle: "Perfil",
            headerTitleStyle: {
              fontFamily: "Outfit_600SemiBold",
              fontSize: 20,
            },
          }}
        />
      </Stack>
    </SemesterProvider>
  );
}
