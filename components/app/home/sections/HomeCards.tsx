import { View, Text } from "react-native";

export default function HomeCards() {
  return (
    <View className="">
      <Text className="font-outfit-bold text-lg mb-3">Tracks</Text>
      <View className="flex-row justify-between mb-3">
        <View className="bg-gray-200 rounded-2xl p-4 flex-1 mr-2">
          <Text className="text-xl font-outfit-bold">12.00 hrs</Text>
          <Text className="font-outfit-regular mt-2">Completo</Text>
        </View>
        <View className="bg-gray-200 rounded-2xl p-4 flex-1 ml-2">
          <Text className="text-xl font-outfit-bold">48.00 hrs</Text>
          <Text className="font-outfit-regular mt-2">Faltante</Text>
        </View>
      </View>
      <View className="bg-gray-200 rounded-2xl p-4">
        <Text className="text-xl font-outfit-bold">60.00 hrs</Text>
        <Text className="font-outfit-regular mt-2">Total</Text>
      </View>
    </View>
  );
}