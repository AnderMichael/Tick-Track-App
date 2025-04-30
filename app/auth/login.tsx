import { LoginForm } from "@/components/auth";
import { Button, ErrorModal, ProcessingModal, ScreenContainer } from "@/components/common";
import InfoModal from "@/components/common/modals/InfoModal";
import { loginSchema } from "@/forms/auth/login";
import { parseAPIError } from "@/helpers/common";
import { useAuth, useSession } from "@/hooks";
import { saveToken } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type LoginFormValues = {
    upbCode: string;
    password: string;
};

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useSession();
    const { loginRequest, userRequest, isLoading, error } = useAuth();

    const [errorVisible, setErrorVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const {
        control,
        handleSubmit,
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            upbCode: "",
            password: "",
        },
    });

    const handleLogin = async (data: LoginFormValues) => {
        const { upbCode, password } = data;
        try {
            const response = await loginRequest({
                upbCode: Number(upbCode),
                password,
            }).unwrap();

            await saveToken(response.token);

            const user = await userRequest().unwrap();
            login(user);
            if (!user.isConfirmed) router.push("/auth/confirm");
            else router.replace("/home");
        } catch (err) {
            setErrorVisible(true);
            console.error("Error al iniciar sesión", err);
        }
    };

    return (
        <ScreenContainer variant="center_between">
            <ErrorModal visible={errorVisible} onClose={() => setErrorVisible(false)} message={parseAPIError(error, "No se pudo iniciar sesión.")} />
            <InfoModal visible={infoVisible} onClose={() => setInfoVisible(false)} message={infoMessage} />
            <ProcessingModal visible={isLoading} />

            <View className="w-full px-5" style={{
                gap: 25
            }} >

                <LoginForm control={control} />

                <Pressable className="w-full" onPress={() => {
                    setInfoMessage("Contáctate con el Encargado de Becas de tu Departamento. Para que reinicie tu contraseña.");
                    setInfoVisible(true);
                }}>
                    <Text className="mt-2 mb-6 text-sm font-outfit-light text-black">
                        ¿Olvidaste tu contraseña?
                    </Text>
                </Pressable>
            </View>
            <View className="w-full px-5 mb-5">
                <Button onPress={handleSubmit(handleLogin)}>
                    Iniciar Sesión
                </Button>
            </View>
        </ScreenContainer>
    );
}
