import { StudentInfoSection, TransactionDetailsForm, WorkInfoSection } from '@/components/app/administrative';
import { Button, ProcessingModal, Screen } from '@/components/common';
import { useWork } from '@/context/administrative';
import { transactionSchema } from '@/forms/administrative';
import { usePaymentMutation } from '@/store/api/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, ToastAndroid, View } from 'react-native';
import { InferType } from 'yup';

type TransactionForm = InferType<typeof transactionSchema>;

export default function PayHoursScreen() {

    const { work } = useWork();

    const { fullName, upbCode, commitment_id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [payment] = usePaymentMutation();
    const router = useRouter();

    const {
        control,
        handleSubmit,
    } = useForm<TransactionForm>({
        resolver: yupResolver(transactionSchema),
        defaultValues: {
            hours: 8.00,
            qualification: 0,
            comment: '',
        },
    });

    const handlePayment = async (data: TransactionForm) => {
        console.log(data);
        try {
            setLoading(true);
            await payment({
                hours: data.hours,
                comment_administrative: data.comment,
                comment_student: '(Sin Comentarios)',
                commitment_id: parseInt(commitment_id as string),
                work_id: work_id,
                date: new Date().toISOString(),
            }).unwrap();
            ToastAndroid.show('Pago registrado exitosamente', ToastAndroid.SHORT);
            router.back();
        } catch (error) {
            console.error(error);
            ToastAndroid.show('Error al registrar el pago', ToastAndroid.LONG);
            router.back();
        } finally {
            setLoading(false);
        }
    };

    if (!work) return null;

    const { id: work_id, title, description } = work;

    return (
        <Screen>
            <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
                <WorkInfoSection
                    title={title}
                    description={description}
                />
                <StudentInfoSection
                    fullName={fullName as string}
                    upbCode={upbCode as string}
                />
                <TransactionDetailsForm control={control} />
                <View className='px-5'>
                    <Button onPress={handleSubmit(handlePayment)}>
                        Pagar
                    </Button>
                </View>
            </ScrollView>
            <ProcessingModal visible={loading} />
        </Screen>
    );
}
