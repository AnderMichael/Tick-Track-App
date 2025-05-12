import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useSemester } from "@/context/home";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function HomeAdministrativeCategories() {
    const { semester } = useSemester();
    const router = useRouter();

    if (!semester) {
        return <></>
    }

    return <>
        <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
            <Screen.Title>Categorías de Información</Screen.Title>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => { router.push("/administrative/works") }}>
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
    </>
}