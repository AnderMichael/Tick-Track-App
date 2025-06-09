import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  nroSemester: number;
  year: number;
}

export default function CreateSemesterButton({ nroSemester, year }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(protected)/administrative/semesters/create",
      params: { nroSemester, year },
    });
  };

  return (
    <TouchableOpacity
      className="flex flex-row bg-black py-2 px-4 mx-5 rounded-xl items-center justify-around w-1/2"
      onPress={handlePress}
    >
      <Ionicons name="add" size={24} color="white" />
      <Text className="text-center text-sm text-white font-outfit-bold">
        Crear Semestre
      </Text>
    </TouchableOpacity>
  );
}
