import CommitmentsDropdown from "@/components/app/administrative/students/dropdowns/CommitmentsDropdown";
import {
  Button,
  ConfirmationModal,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useCurrentStudent } from "@/context/administrative";
import { parseAPIError } from "@/helpers/common";
import {
  useCommitmentsByStudentQuery,
  useEditInscriptionMutation,
  useFindInscriptionByIdQuery,
  useUninscribeFromSemesterMutation,
} from "@/store/api/app";

import { HourCards } from "@/components/app/administrative";
import { useModal } from "@/hooks/app";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  commitment_id: yup
    .number()
    .typeError("Selecciona una beca")
    .required("Selecciona una beca"),
});

type FormType = yup.InferType<typeof schema>;

export default function EditInscriptionScreen() {
  const router = useRouter();
  const { id: inscription_id } = useLocalSearchParams<{ id: string }>();
  const { student } = useCurrentStudent();

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    data: inscription,
    isLoading: isLoadingInscription,
    error: loadError,
  } = useFindInscriptionByIdQuery({
    upbCode: student!.upbCode,
    id: Number(inscription_id),
  });

  const { isLoading: isLoadingCommitments, error: fetchError } =
    useCommitmentsByStudentQuery({ upbCode: student!.upbCode });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      commitment_id: undefined,
    },
  });

  const [editInscription, { isLoading: isEditing, error: editError }] =
    useEditInscriptionMutation();

  const [uninscribe, { isLoading: isUnsubscribing, error: errorUninscribing }] =
    useUninscribeFromSemesterMutation();

  const {
    isVisible: isVisibleDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  useEffect(() => {
    if (inscription) {
      reset({ commitment_id: inscription.commitmentId });
    }
  }, [inscription]);

  const onSubmit = async (data: FormType) => {
    try {
      const { error } = await editInscription({
        upbCode: student!.upbCode,
        inscriptionId: Number(inscription_id),
        commitment_id: data.commitment_id,
      });

      if (error) throw error;
      router.back();
    } catch {
      setErrorVisible(true);
    }
  };

  const handleDelete = async () => {
    try {
      closeDeleteModal();
      const { error } = await uninscribe({
        upbCode: student!.upbCode,
        semester_id: inscription!.semester.id,
        commitment_id: inscription!.commitmentId,
      });
      if (error) throw error;
      router.back();
    } catch {
      setErrorVisible(true);
    }
  };

  return (
    <>
      <ConfirmationModal
        visible={isVisibleDeleteModal}
        title="Eliminar Inscripción"
        message="¿Estás seguro de que deseas eliminar esta inscripción? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <Screen>
        <ErrorModal
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
          message={parseAPIError(
            fetchError || editError || loadError || errorUninscribing,
            "No se pudo actualizar la inscripción."
          )}
        />
        <ProcessingModal
          visible={
            isLoadingCommitments ||
            isEditing ||
            isLoadingInscription ||
            isUnsubscribing
          }
        />

        <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
          <Screen.Section>
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
            <View className="my-5 w-full bottom-0 gap-2">
              <Button onPress={handleSubmit(onSubmit)} disabled={!isDirty}>
                Cambiar Beca
              </Button>
              <Button onPress={openDeleteModal} color="white" textColor="black">
                Anular Inscripción
              </Button>
            </View>
            <Screen.SubTitle>Detalle</Screen.SubTitle>

            <HourCards
              upbCode={student!.upbCode}
              semester_id={inscription?.semester.id}
              isLoadingInscription={isLoadingInscription}
            />

            <TouchableOpacity
              className="bg-black rounded-2xl p-4 h-28"
              onPress={() => {
                router.push({
                  pathname:
                    `(protected)/administrative/students/${student?.upbCode}/inscriptions/${inscription_id}/transactions` as RelativePathString,
                  params: {
                    semester_id: inscription!.semester.id,
                    semester_name: inscription!.semester.name,
                  },
                });
              }}
            >
              <Text className="text-white font-outfit-medium">
                Transacciones
              </Text>
              <View className="absolute bottom-[-30] right-0 opacity-25">
                <MaterialIcons name="more-time" color="white" size={120} />
              </View>
            </TouchableOpacity>
          </Screen.Section>
        </ScrollView>
      </Screen>
    </>
  );
}
