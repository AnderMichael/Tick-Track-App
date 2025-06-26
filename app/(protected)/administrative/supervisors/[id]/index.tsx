import { ReadonlyField } from "@/components/app";
import {
  Button,
  ConfirmationModal,
  ErrorModal,
  LockButton,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { parseAPIError } from "@/helpers/common";
import { useAuth } from "@/hooks";
import { useModal, useSupervisor } from "@/hooks/app";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    isVisible: isVisibleDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const {
    isVisible: isVisibleLockModal,
    openModal: openLockModal,
    closeModal: closeLockModal,
  } = useModal();

  const {
    isVisible: isVisibleResetPasswordModal,
    openModal: openResetPasswordModal,
    closeModal: closeResetPasswordModal,
  } = useModal();

  const { resetPassword, isLoading: isLoadingResetPassword } = useAuth();

  const {
    supervisor,
    isLoading,
    isLoadingDeletion,
    refetch,
    removeSupervisor,
    lockSupervisor,
    unlockSupervisor,
  } = useSupervisor({
    supervisor_id: parseInt(supervisor_id as string),
  });

  const handleDelete = async () => {
    try {
      closeDeleteModal();
      await removeSupervisor();
      router.back();
    } catch (err) {
      console.error("Error deleting supervisor", err);
      setErrorMessage(parseAPIError(err, "No se pudo eliminar al supervisor."));
      setErrorVisible(true);
    }
  };

  const handleLock = async () => {
    try {
      closeLockModal();
      await lockSupervisor();
    } catch (err) {
      console.error("Error locking supervisor", err);
      setErrorMessage(parseAPIError(err, "No se pudo bloquear al supervisor."));
      setErrorVisible(true);
    }
  };

  const handleResetPassword = async () => {
    if (!supervisor_id) return;
    try {
      const { error } = await resetPassword({
        upbCode: parseInt(supervisor_id as string),
      });
      if (error) throw error;
      refetch();
    } catch (err) {
      console.error("Error resetting password", err);
      setErrorMessage(
        parseAPIError(err, "No se pudo reiniciar la contraseña.")
      );
      setErrorVisible(true);
    }
  };

  if (isLoading || isLoadingDeletion || isLoadingResetPassword)
    return <ProcessingModal visible />;

  return (
    <>
      <ConfirmationModal
        visible={isVisibleDeleteModal}
        title="Eliminar Supervisor"
        message="¿Estás seguro de que deseas eliminar este supervisor? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <ConfirmationModal
        visible={isVisibleLockModal}
        title="Bloquear Supervisor"
        message="¿Estás seguro de bloquear a este supervisor? Esta acción desactivará su cuenta para acceder a la aplicación."
        confirmText="Bloquear"
        cancelText="Cancelar"
        onConfirm={handleLock}
        onCancel={closeLockModal}
      />

      <ConfirmationModal
        visible={isVisibleResetPasswordModal}
        title="Reiniciar Contraseña"
        message="¿Estás seguro de reiniciar la contraseña de este supervisor? PRECAUCIÓN: Esta acción ingresará las credenciales por defecto y podrá ser accesible por cualquiera."
        confirmText="Reiniciar"
        cancelText="Cancelar"
        onConfirm={handleResetPassword}
        onCancel={closeResetPasswordModal}
      />

      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={errorMessage}
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
                open={unlockSupervisor}
                close={openLockModal}
                openText="Desbloquear"
                closeText="Bloquear"
                isOpen={supervisor?.isAvailable ?? true}
              />
              <View className="flex-row gap-2">
                <TouchableOpacity
                  style={{ opacity: supervisor!.isAvailable ? 1 : 0.4 }}
                  disabled={!supervisor!.isAvailable}
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
                  style={{ opacity: supervisor!.isAvailable ? 1 : 0.4 }}
                  disabled={!supervisor!.isAvailable}
                  className="bg-gray-200 rounded-full p-3"
                  onPress={openDeleteModal}
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
              <Button
                onPress={openResetPasswordModal}
                disabled={!supervisor!.isAvailable}
              >
                Reiniciar Contraseña
              </Button>
            )}
          </Screen.Section>
        </ScrollView>
      </Screen>
    </>
  );
}
