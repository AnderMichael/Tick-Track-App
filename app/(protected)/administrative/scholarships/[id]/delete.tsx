import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { parseAPIError } from "@/helpers/common";
import { useScholarship } from "@/hooks/app";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function DeleteScholarshipScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [errorVisible, setErrorVisible] = useState(false);

  const {
    scholarship,
    removeScholarship,
    isLoadingDeletion,
    errorDeletion,
    isLoading,
  } = useScholarship({ scholarship_id: parseInt(id as string) });

  const handleDeletion = async () => {
    try {
      await removeScholarship();
      router.back();
    } catch (error) {
      setErrorVisible(true);
    }
  };

  if (isLoading) {
    return <ProcessingModal visible />;
  }

  return (
    <>
      <ProcessingModal visible={isLoadingDeletion} />
      <ErrorModal
        message={parseAPIError(errorDeletion, "Error al eliminar la beca.")}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            ¿Estás seguro que deseas eliminar la siguiente beca? Asegúrate de
            que no existan estudiantes y porcentajes relacionados con esta beca.
          </Screen.SubTitle>
        </Screen.Section>
        <Screen.Section>
          <Text className="text-2xl font-outfit-bold">{scholarship?.name}</Text>
          <Text className="mt-2 font-outfit-light text-base text-gray-600">
            {scholarship?.description}
          </Text>
        </Screen.Section>
        <View className="px-5 my-5">
          <Button onPress={handleDeletion}>Eliminar</Button>
        </View>
      </Screen>
    </>
  );
}
