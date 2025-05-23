import { Screen, WorkTransactionsList } from "@/components/common";
import { useWork } from "@/context/administrative";
import { Text } from "react-native";

export default function WorkTransactionsScreen() {
    const { work } = useWork();

    return (
        <Screen>
            <Screen.Section>
                <Screen.SubTitle>
                    Correspondientes al trabajo {' '}
                    <Text className="text-lg font-outfit-semibold" style={{ color: 'black' }}>
                        "{work!.title}"
                    </Text>
                </Screen.SubTitle>
            </Screen.Section>
            <WorkTransactionsList work_id={work!.id} />
        </Screen>
    )
}