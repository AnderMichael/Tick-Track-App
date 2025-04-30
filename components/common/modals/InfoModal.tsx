import { Modal, Pressable, Text, View } from "react-native";

type Props = {
    visible: boolean;
    message: string;
    title?: string;
    onClose: () => void;
    icon?: string;
};

export default function InfoModal({
    visible,
    message,
    title = "Información",
    onClose,
    icon = "ℹ️",
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white px-6 py-6 rounded-2xl w-4/5 max-w-sm items-center">
                    <Text className="text-4xl mb-2">{icon}</Text>
                    <Text className="text-lg font-outfit-semibold text-center mb-2">
                        {title}
                    </Text>
                    <Text className="text-base text-center font-outfit-regular text-gray-800 mb-6">
                        {message}
                    </Text>
                    <Pressable
                        onPress={onClose}
                        className="bg-black px-6 py-3 rounded-xl"
                    >
                        <Text className="text-white font-outfit-medium text-base">
                            Entendido
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
