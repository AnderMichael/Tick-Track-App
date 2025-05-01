import { WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function HomeActions() {
    return (
        <WithRole allowed={[Role.STUDENT]}>
            <View className="flex-row justify-between">
                <Pressable className="items-center flex-1">
                    <View className="w-16 h-16 bg-gray-200 rounded-full justify-center items-center mb-2">
                        <MaterialIcons name="qr-code" size={28} color="black" />
                    </View>
                    <Text className="font-outfit-medium">Cobrar Horas</Text>
                </Pressable>

                <Pressable className="items-center flex-1">
                    <View className="w-16 h-16 bg-gray-200 rounded-full justify-center items-center mb-2">
                        <Ionicons name="information" size={28} color="black" />
                    </View>
                    <Text className="font-outfit-medium">Sobre tu Beca</Text>
                </Pressable>
            </View>
        </WithRole>
    );
}
