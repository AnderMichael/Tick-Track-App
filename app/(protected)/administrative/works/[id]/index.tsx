import {
  ConfirmationModal,
  LockButton,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useCurrentWork } from "@/context/administrative";
import { formatDate } from "@/helpers/common";
import { useModal, useWork } from "@/hooks/app";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WorkDetailScreen() {
  const { id: work_id } = useLocalSearchParams();
  const router = useRouter();
  const {
    isVisible: isDeleteModal,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal();
  const {
    isVisible: isVisibleLockModal,
    closeModal: closeLockModal,
    openModal: openLockModal,
  } = useModal();

  const {
    work,
    isLoading,
    refetch,
    removeWork,
    isLoadingDeletion,
    lockWork,
    unlockWork,
  } = useWork({
    work_id: parseInt(work_id as string),
  });

  const { setWork } = useCurrentWork();

  useEffect(() => {
    if (work) {
      setWork(work);
    }
  }, [work]);

  async function handleDeleteWork() {
    try {
      closeDeleteModal();
      await removeWork();
      router.back();
    } catch (error) {
      console.error("Error al eliminar el trabajo:", error);
    }
  }

  async function handleLockWork() {
    try {
      closeLockModal();
      await lockWork();
    } catch (error) {
      console.error("Error al desbloquear el trabajo:", error);
    }
  }
  if (isLoading || isLoadingDeletion) return <ProcessingModal visible />;

  return (
    <>
      <ConfirmationModal
        visible={isDeleteModal}
        title="Eliminar Trabajo"
        message="¿Estás seguro de que deseas eliminar este trabajo? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteWork}
        onCancel={() => {
          closeDeleteModal();
        }}
      />
      <ConfirmationModal
        visible={isVisibleLockModal}
        title="Cerrar Trabajo"
        message="¿Estás seguro de que deseas cerrar este trabajo? Esta acción no se puede deshacer a menos que tengas el rol de administrador o encargado de becas."
        confirmText="Cerrar"
        cancelText="Cancelar"
        onConfirm={handleLockWork}
        onCancel={() => {
          closeLockModal();
        }}
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
              <LockButton
                open={unlockWork}
                close={openLockModal}
                openText="Abrir"
                closeText="Cerrar"
                isOpen={work!.is_open}
              />
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className="bg-gray-200 rounded-full p-3"
                  style={{ opacity: work!.is_open ? 1 : 0.4 }}
                  disabled={!work!.is_open}
                  onPress={() =>
                    router.push(
                      `/(protected)/administrative/works/${work_id}/edit`
                    )
                  }
                >
                  <MaterialIcons name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 rounded-full p-3"
                  style={{ opacity: work!.is_open ? 1 : 0.4 }}
                  disabled={!work!.is_open}
                  onPress={openDeleteModal}
                >
                  <MaterialIcons name="delete" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Screen.Section>
          <Screen.Section>
            <Text className="text-2xl font-outfit-bold mb-3">
              {work!.title}
            </Text>
            <Text className="text-base font-outfit-regular mb-4 leading-6">
              {work!.description}
            </Text>

            {/* Fechas */}
            <View className="flex-row bg-white border border-gray-300 rounded-2xl p-4 justify-start gap-10">
              <View>
                <Text className="font-outfit-medium text-sm mb-1">
                  Fecha Inicio
                </Text>
                <Text className="font-outfit-bold">
                  {formatDate(work!.date_begin)}
                </Text>
              </View>
              <View>
                <Text className="font-outfit-medium text-sm mb-1">
                  Fecha Fin
                </Text>
                <Text className="font-outfit-bold">
                  {formatDate(work!.date_end)}
                </Text>
              </View>
            </View>
            {/* Autor */}
            <Text className="text-base font-outfit-bold">
              Autor{" "}
              <Text className="font-outfit-regular">
                {work!.administrative.name} - {work!.administrative.upb_role}
              </Text>
            </Text>
          </Screen.Section>
          <Screen.Section>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-black rounded-2xl p-5 flex-1 h-28"
                onPress={() =>
                  router.push(
                    `/(protected)/administrative/works/${work_id}/transactions`
                  )
                }
              >
                <Text className="text-white font-outfit-bold">
                  Transacciones
                </Text>
              </TouchableOpacity>
            </View>
          </Screen.Section>
          <Screen.Section>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="items-center flex-1"
                style={{ opacity: work!.is_open ? 1 : 0.4 }}
                disabled={!work!.is_open}
                onPress={() =>
                  router.push(
                    `/(protected)/administrative/works/${work_id}/scanQR`
                  )
                }
              >
                <View className="w-20 h-20 bg-gray-200 rounded-full justify-center items-center mb-2">
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={30}
                    color="black"
                  />
                </View>
                <Text className="font-outfit-medium">Escanear QR</Text>
              </TouchableOpacity>
            </View>
          </Screen.Section>
        </ScrollView>
      </Screen>
    </>
  );
}
