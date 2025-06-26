import { SkeletonBox } from "@/components/common";
import { formatDate } from "@/helpers/common";
import { Semester } from "@/interfaces/administrative";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface InscriptionCardProps {
  semester?: Semester;
  isLoading?: boolean;
  isCompleted?: boolean;
  onPressView: (semester_id: number) => void;
  onPressCreate?: () => void;
  placeholderCreate?: string;
}

const InscriptionCard = ({
  semester,
  isLoading,
  isCompleted = false,
  onPressView,
  onPressCreate,
  placeholderCreate = "Inscribirse a nuevo semestre",
}: InscriptionCardProps) => {
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
    <TouchableOpacity
      className="flex-row bg-black rounded-2xl p-5 justify-between"
      onPress={() => onPressView(id)}
    >
      <View className="flex-col">
        <Text className="text-white font-outfit-bold text-base mb-3">
          Inscrito en {name}
        </Text>
        <InscriptionCard.Date label="Inicio" date={start_date} />
        <InscriptionCard.Date label="Fin" date={end_date} />
        {isCompleted && (
          <View className="mt-2 bg-green-700 rounded-full px-3 py-1 self-start">
            <Text className="text-white font-outfit-medium text-xs">
              Inscripción completada
            </Text>
          </View>
        )}
      </View>
      <View className="flex-col justify-center">
        <MaterialIcons name="arrow-forward-ios" color="white" size={20} />
      </View>
    </TouchableOpacity>
  );
};

function InscriptionCardDate({ label, date }: { label: string; date: string }) {
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

InscriptionCard.Date = InscriptionCardDate;

export default InscriptionCard;
