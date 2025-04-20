import { LoginForm } from "@/components/auth";
import { Button, ScreenContainer } from "@/components/common";
import { loginSchema } from "@/forms/auth/login";
import { useSession } from "@/hooks/useSession";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";

type LoginFormValues = {
    upbCode: string;
    password: string;
};

export default function LoginScreen() {
    const { login } = useSession();

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
        Alert.alert("Login", JSON.stringify(data));
    };

    return (
        <ScreenContainer variant="center_between">
            <View className="w-full px-5" style={{
                gap: 25
            }} >

                <LoginForm control={control} />

                <Pressable className="w-full" onPress={() => Alert.alert("Recuperar contraseña", "Contáctate con el Encargado de Becas de tu Departamento. Para que reinicie tu contraseña")}>
                    <Text className="mt-2 mb-6 text-sm font-outfit-light text-black">
                        ¿Olvidaste tu contraseña?
                    </Text>
                </Pressable>
            </View>
            <View className="w-full px-5 mb-5">
                <Button onPress={handleSubmit(handleLogin)}>
                    Iniciar sesión
                </Button>
            </View>
        </ScreenContainer>
    );
}
