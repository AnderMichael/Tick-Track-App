import { ReadonlyField } from "@/components/app";
import {
    Button,
    ConfirmationModal,
    ProcessingModal,
    Screen,
} from "@/components/common";
import { useModal, useSupervisor } from "@/hooks/app";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SupervisorDetailScreen() {
  const { id: supervisor_id } = useLocalSearchParams();
  const router = useRouter();

  const { isVisible, openModal, closeModal } = useModal();

  const {
    supervisor,
    isLoading,
    isLoadingDeletion,
    refetch,
    removeSupervisor,
  } = useSupervisor({
    supervisor_id: parseInt(supervisor_id as string),
  });

  const handleDelete = async () => {
    try {
      await removeSupervisor();
      router.back();
    } catch (err) {
      console.error("Error deleting supervisor", err);
    }
  };

  if (isLoading || isLoadingDeletion) return <ProcessingModal visible />;

  return (
    <>
      <ConfirmationModal
        visible={isVisible}
        title="Eliminar Supervisor"
        message="¿Estás seguro de eliminar a este supervisor? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={closeModal}
      />

      <Screen>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 20, gap: 35 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        >
          <Screen.Section>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity className="bg-black rounded-full flex-row items-center px-4 py-2 h-12">
                <MaterialIcons name="lock" size={18} color="white" />
                <Text className="text-white ml-2 font-outfit-medium">
                  {supervisor?.isAvailable ? "Bloquear" : "Desbloquear"}
                </Text>
              </TouchableOpacity>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className="bg-gray-200 rounded-full p-3"
                  onPress={() =>
                    router.push(
                      `(protected)/administrative/supervisors/${supervisor_id}/edit`
                    )
                  }
                >
                  <MaterialIcons name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 rounded-full p-3"
                  onPress={openModal}
                >
                  <MaterialIcons name="delete" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Screen.Section>

          <Screen.Section>
            <ReadonlyField label="Primer Nombre">
              <Text className="font-outfit-regular">
                {supervisor?.firstName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Segundo Nombre">
              <Text className="font-outfit-regular">
                {supervisor?.secondName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Apellido Paterno">
              <Text className="font-outfit-regular">
                {supervisor?.fatherLastName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Apellido Materno">
              <Text className="font-outfit-regular">
                {supervisor?.motherLastName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Código UPB">
              <Text className="font-outfit-regular">{supervisor?.upbCode}</Text>
            </ReadonlyField>
            <ReadonlyField label="Departamento">
              <Text className="font-outfit-regular">
                {supervisor?.department}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Email">
              <Text className="font-outfit-regular">{supervisor?.email}</Text>
            </ReadonlyField>
            <ReadonlyField label="Teléfono">
              <Text className="font-outfit-regular">{supervisor?.phone}</Text>
            </ReadonlyField>
            <ReadonlyField label="Rol en la Institución">
              <Text className="font-outfit-regular">{supervisor?.upbRole}</Text>
            </ReadonlyField>
            <Text className="text-center font-outfit-extralight">
              El usuario{" "}
              {supervisor?.isConfirmed
                ? "confirmó su contraseña"
                : "NO confirmó su contraseña"}
            </Text>
            {supervisor?.isConfirmed && (
              <Button onPress={() => {}}>Reiniciar Contraseña</Button>
            )}
          </Screen.Section>
        </ScrollView>
      </Screen>
    </>
  );
}
