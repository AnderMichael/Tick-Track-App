import { SkeletonBox } from "@/components/common";
import { formatDate } from "@/helpers/common";
import { Semester } from "@/interfaces/administrative";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SemesterCard = ({
  semester,
  isLoading,
  onPressEdit,
  onPressDelete,
  onPressCreate,
  placeholderCreate = "Crear Semestre",
}: {
  semester?: Semester;
  isLoading?: boolean;
  onPressDelete: (semester_id: number) => void;
  onPressEdit: (semester_id: number) => void;
  onPressCreate?: () => void;
  placeholderCreate?: string;
}) => {
  if (isLoading) {
    return <SkeletonBox className="bg-gray-600 rounded-2xl h-32" />;
  }

  if (!semester) {
    return (
      <TouchableOpacity
        className="flex-row bg-gray-500 rounded-2xl p-5 justify-center items-center h-32"
        onPress={onPressCreate}
      >
        <Text className="text-white font-outfit-bold text-base text-center">
          {placeholderCreate}
        </Text>
      </TouchableOpacity>
    );
  }

  const { id, name, start_date, end_date } = semester;

  return (
    <View className="flex-row bg-black rounded-2xl p-5 justify-between">
      <View className="flex-col">
        <Text className="text-white font-outfit-bold text-base mb-3">
          {name}
        </Text>
        <SemesterCard.Date label="Inicio" date={start_date} />
        <SemesterCard.Date label="Fin" date={end_date} />
      </View>
      <View className="flex-col gap-5">
        <TouchableOpacity
          className="flex bg-zinc-400 rounded-full p-3 items-center justify-center"
          onPress={() => onPressEdit(id)}
        >
          <MaterialIcons name="edit" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex bg-zinc-400 rounded-full p-3 items-center justify-center"
          onPress={() => onPressDelete(id)}
        >
          <MaterialIcons name="delete" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function SemesterCardDate({ label, date }: { label: string; date: string }) {
  return (
    <View className="flex-row items-center gap-2 mb-2">
      <MaterialCommunityIcons name="calendar" color="white" size={20} />
      <Text className="text-white font-outfit-bold text-sm">{label}</Text>
      <Text className="text-white font-outfit-regular text-sm">
        {formatDate(date)}
      </Text>
    </View>
  );
}

SemesterCard.Date = SemesterCardDate;

export default SemesterCard;
