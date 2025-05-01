import { Stack } from "expo-router";

export default function ProtectedLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="home" />
            <Stack.Screen name="profile" options={{
                headerShown: true,
                headerBackVisible: true,
                headerTransparent: true,
                headerTitle: "Perfil",
                headerTitleStyle: {
                    fontFamily: "Outfit_600SemiBold",
                    fontSize: 20,
                },
            }} />
        </Stack>
    );
}