import { Role } from "@/constants/common/roles";
import { ScholarshipOfficer } from "@/interfaces/administrative";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { ScholarshipOfficerCard } from "../cards";
import { Screen, WithRole } from "../containers";

interface Props {
  officers: ScholarshipOfficer[];
  isLoading?: boolean;
  refetch?: () => void;
}

const ScholarshipOfficersList = ({
  officers,
  isLoading = false,
  refetch,
}: Props) => {
  const renderItem: ListRenderItem<ScholarshipOfficer> = useCallback(
    ({ item: officer }) => (
      <ScholarshipOfficerCard officer_id={officer.upbCode}>
        <ScholarshipOfficerCard.Title>
          {officer.firstName} {officer.fatherLastName}
        </ScholarshipOfficerCard.Title>
        <ScholarshipOfficerCard.Email email={officer.email} />
        <WithRole allowed={[Role.ADMIN]}>
          <ScholarshipOfficerCard.Department department={officer.department} />
        </WithRole>
        <ScholarshipOfficerCard.Id id={`${officer.upbCode}`} />
        {!officer.isAvailable && (
          <View className="absolute bottom-[-30] right-0 opacity-25">
            <MaterialIcons name="lock" color="white" size={120} />
          </View>
        )}
      </ScholarshipOfficerCard>
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        <ScholarshipOfficerCard isLoading />
        <ScholarshipOfficerCard isLoading />
        <ScholarshipOfficerCard isLoading />
        <ScholarshipOfficerCard isLoading />
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={officers}
      keyExtractor={(item) => item.upbCode.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          No se encontraron encargados de becas
        </Text>
      }
    />
  );
};

export default ScholarshipOfficersList;
