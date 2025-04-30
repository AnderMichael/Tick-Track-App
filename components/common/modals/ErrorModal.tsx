import { Modal, Pressable, Text, View } from "react-native";

interface Props {
    visible: boolean;
    message?: string;
    onClose: () => void;
};

export default function ErrorModal({ visible, message = "Ocurrió un error inesperado.", onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white px-6 py-6 rounded-2xl w-4/5 max-w-sm items-center">
                    <Text className="text-2xl font-outfit-bold text-red-600 mb-4">¡Error!</Text>
                    <Text className="text-center font-outfit-regular text-base mb-6">{message}</Text>

                    <Pressable
                        onPress={onClose}
                        className="bg-black px-6 py-2 rounded-xl"
                    >
                        <Text className="text-white font-outfit-medium text-sm">Entendido</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
