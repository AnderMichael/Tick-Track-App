import { InscriptionCard, YearSelector } from "@/components/app/administrative";
import { ProcessingModal, Screen } from "@/components/common";
import { useCurrentStudent } from "@/context/administrative";
import { useInscriptions, useSemesters } from "@/hooks/app";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const InscriptionsScreen = () => {
  const today = new Date();
  const router = useRouter();
  const { id: student_id } = useLocalSearchParams<{ id: string }>();
  const [yearSelected, setYearSelected] = useState(today.getFullYear());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { student: currentStudent } = useCurrentStudent();

  const { semesters, isLoading, refetch } = useSemesters(yearSelected);

  const {
    inscriptions,
    isLoading: isLoadingInscriptions,
    refetch: refetchInscriptions,
  } = useInscriptions(yearSelected, currentStudent!.upbCode);

  useEffect(() => {
    refetch();
    refetchInscriptions();
    console.log("Refetching inscriptions:", inscriptions);
    console.log("Refetching semesters:", semesters);
  }, [yearSelected]);

  const handleView = (semesterId: number) => {
    const inscription = inscriptions.find((i) => i.semester.id === semesterId);
    if (!inscription) return;

    router.push({
      pathname:
        `(protected)/administrative/students/${student_id}/inscriptions/${inscription.id}/edit` as RelativePathString,
    });
  };

  const handleCreate = (semesterId: number) => {
    router.push({
      pathname:
        `(protected)/administrative/students/${student_id}/inscriptions/create` as RelativePathString,
      params: {
        semester_id: semesterId,
      },
    });
  };

  const isStudentEnrolledIn = (semesterId: number) => {
    return inscriptions?.some((i) => i.semester.id === semesterId);
  };

  return (
    <Screen>
      <ProcessingModal visible={isLoading || isLoadingInscriptions} />
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ gap: 25, paddingVertical: 15 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isLoadingInscriptions}
            onRefresh={() => {
              refetch();
              refetchInscriptions();
            }}
          />
        }
      >
        <YearSelector
          isModalVisible={isModalVisible}
          setYearSelected={setYearSelected}
          yearSelected={yearSelected}
          close={() => setIsModalVisible(false)}
          open={() => setIsModalVisible(true)}
        />

        <View className="flex flex-col gap-4 px-5">
          {semesters.length === 0 ? (
            <Text className="text-center text-black font-outfit-medium">
              No hay semestres disponibles para este año.
            </Text>
          ) : (
            semesters.map((semester) => {
              const enrolled = isStudentEnrolledIn(semester.id);

              return (
                <InscriptionCard
                  key={semester.id}
                  semester={enrolled ? semester : undefined}
                  isLoading={false}
                  onPressView={(semesterId) => handleView(semesterId)}
                  onPressCreate={() => handleCreate(semester.id)}
                  placeholderCreate={`Inscribir a ${semester.name}`}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default InscriptionsScreen;
