import { PercentageForm } from "@/components/app/administrative";
import { Button, ErrorModal, ProcessingModal } from "@/components/common";
import { createPercentageSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { usePercentage } from "@/hooks/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type PercentageCreationForm = yup.InferType<typeof createPercentageSchema>;

const CreatePercentageForm = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scholarship_id = parseInt(id as string);

  const { createNewPercentage, isLoadingCreation, errorCreation } =
    usePercentage({ scholarship_id });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PercentageCreationForm>({
    resolver: yupResolver(createPercentageSchema),
    defaultValues: {
      percentage: 0,
      hours_per_semester: 0,
      total_hours: 0,
    },
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const handleCreation = async (data: PercentageCreationForm) => {
    try {
      await createNewPercentage({
        percentage: data.percentage / 100.0,
        hours_per_semester: data.hours_per_semester,
        total_hours: data.hours_per_semester * 8,
      });
      router.back();
    } catch (error) {
      setErrorVisible(true);
    }
  };

  return (
    <>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(
          errorCreation,
          "No se pudo crear el porcentaje."
        )}
      />
      <ProcessingModal visible={isLoadingCreation} />
      <PercentageForm control={control} errors={errors} />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleCreation)}>Crear</Button>
      </View>
    </>
  );
};

export default CreatePercentageForm;
