import { Modal, Pressable, Text, View } from "react-native";

interface ConfirmationModalProps {
    visible: boolean;
    title?: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    icon?: string;
}

export default function ConfirmationModal({
    visible,
    title = "Confirmación",
    message,
    cancelText = "Cancelar",
    confirmText = "Confirmar",
    onCancel,
    onConfirm,
}: ConfirmationModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white px-6 py-6 rounded-2xl w-4/5 max-w-sm items-center">
                    <Text className="text-lg font-outfit-semibold text-center mb-2">
                        {title}
                    </Text>
                    <Text className="text-base text-center font-outfit-regular text-gray-800 mb-6">
                        {message}
                    </Text>
                    <View className="flex-row justify-between w-full gap-4">
                        <Pressable
                            onPress={onCancel}
                            className="flex-1 border border-black py-3 rounded-xl"
                        >
                            <Text className="text-black text-center font-outfit-medium">
                                {cancelText}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={onConfirm}
                            className="flex-1 bg-black py-3 rounded-xl"
                        >
                            <Text className="text-white text-center font-outfit-medium">
                                {confirmText}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
