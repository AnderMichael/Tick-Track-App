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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";

type SemesterCreationForm = yup.InferType<typeof semesterCreationSchema>;

export default function CreateSemesterScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [errorVisible, setErrorVisible] = useState(false);
  const { nroSemester, year } = params;

  const semesterRomanNumber = useMemo(() => {
    let romanNumber = "";
    if (nroSemester === "1") {
      romanNumber = "I";
    } else {
      romanNumber = "II";
    }
    return romanNumber;
  }, [nroSemester]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SemesterCreationForm>({
    resolver: yupResolver(semesterCreationSchema),
    defaultValues: {
      title: `Semestre ${semesterRomanNumber} - ${year}`,
      workDates: {
        startDate: undefined,
        endDate: undefined,
      },
    },
  });

  const { handleCreateSemester, isCreatingSemester, createSemesterError } =
    useSemester({});
  const handleCreation = async (data: SemesterCreationForm) => {
    try {
      await handleCreateSemester({
        number: parseInt(nroSemester as string),
        year: parseInt(year as string),
        start_date: data.workDates.startDate.toISOString(),
        end_date: data.workDates.endDate.toISOString(),
      });
      router.back();
    } catch (error) {
      console.error("Error creating semester:", error);
      setErrorVisible(true);
    }
  };

  return (
    <>
      <ProcessingModal visible={isCreatingSemester} />
      <ErrorModal
        message={parseAPIError(
          createSemesterError,
          "Error al crear el semestre."
        )}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>Nombre</Screen.SubTitle>
          <Text className="text-3xl font-outfit-bold text-center">
            Semestre {semesterRomanNumber} - {year}
          </Text>
        </Screen.Section>
        <SemesterForm control={control} year={parseInt(year as string)} />
        <View className="px-5 my-5">
          <Button onPress={handleSubmit(handleCreation)}>Crear</Button>
        </View>
      </Screen>
    </>
  );
}
