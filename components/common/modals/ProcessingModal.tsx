import { ActivityIndicator, Modal, Text, View } from "react-native";

interface Props {
  visible: boolean;
  message?: string;
};

export default function ProcessingModal({ visible, message = "Procesando..." }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white px-6 py-6 rounded-2xl items-center w-4/5 max-w-sm">
          <ActivityIndicator size="large" color="black" />
          <Text className="text-base font-outfit-medium mt-4 text-center">
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
