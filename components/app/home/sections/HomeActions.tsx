import { WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { ActionButton } from "../buttons";
import { useSemester } from "@/context/home";

export default function HomeActions() {
    const router = useRouter();

    const { inscription } = useSemester();
    if (!inscription) {
        return <></>;
    }

    return (
        <WithRole allowed={[Role.STUDENT]}>
            <View className="flex flex-row justify-center gap-16">
                <ActionButton onPress={() => router.push("/student/qrcode")}>
                    <ActionButton.Icon name="qr-code" size={28} />
                    <ActionButton.Title>Cobrar Horas</ActionButton.Title>
                </ActionButton>
                <ActionButton onPress={() => router.push("/student/scholarship")}>
                    <ActionButton.Icon name="info" size={28} />
                    <ActionButton.Title>Sobre Tu Beca</ActionButton.Title>
                </ActionButton>
            </View>
        </WithRole>
    );
}
