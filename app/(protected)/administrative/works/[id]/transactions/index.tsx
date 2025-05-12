import { Screen, WorkTransactionsList } from "@/components/common";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function WorkTransactionsScreen() {
    const { id } = useLocalSearchParams();
    return (
        <Screen>
            <Screen.Section>
                <Screen.SubTitle>
                    Correspondientes al trabajo
                    <Text className="text-lg font-outfit-medium" style={{ color: 'black' }}>

                    </Text>
                </Screen.SubTitle>
            </Screen.Section>
            <WorkTransactionsList work_id={parseInt(id as string)} />
        </Screen>
    )
}