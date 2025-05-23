import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentLayout() {
    return (
        <Stack>
            <Stack.Screen name="qrcode" options={{
                headerTransparent: true,
                header: () => <CustomHeader>
                    <CustomHeader.Title>Cobrar Horas</CustomHeader.Title>
                </CustomHeader>,
            }} />
            <Stack.Screen name="scholarship" options={{
                headerTransparent: true,
                header: () => <CustomHeader>
                    <CustomHeader.Title>Sobre tu Beca</CustomHeader.Title>
                </CustomHeader>,
            }} />
            <Stack.Screen name="transactions" options={{
                headerShown: false,
            }} />
        </Stack>
    );
}