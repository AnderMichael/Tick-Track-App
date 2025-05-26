import { Button, ProcessingModal, Screen, Sheet } from "@/components/common";
import { formatDate, formatHourNumbers } from "@/helpers/common";
import { useStudentCommentMutation, useTransactionQuery } from "@/store/api/app";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput } from "react-native";

export default function TransactionDetailScreen() {
    const { id } = useLocalSearchParams();
    const { isLoading, isError, data: transactionDetails, refetch, isFetching } = useTransactionQuery({ transaction_id: id as string })

    const [comment, setComment] = useState<string | undefined>();

    useEffect(() => {
        if (transactionDetails) {
            setComment(transactionDetails.comment_student);
        }
    }, [transactionDetails])

    const [publishComment, { isLoading: isPublishLoading, isError: isPublishError }] = useStudentCommentMutation();

    if (isLoading || isFetching || isPublishLoading) return <ProcessingModal visible={isLoading || isFetching || isPublishLoading} />;
    if (isError || isPublishError || !transactionDetails) return <Text>Error</Text>;

    const { hours, date, comment_student, comment_administrative, administrative_name, work_name, student_name } = transactionDetails;

    const showNoCommentButton = !comment_student;

    const handleWithoutComment = async () => {
        try {
            await publishComment({
                transaction_id: id as string,
                comment: '(Sin Comentarios)',
            }).unwrap();
            setComment('(Sin Comentarios)');
        } catch (error) {
            console.error(error);
        }
    }

    const handleCommentSubmit = async () => {
        if (!comment || comment.length < 5) return;
        try {
            await publishComment({
                transaction_id: id as string,
                comment: comment.trim(),
            }).unwrap();
        } catch (error) {
            console.error(error);
        }
    };
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
                            <Sheet.Value>Estudiante</Sheet.Value>
                        </Sheet.Field>

                        <Sheet.Field>
                            <Sheet.Name>{student_name}</Sheet.Name>
                        </Sheet.Field>

                        <Sheet.Field>
                            <Sheet.Value>
                                Comentarios Supervisor
                            </Sheet.Value>
                        </Sheet.Field>
                        <Sheet.Field>
                            <Sheet.Name>{comment_administrative}</Sheet.Name>
                        </Sheet.Field>
                    </Sheet>
                    {showNoCommentButton && (
                        <Button onPress={handleWithoutComment}>
                            Sin Comentarios
                        </Button>
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
                        <Button onPress={handleCommentSubmit} disabled={!comment || comment.length < 5}>
                            Enviar
                        </Button>
                        // <TouchableOpacity className="bg-black py-4 rounded-2xl" disabled={!comment || comment.length < 5}>
                        //     <Text className="text-white text-center font-outfit-medium">Enviar</Text>
                        // </TouchableOpacity>
                    )}
                </Screen.Section>
            </ScrollView>
        </Screen>
    );
}
