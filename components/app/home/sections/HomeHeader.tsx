import { Screen } from "@/components/common";
import { useSession } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeHeader() {
    const router = useRouter();
    const { user } = useSession();
    return (
        <Screen.Section>
            <View className="flex-row justify-between items-center mt-4">
                <View>
                    <Text className="text-xl font-outfit-bold">Bienvenid@!</Text>
                    <Text className="text-lg font-outfit-medium">{user?.fullName}</Text>
                </View>
                <TouchableOpacity className="p-4 rounded-full bg-gray-200 justify-center items-center" onPress={() => router.push("/profile")}>
                    <Ionicons name="person" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* <Pressable className="border border-black rounded-xl py-3 px-4 flex-row justify-between items-center">
                <Text className="font-outfit-regular">Semestre I - 2025</Text>
                <Ionicons name="chevron-down" size={20} color="black" />
            </Pressable> */}
        </Screen.Section>
    );
}
