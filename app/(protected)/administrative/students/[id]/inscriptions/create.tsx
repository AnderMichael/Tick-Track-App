import CommitmentsDropdown from "@/components/app/administrative/students/dropdowns/CommitmentsDropdown";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useCurrentStudent } from "@/context/administrative";
import { parseAPIError } from "@/helpers/common";
import {
  useCommitmentsByStudentQuery,
  useCreateInscriptionMutation,
} from "@/store/api/app";

import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  commitment_id: yup
    .number()
    .typeError("Selecciona una beca")
    .required("Selecciona una beca"),
});

type FormType = yup.InferType<typeof schema>;

export default function CreateInscriptionScreen() {
  const router = useRouter();
  const { semester_id } = useLocalSearchParams<{ semester_id: string }>();
  const { student } = useCurrentStudent();
  const [errorVisible, setErrorVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      commitment_id: undefined,
    },
  });

  const {
    data: commitments = [],
    isLoading: isLoadingCommitments,
    error: fetchError,
  } = useCommitmentsByStudentQuery({ upbCode: student!.upbCode });

  const [createInscription, { isLoading: isCreating, error: createError }] =
    useCreateInscriptionMutation();

  const onSubmit = async (data: FormType) => {
    try {
      const { error } = await createInscription({
        upbCode: student!.upbCode,
        semester_id: Number(semester_id),
        commitment_id: data.commitment_id,
      });

      if (error) throw error;
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
          fetchError || createError,
          "No se pudo crear la inscripción."
        )}
      />
      <ProcessingModal visible={isLoadingCommitments || isCreating} />

      <Screen.Section>
        <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
          <Screen.SubTitle>Beca</Screen.SubTitle>

          <Controller
            control={control}
            name="commitment_id"
            render={({ field }) => (
              <CommitmentsDropdown
                upbCode={student!.upbCode}
                value={field.value}
                onChange={(item) => field.onChange(item.value)}
                error={errors.commitment_id?.message}
              />
            )}
          />
        </ScrollView>
      </Screen.Section>

      <View className="px-5 my-5">
        <Button onPress={handleSubmit(onSubmit)}>Inscribirse</Button>
      </View>
    </Screen>
  );
}
