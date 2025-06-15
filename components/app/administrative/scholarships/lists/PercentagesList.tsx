import { Screen } from "@/components/common";
import { Percentage } from "@/interfaces/administrative";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { PercentageCard } from "../cards";

interface Props {
  percentages: Percentage[];
  isLoading?: boolean;
  refetch?: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

const PercentagesList = ({
  percentages,
  isLoading = false,
  refetch,
  onEdit,
  onDelete,
  onCreate,
}: Props) => {
  const renderItem: ListRenderItem<Percentage> = useCallback(
    ({ item }) => (
      <PercentageCard
        percentage={item}
        onPressEdit={onEdit}
        onPressDelete={onDelete}
      />
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        {[...Array(5)].map((_, index) => (
          <View key={index} className="mb-2">
            <PercentageCard
              isLoading
              onPressEdit={onEdit}
              onPressDelete={onDelete}
            />
          </View>
        ))}
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={percentages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          No se encontraron porcentajes registrados.
        </Text>
      }
      ListFooterComponent={
        <View className="mt-6">
          <Text
            onPress={onCreate}
            className="text-center text-base text-blue-600 font-outfit-medium"
          >
            + Agregar nuevo porcentaje
          </Text>
        </View>
      }
    />
  );
};

export default PercentagesList;
