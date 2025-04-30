import { ReadonlyField } from "@/components/app";
import { Button, Screen } from "@/components/common";
import { roleDefinition } from "@/helpers/common/roleDefinition";
import { useSession } from "@/hooks";
import { deleteToken } from "@/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const ProfileScreen = () => {
    const router = useRouter();
    const { user, logout } = useSession();

    const handleLogout = async () => {
        await deleteToken();
        logout();
        router.replace("/auth/welcome");
    };

    return (
        <Screen>
            {/* Avatar + Rol */}
            <ScrollView contentContainerStyle={{ gap: 10, paddingVertical: 10 }}>
                <Screen.Section>
                    <View className="items-center mb-6">
                        <View className="w-24 h-24 bg-gray-300 rounded-full justify-center items-center">
                            <Ionicons name="person" size={36} color="black" />
                        </View>
                        <Text className="mt-4 font-outfit-medium text-lg">
                            {roleDefinition(user?.role ?? "user")}
                        </Text>
                    </View>
                </Screen.Section>
                {/* Campos */}
                <Screen.Section>
                    <ReadonlyField label="Nombre Completo">
                        <Text className="font-outfit-regular">{user?.fullName}</Text>
                    </ReadonlyField>

                    <ReadonlyField label="Código UPB">
                        <Text className="font-outfit-regular">{user?.upbCode}</Text>
                    </ReadonlyField>

                    <ReadonlyField label="Departamento">
                        <Text className="font-outfit-regular">{user?.department}</Text>
                    </ReadonlyField>

                    <ReadonlyField label="Email">
                        <Text className="font-outfit-regular">{user?.email}</Text>
                    </ReadonlyField>

                    <ReadonlyField label="Teléfono">
                        <Text className="font-outfit-regular">{user?.email}</Text>
                    </ReadonlyField>

                </Screen.Section>
            </ScrollView>
            {/* Botón cerrar sesión */}
            <View className="w-full px-5 mb-5" style={{ elevation: 5 }}>
                <Button onPress={handleLogout}>
                    Cerrar Sesión
                </Button>
            </View>

        </Screen>
    );
}

export default ProfileScreen;