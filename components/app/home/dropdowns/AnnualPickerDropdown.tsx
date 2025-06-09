import { OptionDropdown } from "@/components/common";
import { useSemester } from "@/context/home";
import { useSemesterPerYearQuery } from "@/store/api/app";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { YearSelector } from "../../administrative";

const AnnualPickerDropdown = () => {
  const today = new Date();
  const [yearSelected, setYearSelected] = useState(today.getFullYear());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { semester, setSemester } = useSemester();
  const {
    isLoading,
    isFetching,
    isError,
    data: semesters,
    refetch,
    error,
  } = useSemesterPerYearQuery({ year: yearSelected });

  const semesterOptions = useMemo(() => {
    if (isLoading || isFetching) return [];
    if (isError) return [];
    if (!semesters) return [];

    const options = semesters.data.map((semester) => ({
      label: semester.name,
      value: semester.id,
    }));

    return options;
  }, [semesters]);

  useEffect(() => {
    refetch();
    setSemester(semesterOptions[0]);
  }, [yearSelected, semesterOptions]);

  useEffect(() => {}, [semester]);
  return (
    <>
      <YearSelector
        isModalVisible={isModalVisible}
        setYearSelected={setYearSelected}
        yearSelected={yearSelected}
        close={() => setIsModalVisible(false)}
        open={() => setIsModalVisible(true)}
      />
      <View className="w-full px-5">
        <OptionDropdown
          data={semesterOptions}
          value={semester}
          onChange={setSemester}
          placeholder="Sin semestres"
          isLoading={isLoading || isFetching}
        />
      </View>
      {semesterOptions.length === 0 && (
        <View className="flex-1 items-center justify-center gap-5">
          <MaterialCommunityIcons
            name="credit-card-lock"
            color="gray"
            size={100}
          />
          <Text className="text-center text-2xl font-outfit-extralight px-5">
            Oops! Al parecer no existen semestres creados en el año seleccionado
          </Text>
        </View>
      )}
    </>
  );
};

export default AnnualPickerDropdown;
