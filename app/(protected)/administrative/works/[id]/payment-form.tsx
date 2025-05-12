import { ProcessingModal, Screen } from '@/components/common';
import { usePaymentMutation } from '@/store/api/home';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function PayHoursScreen() {
    const { id: work_id, fullName, upbCode, commitment_id } = useLocalSearchParams();
    const [hours, setHours] = useState('8.00');
    const [grade] = useState('BUENO');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [payment] = usePaymentMutation();
    const router = useRouter();

    const handlePayment = async () => {
        try {
            setLoading(true);
            await payment({
                hours: parseFloat(hours),
                comment_administrative: comment,
                comment_student: '(Sin Comentarios)',
                commitment_id: parseInt(commitment_id as string),
                work_id: parseInt(work_id as string),
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

    return (
        <Screen>
            <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
                <Text className="font-outfit-bold text-2xl">Charla sobre Nutrición</Text>
                <Text className="font-outfit-regular text-base">
                    Los becarios deben asistir al evento sobre Nutrición durante el horario B, se tocarán temas interesantes de la buena alimentación y la planificación de una buena dieta
                </Text>

                <Text className="font-outfit-bold text-base">Estudiante</Text>
                <View className="bg-gray-400 p-4 rounded-xl gap-3">
                    <Text className="font-outfit-bold">Nombre Completo</Text>
                    <Text className="font-outfit-regular">{fullName}</Text>
                    <Text className="font-outfit-bold">Código</Text>
                    <Text className="font-outfit-regular">{upbCode}</Text>
                </View>

                <Text className="font-outfit-bold">Horas</Text>
                <TextInput
                    className="border border-black px-4 py-2 rounded-xl text-base font-outfit-light"
                    keyboardType="decimal-pad"
                    value={hours}
                    onChangeText={setHours}
                />

                <Text className="font-outfit-bold">Calificar</Text>
                <TextInput
                    className="border border-black px-4 py-2 rounded-xl bg-gray-300 font-outfit-bold"
                    value={grade}
                    editable={false}
                />

                <Text className="font-outfit-bold">Comentarios</Text>
                <TextInput
                    className="border border-black px-4 py-2 rounded-2xl h-40 text-base font-outfit-light"
                    placeholder="¿Qué te pareció el trabajo? (Opcional)"
                    placeholderTextColor="gray"
                    multiline
                    value={comment}
                    onChangeText={setComment}
                    textAlignVertical="top"
                />

                <TouchableOpacity className="bg-black py-4 rounded-2xl" onPress={handlePayment}>
                    <Text className="text-white text-center font-outfit-medium">Pagar</Text>
                </TouchableOpacity>
            </ScrollView>
            <ProcessingModal visible={loading} />
        </Screen>
    );
}
