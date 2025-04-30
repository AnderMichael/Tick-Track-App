import { Text, TouchableOpacity, View } from "react-native";

export default function HomeCategories() {
    return (
        <View className="">
            <Text className="font-outfit-bold text-lg mb-3">Categorías de Información</Text>
            <TouchableOpacity className="bg-black rounded-2xl p-4 h-28">
                <Text className="text-white font-outfit-medium">Trabajo Becario</Text>
            </TouchableOpacity>
        </View>
    );
}