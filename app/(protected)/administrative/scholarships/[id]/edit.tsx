import { ScholarshipForm } from "@/components/app/administrative";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { createScholarshipSchema } from "@/forms/administrative/scholarships";
import { parseAPIError } from "@/helpers/common";
import { useScholarship } from "@/hooks/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";

type ScholarshipFormType = yup.InferType<typeof createScholarshipSchema>;

export default function EditScholarshipScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id } = params;

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    scholarship,
    isLoading,
    errorFetching,
    editScholarship,
    isLoadingUpdate,
    errorUpdate,
  } = useScholarship({ scholarship_id: parseInt(id as string) });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScholarshipFormType>({
    resolver: yupResolver(createScholarshipSchema),
  });

  useEffect(() => {
    if (scholarship) {
      reset({
        name: scholarship.name,
        description: scholarship.description,
      });
    }
  }, [scholarship, reset]);

  const handleEdition = async (data: ScholarshipFormType) => {
    try {
      await editScholarship({
        name: data.name,
        description: data.description,
      });
      router.back();
    } catch (error) {
      setErrorVisible(true);
    }
  };

  if (isLoading) {
    return <ProcessingModal visible />;
  }

  return (
    <>
      <ProcessingModal visible={isLoadingUpdate} />
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(errorUpdate, "Error al actualizar la beca.")}
      />
      <Screen>
        <ScholarshipForm control={control} />
        <View className="px-5 my-5">
          <Button onPress={handleSubmit(handleEdition)}>Actualizar</Button>
        </View>
      </Screen>
    </>
  );
}
