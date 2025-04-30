import { Screen } from "@/components/common";
import { Text, View } from "react-native";

export default function HomeCards() {
  return (
    <Screen.Section>
      <Screen.Title>Tracks</Screen.Title>
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
    </Screen.Section>
  );
}