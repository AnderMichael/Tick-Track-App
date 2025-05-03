import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function HomeCategories() {
    const router = useRouter();
    return (
        <Screen.Section>
            <Screen.Title>Categorías de Información</Screen.Title>
            <WithRole allowed={[Role.STUDENT]}>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => {router.push("/student/transactions/list")}}>
                    <Text className="text-white font-outfit-medium">Transacciones</Text>
                </TouchableOpacity>
            </WithRole>
            <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                    <Text className="text-white font-outfit-medium">Trabajos</Text>
                </TouchableOpacity>
            </WithRole>
            <WithRole allowed={[Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                    <Text className="text-white font-outfit-medium">Estudiantes</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                    <Text className="text-white font-outfit-medium">Supervisores</Text>
                </TouchableOpacity>
            </WithRole>
            <WithRole allowed={[Role.ADMIN]}>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                    <Text className="text-white font-outfit-medium">Encargados</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                    <Text className="text-white font-outfit-medium">Semestres</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                    <Text className="text-white font-outfit-medium">Becas</Text>
                </TouchableOpacity>
            </WithRole>
        </Screen.Section>
    );
}