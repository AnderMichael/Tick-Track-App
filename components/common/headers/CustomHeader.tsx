import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props {
    title: string;
    showBack?: boolean;
};

export default function CustomHeader({ title, showBack = true }: Props) {
    const router = useRouter();

    return (
        <View className="flex-row items-center gap-10 px-4 py-4 bg-transparent">
            {showBack && (
                <Pressable onPress={() => router.back()} className="p-1">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
            )}

            <Text className="text-2xl font-outfit-semibold text-black">{title}</Text>
        </View>
    );
}
