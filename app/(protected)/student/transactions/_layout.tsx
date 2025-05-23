import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentTransactionsLayout() {
    return <Stack>
        <Stack.Screen name="index" options={{
            headerTransparent: true,
            header: () => <CustomHeader>
                <CustomHeader.Title>Transacciones</CustomHeader.Title>
            </CustomHeader>,
        }} />
        <Stack.Screen name="[id]" options={{
            headerTransparent: true,
            header: () => <CustomHeader>
                <CustomHeader.Title>Transacción</CustomHeader.Title>
            </CustomHeader>,
        }} />
    </Stack>;
}