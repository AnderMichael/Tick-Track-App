import { SkeletonBox } from "@/components/common";
import { Percentage } from "@/interfaces/administrative";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PercentageCard = ({
  percentage,
  isLoading,
  onPressDelete,
  onPressEdit,
}: {
  percentage?: Percentage;
  isLoading?: boolean;
  onPressDelete: (id: number) => void;
  onPressEdit: (id: number) => void;
}) => {
  if (isLoading || !percentage) {
    return <SkeletonBox className="bg-gray-600 rounded-2xl h-28" />;
  }

  const { id, percentage: pct, hours_per_semester, total_hours } = percentage;

  return (
    <View className="flex-row bg-black rounded-2xl p-5 justify-between">
      <View className="flex-1 pr-3 gap-1">
        <Text className="text-white font-outfit-bold text-base">
          {pct * 100}% de Beca
        </Text>
        <Text className="text-white font-outfit-light text-sm">
          {hours_per_semester} horas por semestre
        </Text>
        <Text className="text-white font-outfit-light text-sm">
          {total_hours} horas totales
        </Text>
      </View>
      <View className="flex-col gap-4">
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

export default PercentageCard;
