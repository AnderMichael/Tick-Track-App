import { ProcessingModal, Screen, Sheet } from "@/components/common";
import { Commitment } from "@/interfaces/student";
import { useCommitmentsByStudentQuery } from "@/store/api/app";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

export default function ScholarshipsScreen() {
  const { student_id } = useLocalSearchParams<{ student_id: string }>();
  const router = useRouter();

  const numericStudentId = Number(student_id);
  const {
    isError,
    isLoading,
    data: commitments,
    refetch,
    isFetching,
  } = useCommitmentsByStudentQuery({ upbCode: numericStudentId });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const renderCommitment = useCallback(
    ({ item }: { item: Commitment }) => (
      <Sheet>
        <Sheet.Title>{item.scholarship}</Sheet.Title>

        <Sheet.Field>
          <Sheet.Name>Porcentaje</Sheet.Name>
          <Sheet.Value>{item.percentage * 100}%</Sheet.Value>
        </Sheet.Field>

        <Sheet.Field>
          <Sheet.Name>Horas por semestre</Sheet.Name>
          <Sheet.Value>{item.hoursPerSemester}</Sheet.Value>
        </Sheet.Field>

        <Sheet.Field>
          <Sheet.Name>Estado</Sheet.Name>
          <Sheet.Value>{item.isCurrent ? "Vigente" : "Anterior"}</Sheet.Value>
        </Sheet.Field>
      </Sheet>
    ),
    []
  );

  if (isLoading) return <ProcessingModal visible />;
  if (isError || !commitments)
    return (
      <Text className="font-outfit-regular">Error al obtener las becas</Text>
    );

  const goToCreateScholarship = () => {
    router.push(`/administrative/students/${student_id}/scholarship/create`);
  };

  return (
    <Screen>
      <FlatList
        data={commitments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCommitment}
        contentContainerClassName="px-5 py-4 gap-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
            tintColor="black"
          />
        }
        ListEmptyComponent={
          <Text className="font-outfit-regular text-center mt-5">
            No hay becas registradas.
          </Text>
        }
        ListFooterComponent={
          commitments.length < 3 ? (
            <TouchableOpacity
              className="bg-black rounded-2xl p-4 h-28 mt-4"
              onPress={goToCreateScholarship}
            >
              <Text className="text-white font-outfit-medium text-base">
                Añadir Beca
              </Text>
              <View className="absolute bottom-[-30] right-0 opacity-25">
                <Ionicons name="add-circle" color="white" size={120} />
              </View>
            </TouchableOpacity>
          ) : null
        }
      />
    </Screen>
  );
}
