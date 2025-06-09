import { SemesterForm } from "@/components/app/administrative";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { semesterCreationSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { useSemester } from "@/hooks/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";

type SemesterCreationForm = yup.InferType<typeof semesterCreationSchema>;

export default function EditSemesterScreen() {
  const params = useLocalSearchParams();
  const { id, year } = params;

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    semester,
    handleUpdateSemester,
    isUpdatingSemester,
    updateSemesterError,
    isLoadingSemester,
    isFetchingSemester,
  } = useSemester({ semester_id: parseInt(id as string) });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SemesterCreationForm>({
    resolver: yupResolver(semesterCreationSchema),
  });

  useEffect(() => {
    if (semester) {
      reset({
        title: semester.name,
        workDates: {
          startDate: new Date(semester.start_date),
          endDate: new Date(semester.end_date),
        },
      });
    }
  }, [semester, reset]);

  const handleEdition = async (data: SemesterCreationForm) => {
    try {
      await handleUpdateSemester({
        number: semester!.number,
        year: parseInt(year as string),
        start_date: data.workDates.startDate.toISOString(),
        end_date: data.workDates.endDate.toISOString(),
      });
    } catch (error) {
      setErrorVisible(true);
    }
  };

  if (isLoadingSemester || isFetchingSemester) {
    return <ProcessingModal visible />;
  }

  return (
    <>
      <ProcessingModal visible={isUpdatingSemester} />
      <ErrorModal
        message={parseAPIError(
          updateSemesterError,
          "Error al actualizar el semestre."
        )}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>Nombre</Screen.SubTitle>
          <Text className="text-3xl font-outfit-bold text-center">
            {semester?.name}
          </Text>
        </Screen.Section>
        <SemesterForm control={control} year={parseInt(year as string)} />
        <View className="px-5 my-5">
          <Button onPress={handleSubmit(handleEdition)}>Actualizar</Button>
        </View>
      </Screen>
    </>
  );
}
