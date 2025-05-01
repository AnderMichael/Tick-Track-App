import { Screen, Sheet } from "@/components/common";
import { useSession } from "@/hooks/common/useSession";
import { useRouter } from "expo-router";

export default function ScholarshipScreen() {
    const { user } = useSession();
    const router = useRouter();

    return (
        <Screen>
            <Screen.Section>
                <Sheet>
                    <Sheet.Title>Beca Convenio</Sheet.Title>

                    <Sheet.Field>
                        <Sheet.Name>Porcentaje</Sheet.Name>
                        <Sheet.Value>100%</Sheet.Value>
                    </Sheet.Field>

                    <Sheet.Field>
                        <Sheet.Name>Semestre</Sheet.Name>
                        <Sheet.Value>1</Sheet.Value>
                    </Sheet.Field>

                    <Sheet.Field>
                        <Sheet.Name>Fecha Inicio</Sheet.Name>
                        <Sheet.Value>1 Febrero 2021</Sheet.Value>
                    </Sheet.Field>

                    <Sheet.Field>
                        <Sheet.Name>Fecha Fin</Sheet.Name>
                        <Sheet.Value>30 Junio 2025</Sheet.Value>
                    </Sheet.Field>
                </Sheet>
            </Screen.Section>
        </Screen>
    );
}
