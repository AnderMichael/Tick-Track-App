import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useSemester } from "@/context/home";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";

export default function HomeStudentCategories() {
  const { inscription } = useSemester();
  const router = useRouter();

  if (!inscription) {
    return <></>;
  }

  return (
    <>
      <Screen.Title>Categorías de Información</Screen.Title>
      <WithRole allowed={[Role.STUDENT]}>
        <TouchableOpacity
          className="bg-black rounded-2xl p-4 h-28"
          onPress={() => {
            router.push("/student/transactions");
          }}
        >
          <Text className="text-white font-outfit-medium">Transacciones</Text>
          <View className="absolute bottom-[-30] right-0 opacity-25">
            <MaterialIcons name="more-time" color="white" size={120} />
          </View>
        </TouchableOpacity>
      </WithRole>
    </>
  );
}
