import { TransactionSheet } from "@/components/app/administrative";
import {
  ConfirmationModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useTransactionOperationFlow } from "@/context/administrative";
import { useTransaction } from "@/hooks/app";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, Text, TextInput } from "react-native";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const { showDeleteModal, cancelDeleteModal, activateReload } =
    useTransactionOperationFlow();

  const {
    isLoadingQuery,
    isErrorQuery,
    transactionDetails,
    refetch,
    deleteTransaction,
    isLoadingDeletion,
  } = useTransaction(id as string);

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction();
      activateReload();
      cancelDeleteModal();
      router.back();
    } catch (error) {
      console.error("Error al eliminar la transacción:", error);
    }
  }

  if (isLoadingQuery || isLoadingDeletion) return <ProcessingModal visible />;
  if (isErrorQuery || !transactionDetails) return <Text>Error</Text>;

  const {
    hours,
    date,
    comment_student,
    comment_administrative,
    administrative_name,
    work_name,
    qualification_name,
    student_name,
  } = transactionDetails;

  return (
    <>
      <ConfirmationModal
        visible={showDeleteModal}
        title="Eliminar Transacción"
        message="¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteTransaction}
        onCancel={cancelDeleteModal}
      />
      <Screen>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 20 }}
          refreshControl={
            <RefreshControl refreshing={isLoadingQuery} onRefresh={refetch} />
          }
        >
          <Screen.Section>
            <TransactionSheet
              id={id as string}
              date={date}
              hours={hours}
              work_name={work_name}
              student_name={student_name}
              administrative_name={administrative_name}
              comment_administrative={comment_administrative}
              qualification_name={qualification_name}
            />

            <Text className="text-xl font-outfit-bold">
              Comentarios Estudiante
            </Text>

            <TextInput
              className="border border-black rounded-2xl px-4 text-base font-outfit-light h-52"
              placeholder="Sin comentarios aún."
              placeholderTextColor="gray"
              multiline
              numberOfLines={5}
              maxLength={500}
              value={comment_student}
              textAlignVertical="top"
              editable={false}
            />
          </Screen.Section>
        </ScrollView>
      </Screen>
    </>
  );
}
