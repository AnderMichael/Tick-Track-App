import { SemesterCard, YearSelector } from "@/components/app/administrative";
import { Screen } from "@/components/common";
import { useSemesters } from "@/hooks/app";
import { RelativePathString, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export default function SemestersScreen() {
  const today = new Date();
  const router = useRouter();
  const [yearSelected, setYearSelected] = useState(today.getFullYear());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { semesters, isLoading, isErrorSemesters, errorSemesters, refetch } =
    useSemesters(yearSelected);

  useEffect(() => {
    refetch();
  }, [yearSelected]);

  const handleEdit = (semester_id: number) => {
    router.push({
      pathname:
        `(protected)/administrative/semesters/${semester_id}/edit` as RelativePathString,
      params: {
        year: yearSelected,
      },
    });
  };

  const handleDelete = (semester_id: number) => {
    router.push({
      pathname:
        `(protected)/administrative/semesters/${semester_id}/delete` as RelativePathString,
    });
  };

  const handleCreate = (nroSemester: number) => {
    router.push({
      pathname:
        `(protected)/administrative/semesters/create` as RelativePathString,
      params: {
        year: yearSelected,
        nroSemester,
      },
    });
  };

  const firstSemester = semesters.find((semester) => semester.number === 1);
  const secondSemester = semesters.find((semester) => semester.number === 2);

  return (
    <Screen>
      <ScrollView
        className="w-full h-full bg-white"
        contentContainerStyle={{ gap: 25, paddingVertical: 15 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
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
          <SemesterCard
            isLoading={isLoading}
            semester={firstSemester}
            onPressEdit={handleEdit}
            onPressDelete={handleDelete}
            onPressCreate={() => handleCreate(1)}
            placeholderCreate={`Crear Semestre I - ${yearSelected}`}
          />
          <SemesterCard
            isLoading={isLoading}
            semester={secondSemester}
            onPressEdit={handleEdit}
            onPressDelete={handleDelete}
            onPressCreate={() => handleCreate(2)}
            placeholderCreate={`Crear Semestre II - ${yearSelected}`}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
