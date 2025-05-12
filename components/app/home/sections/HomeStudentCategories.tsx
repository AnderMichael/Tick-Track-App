import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useSemester } from "@/context/home";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function HomeStudentCategories() {
    const { inscription } = useSemester();
    const router = useRouter();

    if (!inscription) {
        return <></>
    }

    return <>
        <Screen.Title>Categorías de Información</Screen.Title>
        <WithRole allowed={[Role.STUDENT]}>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28" onPress={() => { router.push("/student/transactions") }}>
                <Text className="text-white font-outfit-medium">Transacciones</Text>
            </TouchableOpacity>
        </WithRole>
    </>
}