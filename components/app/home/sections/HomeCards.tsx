import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useSemester } from "@/context/home";
import { Text, View } from "react-native";
import HomeHourCards from "./HomeHourCards";

export default function HomeCards() {
  const { inscription } = useSemester();
  return (
    <Screen.Section>
      <Screen.Title>Tracks</Screen.Title>
      <WithRole allowed={[Role.STUDENT]}>
        {inscription && <HomeHourCards />}
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