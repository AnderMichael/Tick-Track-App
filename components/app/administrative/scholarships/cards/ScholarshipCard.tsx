import { SkeletonBox } from "@/components/common";
import { Scholarship } from "@/interfaces/administrative";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ScholarshipCard = ({
  scholarship,
  isLoading,
  onPressDelete,
  onPressEdit,
  onPressPercentages,
}: {
  scholarship?: Scholarship;
  isLoading?: boolean;
  onPressDelete: (scholarship_id: number) => void;
  onPressEdit: (scholarship_id: number) => void;
  onPressPercentages: (scholarship_id: number) => void;
}) => {
  if (isLoading || !scholarship) {
    return <SkeletonBox className="bg-gray-600 rounded-2xl h-32" />;
  }

  const { id, name, description } = scholarship;

  return (
    <View className="flex-row bg-black rounded-2xl p-5 justify-between">
      <View className="flex-1 pr-3">
        <Text className="text-white font-outfit-bold text-base mb-2">
          {name}
        </Text>
        <Text className="text-white font-outfit-regular text-sm">
          {description}
        </Text>
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
        <TouchableOpacity
          className="flex bg-zinc-400 rounded-full p-3 items-center justify-center"
          onPress={() => onPressPercentages(id)}
        >
          <MaterialIcons name="percent" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScholarshipCard;
