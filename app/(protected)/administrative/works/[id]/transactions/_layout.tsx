import { CustomHeader } from "@/components/common";
import { TransactionStateProvider } from "@/context/administrative";
import { useStateOperation } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function WorkTransactionsLayout() {
    const transactionOperations = useStateOperation();

    return (
        <TransactionStateProvider {...transactionOperations}>
            <Stack>
                <Stack.Screen name="[id]" options={{
                    headerTransparent: true,
                    header: () => <CustomHeader>
                        <CustomHeader.Title>Transacción</CustomHeader.Title>
                        <CustomHeader.Action icon={<Ionicons name="trash" size={24} color="black" />} onPress={transactionOperations.openDeleteModal} />
                    </CustomHeader>,
                }} />
                <Stack.Screen name="index" options={{
                    headerTransparent: true,
                    header: () => <CustomHeader>
                        <CustomHeader.Title>Transacciones</CustomHeader.Title>
                    </CustomHeader>,
                }} />
            </Stack>
        </TransactionStateProvider>
    );
}