import { ProcessingModal, Screen, Sheet } from "@/components/common";
import { useSemester } from "@/context/home";
import { useCommitmentInfoQuery } from "@/store/api/app";
import { Text } from "react-native";

export default function ScholarshipScreen() {
    const { inscription } = useSemester();
    const { isLoading, isError, data: commitment, refetch } = useCommitmentInfoQuery({ commitment_id: inscription!!.commitment_id });

    if (isLoading) return <ProcessingModal visible={isLoading} />;
    if (isError || !commitment) return <Text>Error</Text>;

    const { service_details } = commitment;
    const { scholarship } = service_details;
    return (
        <Screen>
            <Screen.Section>
                <Sheet>
                    <Sheet.Title>{scholarship.name}</Sheet.Title>

                    <Sheet.Field>
                        <Sheet.Value>Descripción</Sheet.Value>
                    </Sheet.Field>

                    <Sheet.Field>
                        <Sheet.Name>{scholarship.description}</Sheet.Name>
                    </Sheet.Field>

                    <Sheet.Field>
                        <Sheet.Name>Porcentaje</Sheet.Name>
                        <Sheet.Value>{service_details.percentage * 100} %</Sheet.Value>
                    </Sheet.Field>
                </Sheet>
            </Screen.Section>
        </Screen>
    );
}
