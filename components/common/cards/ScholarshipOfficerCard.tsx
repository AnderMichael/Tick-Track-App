import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SkeletonBox } from "../boxes";

const ScholarshipOfficerCard = ({
  children,
  isLoading,
  officer_id,
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
  officer_id?: number;
}) => {
  const router = useRouter();

  const navigateToDetail = (id: number) => {
    router.push(`/(protected)/administrative/scholarship_officers/${id}`);
  };

  if (isLoading || !officer_id) {
    return <SkeletonBox className="bg-gray-600 rounded-2xl h-32" />;
  }

  return (
    <TouchableOpacity
      className="bg-black rounded-2xl p-5"
      onPress={() => navigateToDetail(officer_id)}
    >
      {children}
    </TouchableOpacity>
  );
};

function ScholarshipOfficerCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text className="text-white font-outfit-bold text-base mb-3">{children}</Text>
  );
}

function ScholarshipOfficerCardEmail({ email }: { email: string }) {
  return (
    <View className="flex-row items-center gap-2 mb-1">
      <MaterialCommunityIcons name="email-outline" size={20} color="white" />
      <Text className="text-white font-outfit-regular text-sm">{email}</Text>
    </View>
  );
}

function ScholarshipOfficerCardDepartment({ department }: { department: string }) {
  return (
    <View className="flex-row items-center gap-2 mb-1">
      <MaterialCommunityIcons name="office-building" size={20} color="white" />
      <Text className="text-white font-outfit-regular text-sm">
        {department}
      </Text>
    </View>
  );
}

function ScholarshipOfficerCardId({ id }: { id: string }) {
  return (
    <Text className="text-white font-outfit-regular text-sm">{id}</Text>
  );
}

ScholarshipOfficerCard.Title = ScholarshipOfficerCardTitle;
ScholarshipOfficerCard.Email = ScholarshipOfficerCardEmail;
ScholarshipOfficerCard.Department = ScholarshipOfficerCardDepartment;
ScholarshipOfficerCard.Id = ScholarshipOfficerCardId;

export default ScholarshipOfficerCard;
