import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function WorkTransactionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{
                headerTransparent: true,
                header: () => <CustomHeader title="Transacción" />,
            }} />
            <Stack.Screen name="index" options={{
                headerTransparent: true,
                header: () => <CustomHeader title="Transacciones" />,
            }} />
        </Stack>);
}