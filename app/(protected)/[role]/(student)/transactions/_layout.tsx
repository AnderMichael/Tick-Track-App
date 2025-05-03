import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function StudentTransactionsLayout() {
    return <Stack>
        <Stack.Screen name="list" options={{
            headerTransparent: true,
            header: () => <CustomHeader title="Transacciones" />,
        }} />
        <Stack.Screen name="[id]" options={{
            headerTransparent: true,
            header: () => <CustomHeader title="Transacción" />,
        }} />
    </Stack>;
}