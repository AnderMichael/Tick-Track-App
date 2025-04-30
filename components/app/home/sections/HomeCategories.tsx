import { Screen } from "@/components/common";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeCategories() {
    return (
        <Screen.Section>
            <Screen.Title>Categorías de Información</Screen.Title>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                <Text className="text-white font-outfit-medium">Trabajo Becario</Text>
            </TouchableOpacity>
        </Screen.Section>
    );
}