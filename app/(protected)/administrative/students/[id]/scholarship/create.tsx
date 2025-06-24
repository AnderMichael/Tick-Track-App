import {
  PercentagesDropdown,
  ScholarshipDropdown,
} from "@/components/app/administrative";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useCurrentStudent } from "@/context/administrative";
import { parseAPIError } from "@/helpers/common";
import { useCreateNewCommitmentMutation } from "@/store/api/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  scholarship_id: yup
    .number()
    .typeError("Selecciona una beca")
    .required("Selecciona una beca"),

  percentage_id: yup
    .number()
    .typeError("Selecciona un porcentaje")
    .required("Selecciona un porcentaje"),
});

type FormType = yup.InferType<typeof schema>;

export default function AssociateScholarshipScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      scholarship_id: undefined,
      percentage_id: undefined,
    },
  });

  const [
    createNewCommitment,
    { isLoading: isCreatingCommitment, error: createCommitmentError },
  ] = useCreateNewCommitmentMutation();

  const { student: currentStudent } = useCurrentStudent();
  const [errorVisible, setErrorVisible] = useState(false);

  const onSubmit = async (data: FormType) => {
    try {
      const { error } = await createNewCommitment({
        upbCode: currentStudent?.upbCode as number,
        body: {
          percentage_id: data.percentage_id,
        },
      });
      if (error) {
        throw error;
      }
      router.back();
    } catch {
      setErrorVisible(true);
    }
  };

  return (
    <Screen>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(
          createCommitmentError,
          "No se pudo asociar la beca."
        )}
      />
      <ProcessingModal visible={isCreatingCommitment} />

      <Screen.Section>
        <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
          <Screen.SubTitle>Beca</Screen.SubTitle>

          <Controller
            name="scholarship_id"
            control={control}
            render={({ field }) => (
              <ScholarshipDropdown
                value={field.value}
                onSelect={(item) => field.onChange(item.value)}
              />
            )}
          />
          {errors.scholarship_id && (
            <Text className="text-red-500 font-outfit-regular mt-2">
              {errors.scholarship_id.message}
            </Text>
          )}

          <Screen.SubTitle>Porcentaje</Screen.SubTitle>
          <Controller
            name="percentage_id"
            control={control}
            render={({ field }) => (
              <PercentagesDropdown
                scholarshipId={watch("scholarship_id")}
                value={field.value}
                onChange={(item) => field.onChange(item.value)}
              />
            )}
          />
          {errors.percentage_id && (
            <Text className="text-red-500 font-outfit-regular mt-2">
              {errors.percentage_id.message}
            </Text>
          )}
        </ScrollView>
      </Screen.Section>

      <View className="px-5 my-5">
        <Button onPress={handleSubmit(onSubmit)}>Asociar beca</Button>
      </View>
    </Screen>
  );
}
