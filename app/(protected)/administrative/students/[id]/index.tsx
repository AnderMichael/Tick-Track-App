import { ReadonlyField } from "@/components/app";
import {
  Button,
  ConfirmationModal,
  LockButton,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { useCurrentStudent } from "@/context/administrative";
import { useAuth } from "@/hooks";
import { useModal, useStudent } from "@/hooks/app";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StudentDetailScreen() {
  const { id: student_id } = useLocalSearchParams();
  const router = useRouter();

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
    student,
    isLoading,
    isLoadingDeletion,
    refetch,
    removeStudent,
    lockStudent,
    unlockStudent,
  } = useStudent({
    student_id: parseInt(student_id as string),
  });

  const { setStudent: setCurrentStudent } = useCurrentStudent();
  
  useEffect(() => {
    if (student) {
      setCurrentStudent(student);
    }
  }, [student]);

  const handleDelete = async () => {
    try {
      await removeStudent();
      router.back();
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  const handleLock = async () => {
    try {
      await lockStudent();
      closeLockModal();
    } catch (err) {
      console.error("Error locking student", err);
    }
  };

  const handleResetPassword = async () => {
    if (!student_id) return;
    try {
      await resetPassword({ upbCode: parseInt(student_id as string) });
      refetch();
    } catch (err) {
      console.error("Error resetting password", err);
    }
  };

  if (isLoading || isLoadingDeletion) return <ProcessingModal visible />;

  return (
    <>
      <ConfirmationModal
        visible={isVisibleDeleteModal}
        title="Eliminar Estudiante"
        message="¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <ConfirmationModal
        visible={isVisibleLockModal}
        title="Bloquear Estudiante"
        message="¿Estás seguro de bloquear a este estudiante? Esta acción desactivará su cuenta para acceder a la aplicación."
        confirmText="Bloquear"
        cancelText="Cancelar"
        onConfirm={handleLock}
        onCancel={closeLockModal}
      />

      <ConfirmationModal
        visible={isVisibleResetPasswordModal}
        title="Reiniciar Contraseña"
        message="¿Estás seguro de reiniciar la contraseña de este estudiante? PRECAUCIÓN: Esta acción ingresará las credenciales por defecto y podrá ser accesible por cualquiera."
        confirmText="Reiniciar"
        cancelText="Cancelar"
        onConfirm={handleResetPassword}
        onCancel={closeResetPasswordModal}
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
                open={unlockStudent}
                close={openLockModal}
                openText="Desbloquear"
                closeText="Bloquear"
                isOpen={student?.isAvailable ?? true}
              />
              <View className="flex-row gap-2">
                <TouchableOpacity
                  style={{ opacity: student!.isAvailable ? 1 : 0.4 }}
                  disabled={!student!.isAvailable}
                  className="bg-gray-200 rounded-full p-3"
                  onPress={() =>
                    router.push(
                      `(protected)/administrative/students/${student_id}/edit`
                    )
                  }
                >
                  <MaterialIcons name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ opacity: student!.isAvailable ? 1 : 0.4 }}
                  disabled={!student!.isAvailable}
                  className="bg-gray-200 rounded-full p-3"
                  onPress={openDeleteModal}
                >
                  <MaterialIcons name="delete" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Screen.Section>
          <Screen.Section>
            <TouchableOpacity
              className="bg-black rounded-2xl p-4 h-28"
              onPress={() => {
                router.push({
                  pathname: `/(protected)/administrative/students/${
                    student_id as string
                  }/scholarship` as RelativePathString,
                  params: {
                    student_id: student_id as string,
                  },
                });
              }}
            >
              <Text className="text-white font-outfit-medium">Becas</Text>
              <View className="absolute bottom-[-30] right-0 opacity-25">
                <Ionicons name="ticket" color="white" size={120} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black rounded-2xl p-4 h-28"
              onPress={() => {
                router.push({
                  pathname: `/(protected)/administrative/students/${
                    student_id as string
                  }/inscriptions` as RelativePathString,
                  params: {
                    student_id: student_id as string,
                  },
                });
              }}
            >
              <Text className="text-white font-outfit-medium">
                Inscripciones
              </Text>
              <View className="absolute bottom-[-30] right-0 opacity-25">
                <Ionicons name="time" color="white" size={120} />
              </View>
            </TouchableOpacity>
          </Screen.Section>
          <Screen.Section>
            <ReadonlyField label="Primer Nombre">
              <Text className="font-outfit-regular">{student?.firstName}</Text>
            </ReadonlyField>
            <ReadonlyField label="Segundo Nombre">
              <Text className="font-outfit-regular">{student?.secondName}</Text>
            </ReadonlyField>
            <ReadonlyField label="Apellido Paterno">
              <Text className="font-outfit-regular">
                {student?.fatherLastName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Apellido Materno">
              <Text className="font-outfit-regular">
                {student?.motherLastName}
              </Text>
            </ReadonlyField>
            <ReadonlyField label="Código UPB">
              <Text className="font-outfit-regular">{student?.upbCode}</Text>
            </ReadonlyField>
            <ReadonlyField label="Departamento">
              <Text className="font-outfit-regular">{student?.department}</Text>
            </ReadonlyField>
            <ReadonlyField label="Email">
              <Text className="font-outfit-regular">{student?.email}</Text>
            </ReadonlyField>
            <ReadonlyField label="Teléfono">
              <Text className="font-outfit-regular">{student?.phone}</Text>
            </ReadonlyField>
            <ReadonlyField label="Semestres Completos">
              <Text className="font-outfit-regular">{student?.semester}</Text>
            </ReadonlyField>

            <Text className="text-center font-outfit-extralight">
              El usuario{" "}
              {student?.isConfirmed
                ? "confirmó su contraseña"
                : "NO confirmó su contraseña"}
            </Text>

            {student?.isConfirmed && (
              <Button
                onPress={openResetPasswordModal}
                disabled={!student!.isAvailable}
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
