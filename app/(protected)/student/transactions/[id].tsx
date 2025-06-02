import { TransactionSheet } from "@/components/app/student";
import { Button, ProcessingModal, Screen } from "@/components/common";
import { useTransaction } from "@/hooks/app";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput } from "react-native";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  const {
    transactionDetails,
    publishStudentComment,
    isLoadingQuery,
    isErrorQuery,
    refetch,
    isLoadingPostStudentComment,
    isErrorPostStudentComment,
  } = useTransaction(id as string);

  const [comment, setComment] = useState<string | undefined>();

  useEffect(() => {
    if (transactionDetails) {
      setComment(transactionDetails.comment_student);
    }
  }, [transactionDetails]);

  const handleWithoutComment = async () => {
    try {
      await publishStudentComment("(Sin Comentarios)");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment) return;
    try {
      await publishStudentComment(comment.trim());
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoadingQuery || isLoadingPostStudentComment)
    return <ProcessingModal visible />;

  if (isErrorQuery || isErrorPostStudentComment || !transactionDetails)
    return <Text>Error</Text>;

  const {
    hours,
    date,
    comment_student,
    comment_administrative,
    administrative_name,
    work_name,
    student_name,
  } = transactionDetails;

  const showNoCommentButtons = !comment_student;

  return (
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
            hours={hours}
            date={date}
            administrative_name={administrative_name}
            student_name={student_name}
            comment_administrative={comment_administrative}
            work_name={work_name}
          />
          {showNoCommentButtons && (
            <Button onPress={handleWithoutComment}>Sin Comentarios</Button>
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
            editable={showNoCommentButtons}
          />

          {showNoCommentButtons && (
            <Button onPress={handleCommentSubmit}>Enviar</Button>
          )}
        </Screen.Section>
      </ScrollView>
    </Screen>
  );
}
