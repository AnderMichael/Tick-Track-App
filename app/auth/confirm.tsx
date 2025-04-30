import { ConfirmPasswordForm } from "@/components/auth";
import { Button, ErrorModal, ProcessingModal, ScreenContainer } from "@/components/common";
import InfoModal from "@/components/common/modals/InfoModal";
import { confirmationSchema } from "@/forms/auth/login";
import { parseAPIError } from "@/helpers/common";
import { useConfirmPasswordMutation } from "@/store/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

type ConfirmFormValues = {
    newPassword: string;
    confirmPassword: string;
};

export default function ConfirmPasswordScreen() {
    const router = useRouter();

    const [showSuccess, setShowSuccess] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const [confirmPasswordRequest, { isLoading, isError, error }] =
        useConfirmPasswordMutation();

    const {
        control,
        handleSubmit,
    } = useForm<ConfirmFormValues>({
        resolver: yupResolver(confirmationSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ConfirmFormValues) => {
        try {
            await confirmPasswordRequest({
                password: data.newPassword,
                confirmPassword: data.confirmPassword,
            }).unwrap();
            setShowSuccess(true);
            router.replace("/home");
        } catch (_) {
            setErrorVisible(true);
        }
    };


    return (
        <ScreenContainer variant="center_between">
            <ProcessingModal visible={isLoading} />
            <ErrorModal
                visible={errorVisible}
                message={parseAPIError(error, "No se pudo actualizar la contraseña")}
                onClose={() => { setErrorVisible(false); }}
            />
            <InfoModal
                visible={showSuccess}
                message="Contraseña actualizada correctamente."
                icon="✅"
                onClose={() => setShowSuccess(false)}
            />

            <View className="w-full px-5" style={{
                gap: 25
            }} >
                <Text className="text-2xl font-outfit-semibold mt-7">
                    Actualiza tu Contraseña
                </Text>
                <ConfirmPasswordForm control={control} />
            </View>

            <View className="w-full px-5 mb-5">
                <Button onPress={handleSubmit(onSubmit)}>
                    Confirmar
                </Button>
            </View>
        </ScreenContainer>
    );
}
