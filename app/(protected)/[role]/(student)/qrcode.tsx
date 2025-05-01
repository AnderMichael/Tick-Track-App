import { useSession } from "@/hooks/common/useSession";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
    const { user } = useSession();
    const accountKey = `${user?.student.accountKey}`;

    return (
        <View className="flex flex-1 bg-white px-5 pt-8 justify-center items-center">
            <QRCode value={accountKey} size={250} />

            <Text className="mt-10 text-center text-base font-outfit-regular">
                Comparte este QR con tu supervisor para que pueda depositar horas a tu cuenta
            </Text>
        </View>
    );
}