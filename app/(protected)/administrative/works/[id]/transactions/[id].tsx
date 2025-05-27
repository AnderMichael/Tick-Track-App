import { ConfirmationModal, ProcessingModal, Screen, Sheet, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useTransactionState } from "@/context/administrative";
import { formatDate, formatHourNumbers } from "@/helpers/common";
import { useTransactionQuery } from "@/store/api/app";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function TransactionDetailScreen() {
    const { id } = useLocalSearchParams();
    const { showDeleteModal, cancelDeleteModal } = useTransactionState();
    const { isLoading, isError, data: transactionDetails, refetch, isFetching } = useTransactionQuery({ transaction_id: id as string })

    const [comment, setComment] = useState<string | undefined>();

    useEffect(() => {
        if (transactionDetails) {
            setComment(transactionDetails.comment_student);
        }
    }, [transactionDetails])

    if (isLoading || isFetching) return <ProcessingModal visible={isFetching} />;
    if (isError || !transactionDetails) return <Text>Error</Text>;

    const { hours, date, comment_student, comment_administrative, administrative_name, work_name, student_name } = transactionDetails;

    const showNoCommentButton = !comment_student;

    return (
        <>
            <ConfirmationModal
                visible={showDeleteModal}
                title="Eliminar Transacción"
                message="¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={() => { }}
                onCancel={cancelDeleteModal}
            />
            <Screen>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
                >
                    <Screen.Section>
                        <Sheet>
                            <Sheet.Title>{work_name}</Sheet.Title>

                            <Sheet.Field>
                                <Sheet.Name>Nro Comprobante</Sheet.Name>
                                <Sheet.Value>{id}</Sheet.Value>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Name>Horas Depositadas</Sheet.Name>
                                <Sheet.Value>+{formatHourNumbers(hours)} hrs</Sheet.Value>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Name>Fecha</Sheet.Name>
                                <Sheet.Value>{formatDate(date)}</Sheet.Value>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Name>Calificación</Sheet.Name>
                                <Sheet.Value>BUENO</Sheet.Value>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Value>Supervisor</Sheet.Value>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Name>{administrative_name}</Sheet.Name>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Value>Estudiante</Sheet.Value>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Name>{student_name}</Sheet.Name>
                            </Sheet.Field>

                            <Sheet.Field>
                                <Sheet.Value>
                                    Tus Comentarios
                                </Sheet.Value>
                            </Sheet.Field>
                            <Sheet.Field>
                                <Sheet.Name>{comment_administrative}</Sheet.Name>
                            </Sheet.Field>
                        </Sheet>
                        <WithRole allowed={[Role.STUDENT]}>
                            {showNoCommentButton && (
                                <TouchableOpacity className="bg-black rounded-2xl">
                                    <Text className="text-white text-center font-outfit-medium">Sin Comentarios</Text>
                                </TouchableOpacity>
                            )}
                        </WithRole>

                        <WithRole allowed={[Role.STUDENT]}>
                            <Text className="text-xl font-outfit-bold">Tus Comentarios</Text>
                        </WithRole>
                        <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
                            <Text className="text-xl font-outfit-bold">Comentarios Estudiante</Text>
                        </WithRole>

                        <WithRole allowed={[Role.STUDENT]}>
                            <TextInput
                                className="border border-black rounded-2xl px-4 text-base font-outfit-light h-52"
                                placeholder="¿Qué te pareció el trabajo? (Opcional)"
                                placeholderTextColor="gray"
                                multiline
                                numberOfLines={5}
                                maxLength={500}
                                value={comment}
                                onChangeText={setComment}
                                textAlignVertical="top"
                                editable={showNoCommentButton}

                            />
                        </WithRole>

                        <WithRole allowed={[Role.ADMIN, Role.SCHOLARSHIP_OFFICER, Role.SUPERVISOR]}>
                            <TextInput
                                className="border border-black rounded-2xl px-4 text-base font-outfit-light h-52"
                                placeholder="Sin comentarios aún."
                                placeholderTextColor="gray"
                                multiline
                                numberOfLines={5}
                                maxLength={500}
                                value={comment}
                                onChangeText={setComment}
                                textAlignVertical="top"
                                editable={false}
                            />
                        </WithRole>

                        <WithRole allowed={[Role.STUDENT]}>
                            {showNoCommentButton && (
                                <TouchableOpacity className="bg-black py-4 rounded-2xl mt-6" disabled={!comment || comment.length < 5}>
                                    <Text className="text-white text-center font-outfit-medium">Enviar</Text>
                                </TouchableOpacity>
                            )}
                        </WithRole>
                    </Screen.Section>
                </ScrollView>
            </Screen>
        </>
    );
}
