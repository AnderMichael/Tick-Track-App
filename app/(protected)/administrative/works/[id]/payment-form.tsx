import {
  StudentInfoSection,
  TransactionDetailsForm,
  WorkInfoSection,
} from "@/components/app/administrative";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useCurrentWork } from "@/context/administrative";
import { transactionSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { useSession } from "@/hooks";
import { usePaymentMutation } from "@/store/api/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, ToastAndroid, View } from "react-native";
import { InferType } from "yup";

type TransactionForm = InferType<typeof transactionSchema>;

export default function PayHoursScreen() {
  const { work } = useCurrentWork();
  const { user } = useSession();
  const { fullName, upbCode, commitment_id } = useLocalSearchParams();
  const [payment, { isLoading, error: errorPayment }] = usePaymentMutation();
  const [errorVisible, setErrorVisible] = useState(false);

  const router = useRouter();

  const { control, handleSubmit } = useForm<TransactionForm>({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      hours: 8.0,
      qualification: 0,
      comment: "",
    },
  });

  const handlePayment = async (data: TransactionForm) => {
    console.log(data);
    const { comment, hours, qualification } = data;
    try {
      await payment({
        hours: hours,
        comment_administrative: comment ? comment : "(Sin Comentarios)",
        commitment_id: parseInt(commitment_id as string),
        work_id: work_id,
        date: new Date().toISOString(),
        qualification_id: qualification,
        author_id: user?.upbCode ?? 0,
      }).unwrap();
      ToastAndroid.show("Pago registrado exitosamente", ToastAndroid.SHORT);
      router.back();
    } catch (error) {
      console.error(error);
      setErrorVisible(true);
    }
  };

  if (!work) return null;

  const { id: work_id, title, description } = work;

  return (
    <>
      <ErrorModal
        visible={errorVisible}
        onClose={() => {
          setErrorVisible(false);
          router.back();
        }}
        message={parseAPIError(errorPayment, "No se pudo realizar el pago.")}
      />
      <Screen>
        <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
          <WorkInfoSection title={title} description={description} />
          <StudentInfoSection
            fullName={fullName as string}
            upbCode={upbCode as string}
          />
          <TransactionDetailsForm control={control} />
          <View className="px-5">
            <Button onPress={handleSubmit(handlePayment)}>Pagar</Button>
          </View>
        </ScrollView>
        <ProcessingModal visible={isLoading} />
      </Screen>
    </>
  );
}
