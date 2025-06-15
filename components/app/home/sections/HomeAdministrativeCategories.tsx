import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useSemester } from "@/context/home";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeAdministrativeCategories() {
    const { semester } = useSemester();
    const router = useRouter();

    if (!semester) {
        return <></>
    }

    return <>
        <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
            <Screen.Title>Categorías de Información</Screen.Title>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => { router.push("/(protected)/administrative/works") }}>
                <Text className="text-white font-outfit-medium">Trabajos</Text>
                <View className="absolute bottom-[-30] right-0 opacity-25">
                    <MaterialIcons name="work" color="white" size={120} />
                </View>
            </TouchableOpacity>
        </WithRole>
        <WithRole allowed={[Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                <Text className="text-white font-outfit-medium">Estudiantes</Text>
                <View className="absolute bottom-[-30] right-0 opacity-25">
                    <MaterialIcons name="school" color="white" size={120} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => { router.push("/(protected)/administrative/supervisors") }}>
                <Text className="text-white font-outfit-medium">Supervisores</Text>
                <View className="absolute bottom-[-30] right-0 opacity-25">
                    <Ionicons name="eye" color="white" size={120} />
                </View>
            </TouchableOpacity>
        </WithRole>
        <WithRole allowed={[Role.ADMIN]}>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                <Text className="text-white font-outfit-medium">Encargados</Text>
                <View className="absolute bottom-[-30] right-0 opacity-25">
                    <MaterialIcons name="shield" color="white" size={120} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => { router.push("/(protected)/administrative/semesters") }}>
                <Text className="text-white font-outfit-medium">Semestres</Text>
                <View className="absolute bottom-[-30] right-0 opacity-25">
                    <MaterialIcons name="punch-clock" color="white" size={120} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => { router.push("/(protected)/administrative/scholarships") }}>
                <Text className="text-white font-outfit-medium">Becas</Text>
                <View className="absolute bottom-[-30] right-0 opacity-25">
                    <Ionicons name="ticket" color="white" size={120} />
                </View>
            </TouchableOpacity>
        </WithRole>
    </>
}