import { PercentageForm } from "@/components/app/administrative";
import { Button, ErrorModal, ProcessingModal } from "@/components/common";
import { createPercentageSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { usePercentage } from "@/hooks/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type PercentageFormType = yup.InferType<typeof createPercentageSchema>;

const EditPercentageForm = () => {
  const { id, detailId } = useLocalSearchParams();
  const router = useRouter();
  const scholarship_id = parseInt(id as string);
  const percentage_id = parseInt(detailId as string);

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    percentage,
    isLoading,
    errorFetching,
    editPercentage,
    isLoadingUpdate,
    errorUpdate,
  } = usePercentage({
    scholarship_id,
    detail_id: percentage_id,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PercentageFormType>({
    resolver: yupResolver(createPercentageSchema),
  });

  useEffect(() => {
    if (percentage) {
      reset({
        percentage: percentage.percentage * 100,
        hours_per_semester: percentage.hours_per_semester,
        total_hours: percentage.total_hours,
      });
    }
  }, [percentage, reset]);

  const handleEdition = async (data: PercentageFormType) => {
    try {
      await editPercentage({
        percentage: data.percentage / 100,
        hours_per_semester: data.hours_per_semester,
        total_hours: data.hours_per_semester * 8,
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
        message={parseAPIError(
          errorUpdate,
          "Error al actualizar el porcentaje."
        )}
      />
      <PercentageForm control={control} />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleEdition)}>Actualizar</Button>
      </View>
    </>
  );
};

export default EditPercentageForm;
