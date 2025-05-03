import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentLayout() {
    return (
        <Stack>
            <Stack.Screen name="qrcode" options={{
                headerTransparent: true,
                header: () => <CustomHeader title="Cobrar Horas" />,
            }} />
            <Stack.Screen name="scholarship" options={{
                headerTransparent: true,
                header: () => <CustomHeader title="Sobre Tu Beca" />,
            }} />
            <Stack.Screen name="transactions" options={{
                headerShown: false,
            }} />
        </Stack>
    );
}