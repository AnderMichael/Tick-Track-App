import { Screen } from "@/components/common";
import { Scholarship } from "@/interfaces/administrative";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { ScholarshipCard } from "../cards";

interface Props {
  scholarships: Scholarship[];
  isLoading?: boolean;
  refetch?: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onPressPercentages: (id: number) => void;
}

const ScholarshipList = ({
  scholarships,
  isLoading = false,
  refetch,
  onEdit,
  onDelete,
  onPressPercentages,
}: Props) => {
  const renderItem: ListRenderItem<Scholarship> = useCallback(
    ({ item }) => (
      <ScholarshipCard
        scholarship={item}
        onPressEdit={onEdit}
        onPressDelete={onDelete}
        onPressPercentages={onPressPercentages}
      />
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        {[...Array(5)].map((_, index) => (
          <View key={index} className="mb-2">
            <ScholarshipCard
              isLoading
              onPressEdit={onEdit}
              onPressDelete={onDelete}
              onPressPercentages={onPressPercentages}
            />
          </View>
        ))}
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={scholarships}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          No se encontraron becas registradas.
        </Text>
      }
    />
  );
};

export default ScholarshipList;
