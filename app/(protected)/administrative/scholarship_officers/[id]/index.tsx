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
import { useModal, useScholarshipOfficer } from "@/hooks/app";
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

export default function ScholarshipOfficerDetailScreen() {
  const { id: scholarship_officer_id } = useLocalSearchParams();
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

  const {
    resetPassword,
    isLoading: isLoadingResetPassword,
    error: errorResetPassword,
  } = useAuth();

  const {
    officer,
    isLoading,
    isLoadingDeletion,
    refetch,
    removeOfficer,
    errorDeletion,
    lockOfficer,
    unlockOfficer,
  } = useScholarshipOfficer({
    officer_id: parseInt(scholarship_officer_id as string),
  });

  const handleDelete = async () => {
    try {
      closeDeleteModal();
      await removeOfficer();
      router.back();
    } catch (err) {
      console.error("Error deleting scholarship officer", err);
      setErrorMessage(parseAPIError(err, "No se pudo eliminar al encargado."));
      setErrorVisible(true);
    }
  };

  const handleLock = async () => {
    try {
      closeLockModal();
      await lockOfficer();
    } catch (err) {
      console.error("Error locking scholarship officer", err);
      setErrorMessage(parseAPIError(err, "No se pudo bloquear al encargado."));
      setErrorVisible(true);
    }
  };

  const handleResetPassword = async () => {
    if (!scholarship_officer_id) return;
    try {
      await resetPassword({
        upbCode: parseInt(scholarship_officer_id as string),
      });
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
        title="Eliminar Encargado"
        message="¿Estás seguro de que deseas eliminar este encargado de becas? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <ConfirmationModal
        visible={isVisibleLockModal}
        title="Bloquear Encargado"
        message="¿Estás seguro de bloquear a este encargado de becas? Esta acción desactivará su cuenta para acceder a la aplicación."
        confirmText="Bloquear"
        cancelText="Cancelar"
        onConfirm={handleLock}
        onCancel={closeLockModal}
      />

      <ConfirmationModal
        visible={isVisibleResetPasswordModal}
        title="Reiniciar Contraseña"
        message="¿Estás seguro de reiniciar la contraseña de este encargado? PRECAUCIÓN: Esta acción ingresará las credenciales por defecto y podrá ser accesible por cualquiera."
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
                open={unlockOfficer}
                close={openLockModal}
                openText="Desbloquear"
                closeText="Bloquear"
                isOpen={officer?.isAvailable ?? true}
              />
              <View className="flex-row gap-2">
                <TouchableOpacity
                  style={{ opacity: officer!.isAvailable ? 1 : 0.4 }}
                  disabled={!officer!.isAvailable}
                  className="bg-gray-200 rounded-full p-3"
                  onPress={() =>
                    router.push(
                      `(protected)/administrative/scholarship_officers/${scholarship_officer_id}/edit`
                    )
                  }
                >
                  <MaterialIcons name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ opacity: officer!.isAvailable ? 1 : 0.4 }}
                  disabled={!officer!.isAvailable}
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
              <Text className="font-outfit-regular">{officer?.firstName}</Text>
            </ReadonlyField>
            <ReadonlyField label="Segundo Nombre">
              <Text className="font-outfit-regular">{officer?.secondName}</Text>
            </ReadonlyField>
            <ReadonlyField label="Apellido Paterno">
              <Text className="font-outfit-regular">
                {officer?.fatherLastName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Apellido Materno">
              <Text className="font-outfit-regular">
                {officer?.motherLastName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Código UPB">
              <Text className="font-outfit-regular">{officer?.upbCode}</Text>
            </ReadonlyField>
            <ReadonlyField label="Departamento">
              <Text className="font-outfit-regular">{officer?.department}</Text>
            </ReadonlyField>
            <ReadonlyField label="Email">
              <Text className="font-outfit-regular">{officer?.email}</Text>
            </ReadonlyField>
            <ReadonlyField label="Teléfono">
              <Text className="font-outfit-regular">{officer?.phone}</Text>
            </ReadonlyField>
            <ReadonlyField label="Rol en la Institución">
              <Text className="font-outfit-regular">{officer?.upbRole}</Text>
            </ReadonlyField>

            <Text className="text-center font-outfit-extralight">
              El usuario{" "}
              {officer?.isConfirmed
                ? "confirmó su contraseña"
                : "NO confirmó su contraseña"}
            </Text>

            {officer?.isConfirmed && (
              <Button
                onPress={openResetPasswordModal}
                disabled={!officer!.isAvailable}
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
