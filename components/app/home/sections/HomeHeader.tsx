import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function HomeHeader() {
    return (
        <View style={{ rowGap: 20 }}>
            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-xl font-outfit-bold">Bienvenid@!</Text>
                    <Text className="text-lg font-outfit-medium">Ander</Text>
                </View>
                <TouchableOpacity className= "p-3 rounded-full bg-gray-200 justify-center items-center">
                    <Ionicons name="person" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Pressable className="border border-black rounded-xl py-3 px-4 flex-row justify-between items-center">
                <Text className="font-outfit-regular">Semestre I - 2025</Text>
                <Ionicons name="chevron-down" size={20} color="black" />
            </Pressable>
        </View>
    );
}
