import {
    Button,
    ErrorModal,
    ProcessingModal,
    Screen,
} from "@/components/common";
import { parseAPIError } from "@/helpers/common";
import { usePercentage } from "@/hooks/app";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function DeletePercentageScreen() {
  const { id, detailId } = useLocalSearchParams();
  const router = useRouter();
  const [errorVisible, setErrorVisible] = useState(false);

  const scholarship_id = parseInt(id as string);
  const percentage_id = parseInt(detailId as string);

  const {
    percentage,
    removePercentage,
    isLoadingDeletion,
    errorDeletion,
    isLoading,
  } = usePercentage({
    scholarship_id,
    detail_id: percentage_id,
  });

  const handleDeletion = async () => {
    try {
      await removePercentage();
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
        message={parseAPIError(
          errorDeletion,
          "Error al eliminar el porcentaje."
        )}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            ¿Estás seguro que deseas eliminar el siguiente porcentaje? Asegúrate
            que ningún estudiante tenga este porcentaje asignado en su beca.
          </Screen.SubTitle>
        </Screen.Section>
        <Screen.Section>
          <Text className="text-xl font-outfit-bold">
            {percentage!.percentage * 100}% de Beca
          </Text>
          <Text className="mt-2 font-outfit-light text-base text-gray-600">
            {percentage!.hours_per_semester} horas por semestre
          </Text>
          <Text className="font-outfit-light text-base text-gray-600">
            {percentage!.total_hours} horas totales
          </Text>
        </Screen.Section>
        <View className="px-5 my-5">
          <Button onPress={handleDeletion}>Eliminar</Button>
        </View>
      </Screen>
    </>
  );
}
