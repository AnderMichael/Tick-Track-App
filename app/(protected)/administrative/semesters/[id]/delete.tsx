import { Button, ErrorModal, ProcessingModal, Screen } from "@/components/common";
import { formatDate, parseAPIError } from "@/helpers/common";
import { useSemester } from "@/hooks/app";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function DeleteSemesterScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id } = params;

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    semester,
    handleDeleteSemester,
    isDeletingSemester,
    deleteSemesterError,
    isLoadingSemester,
    isFetchingSemester,
  } = useSemester({ semester_id: parseInt(id as string) });

  if (isLoadingSemester || isFetchingSemester) {
    return <ProcessingModal visible />;
  }

  const handleDeletion = async () => {
    try {
      await handleDeleteSemester();
      router.back();
    } catch (error) {
      setErrorVisible(true);
    }
  };

  return (
    <>
      <ProcessingModal visible={isDeletingSemester} />
      <ErrorModal
        message={parseAPIError(
          deleteSemesterError,
          "Error al actualizar el semestre."
        )}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            ¿Estas seguro que deseas eliminar el siguiente semestre? Asegúrate
            que no existan trabajos, inscripciones y transacciones en este
            semestre.
          </Screen.SubTitle>
        </Screen.Section>
        <Screen.Section>
          <Text className="text-3xl font-outfit-bold">{semester?.name}</Text>
        </Screen.Section>
        <Screen.Section>
          <View className="flex-row bg-white border border-gray-300 rounded-2xl p-4 justify-start gap-10">
            <View>
              <Text className="font-outfit-medium text-sm mb-1">
                Fecha Inicio
              </Text>
              <Text className="font-outfit-bold">
                {formatDate(semester!.start_date)}
              </Text>
            </View>
            <View>
              <Text className="font-outfit-medium text-sm mb-1">Fecha Fin</Text>
              <Text className="font-outfit-bold">
                {formatDate(semester!.end_date)}
              </Text>
            </View>
          </View>
        </Screen.Section>
        <View className="px-5 my-5">
          <Button onPress={handleDeletion}>Eliminar</Button>
        </View>
      </Screen>
    </>
  );
}
