import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SkeletonBox } from "../boxes";

const StudentCard = ({
  children,
  isLoading,
  student_id,
  isLocked = false,
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
  student_id?: number;
  isLocked?: boolean;
}) => {
  const router = useRouter();

  const navigateToDetail = (id: number) => {
    router.push(`(protected)/administrative/students/${id}`);
  };

  if (isLoading || !student_id) {
    return <SkeletonBox className="bg-gray-600 rounded-2xl h-32" />;
  }

  return (
    <TouchableOpacity
      className="bg-black rounded-2xl p-5"
      onPress={() => navigateToDetail(student_id)}
      disabled={isLocked}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-1">{children}</View>
        {isLocked && (
          <MaterialCommunityIcons
            name="lock"
            size={22}
            color="white"
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

function StudentCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text className="text-white font-outfit-bold text-base mb-3">{children}</Text>
  );
}

function StudentCardEmail({ email }: { email: string }) {
  return (
    <View className="flex-row items-center gap-2 mb-1">
      <MaterialCommunityIcons name="email-outline" size={20} color="white" />
      <Text className="text-white font-outfit-regular text-sm">{email}</Text>
    </View>
  );
}

function StudentCardId({ id }: { id: string }) {
  return (
    <Text className="text-white font-outfit-regular text-sm">{id}</Text>
  );
}

function StudentCardDepartment({ department }: { department: string }) {
  return (
    <View className="flex-row items-center gap-2 mb-1">
      <MaterialCommunityIcons name="office-building" size={20} color="white" />
      <Text className="text-white font-outfit-regular text-sm">
        {department}
      </Text>
    </View>
  );
}

StudentCard.Title = StudentCardTitle;
StudentCard.Email = StudentCardEmail;
StudentCard.Id = StudentCardId;
StudentCard.Department = StudentCardDepartment;

export default StudentCard;
