import { AppPresentation } from "@/components/auth";
import { Button, ScreenContainer } from "@/components/common";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function WelcomeScreen() {

    const router = useRouter();

    const onStart = () => {
        router.push("/auth/login");
    }

    return (
        <ScreenContainer variant="center_between">
            <Text className="text-center text-3xl font-outfit-medium mt-10">
                La Banca Móvil de los{"\n"}UPBinos
            </Text>

            <View className="self-center">
                <AppPresentation />
            </View>

            <View className="w-full px-5 mb-5">
                <Button onPress={onStart}>
                    Empezar
                </Button>
            </View>
        </ScreenContainer>
    );
}
