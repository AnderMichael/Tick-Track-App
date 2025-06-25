import { Role } from "@/constants/common/roles";
import { formatDate } from "@/helpers/common";
import { Work } from "@/interfaces/administrative";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import WorkCard from "../cards/WorkCard";
import { Screen, WithRole } from "../containers";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  works: Work[];
  isLoading?: boolean;
  refetch?: () => void;
}

const WorkList = ({ works, isLoading = false, refetch }: Props) => {
  const renderItem: ListRenderItem<Work> = useCallback(
    ({ item: work }) => (
      <WorkCard work_id={work.id}>
        <WorkCard.Title>{work.title}</WorkCard.Title>
        <WorkCard.Date date={formatDate(work.created_at)} />
        <WithRole allowed={[Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
          <WorkCard.Administrative name={work.administrative.name} />
        </WithRole>
        <WorkCard.Id id={`Nro Trabajo: ${work.id}`} />
        {!work.is_open && (
          <View className="absolute bottom-[-30] right-0 opacity-25">
            <MaterialIcons name="lock" color="white" size={120} />
          </View>
        )}
      </WorkCard>
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        <WorkCard isLoading />
        <WorkCard isLoading />
        <WorkCard isLoading />
        <WorkCard isLoading />
        <WorkCard isLoading />
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={works}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          Oops! Al parecer no cuentas con trabajos creados este semestre
        </Text>
      }
    />
  );
};

export default WorkList;
