import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { Text, View } from "react-native";

export default function HomeCards() {
  return (
    <Screen.Section>
      <Screen.Title>Tracks</Screen.Title>
      <WithRole allowed={[Role.STUDENT]}>
        <View className="flex-row justify-between">
          <View className="bg-gray-200 rounded-2xl p-4 flex-1 mr-2">
            <Text className="text-xl font-outfit-bold">12.00 hrs</Text>
            <Text className="text-right font-outfit-regular mt-5">Completo</Text>
          </View>
          <View className="bg-gray-200 rounded-2xl p-4 flex-1 ml-2">
            <Text className="text-xl font-outfit-bold">48.00 hrs</Text>
            <Text className="text-right font-outfit-regular mt-5">Faltante</Text>
          </View>
        </View>
        <View className="bg-gray-200 rounded-2xl p-4">
          <Text className="text-xl font-outfit-bold">60.00 hrs</Text>
          <Text className="text-right font-outfit-regular mt-5">Total</Text>
        </View>
      </WithRole>
      <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
        <View className="flex-row justify-between">
          <View className="bg-gray-200 rounded-2xl p-4 flex-1 mr-2">
            <Text className="text-xl font-outfit-bold">12 Trab.</Text>
            <Text className="text-right font-outfit-regular mt-5">Abiertos</Text>
          </View>
          <View className="bg-gray-200 rounded-2xl p-4 flex-1 ml-2">
            <Text className="text-xl font-outfit-bold">48 Trab.</Text>
            <Text className="text-right font-outfit-regular mt-5">Cerrados</Text>
          </View>
        </View>
        <View className="bg-gray-200 rounded-2xl p-4">
          <Text className="text-xl font-outfit-bold">48 Trab.</Text>
          <Text className="text-right font-outfit-regular mt-5">Total</Text>
        </View>
      </WithRole>
    </Screen.Section>
  );
}