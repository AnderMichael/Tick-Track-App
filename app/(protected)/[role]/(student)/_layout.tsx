import { Stack } from "expo-router";

export default function StudentLayout() {
    return (
        <Stack>
            <Stack.Screen name="qrcode" options={{
                headerShown: true,
                headerBackVisible: true,
                headerTransparent: true,
                headerTitle: "Cobrar Horas",
                headerTitleStyle: {
                    fontFamily: "Outfit_600SemiBold",
                    fontSize: 20,
                },
            }} />
            <Stack.Screen name="scholarship" options={{
                headerShown: true,
                headerBackVisible: true,
                headerTransparent: true,
                headerTitle: "Sobre Tu Beca",
                headerTitleStyle: {
                    fontFamily: "Outfit_600SemiBold",
                    fontSize: 20,
                },
            }} />
        </Stack>
    );
}