import { ProcessingModal, Screen, Sheet } from "@/components/common";
import { formatDate, formatHourNumbers } from "@/helpers/common";
import { useTransactionQuery } from "@/store/api/home";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function TransactionDetailScreen() {
    const { id } = useLocalSearchParams();
    const { isLoading, isError, data: transactionDetails, refetch, isFetching } = useTransactionQuery({ transaction_id: id as string })

    const [comment, setComment] = useState<string | undefined>();

    useEffect(() => {
        if (transactionDetails) {
            setComment(transactionDetails.comment_student);
        }
    }, [transactionDetails])

    if (isLoading || isFetching) return <ProcessingModal visible={isFetching} />;
    if (isError || !transactionDetails) return <Text>Error</Text>;

    const { hours, date, comment_student, comment_administrative, administrative_name, work_name } = transactionDetails;

    const showNoCommentButton = !comment_student || comment_student.trim().length === 0;

    return (
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
                            <Sheet.Value>
                                Comentarios
                            </Sheet.Value>
                        </Sheet.Field>
                        <Sheet.Field>
                            <Sheet.Name>{comment_administrative}</Sheet.Name>
                        </Sheet.Field>
                    </Sheet>
                    {showNoCommentButton && (
                        <TouchableOpacity className="bg-black rounded-2xl">
                            <Text className="text-white text-center font-outfit-medium">Sin Comentarios</Text>
                        </TouchableOpacity>
                    )}

                    <Text className="text-xl font-outfit-bold">Tus Comentarios</Text>
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

                    {showNoCommentButton && (
                        <TouchableOpacity className="bg-black py-4 rounded-2xl mt-6">
                            <Text className="text-white text-center font-outfit-medium">Enviar</Text>
                        </TouchableOpacity>
                    )}
                </Screen.Section>
            </ScrollView>
        </Screen>
    );
}
