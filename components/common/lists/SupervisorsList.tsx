import { Role } from "@/constants/common/roles";
import { Supervisor } from "@/interfaces/administrative";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SupervisorCard } from "../cards";
import { Screen, WithRole } from "../containers";

interface Props {
  supervisors: Supervisor[];
  isLoading?: boolean;
  refetch?: () => void;
}

const SupervisorsList = ({
  supervisors,
  isLoading = false,
  refetch,
}: Props) => {
  const renderItem: ListRenderItem<Supervisor> = useCallback(
    ({ item: supervisor }) => (
      <SupervisorCard supervisor_id={supervisor.upbCode}>
        <SupervisorCard.Title>
          {supervisor.firstName} {supervisor.fatherLastName}
        </SupervisorCard.Title>
        <SupervisorCard.Email email={supervisor.email} />
        <WithRole allowed={[Role.ADMIN]}>
          <SupervisorCard.Department department={supervisor.department} />
        </WithRole>
        <SupervisorCard.Id id={`${supervisor.upbCode}`} />
      </SupervisorCard>
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        <SupervisorCard isLoading />
        <SupervisorCard isLoading />
        <SupervisorCard isLoading />
        <SupervisorCard isLoading />
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={supervisors}
      keyExtractor={(item) => item.upbCode.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          No se encontraron supervisores
        </Text>
      }
    />
  );
};

export default SupervisorsList;
