import { SupervisorForm } from "@/components/app/administrative/supervisors";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { parseAPIError } from "@/helpers/common";
import { useSupervisor } from "@/hooks/app";
import { supervisorSchema } from "@/forms/administrative";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useState, useEffect } from "react";
import * as yup from "yup";

type SupervisorFormData = yup.InferType<typeof supervisorSchema>;

const EditSupervisorScreen = () => {
  const { id: supervisor_id } = useLocalSearchParams();
  const router = useRouter();

  const {
    supervisor,
    editSupervisor,
    isLoading,
    isLoadingUpdate,
    errorFetching,
    errorUpdate,
  } = useSupervisor({
    supervisor_id: parseInt(supervisor_id as string),
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<SupervisorFormData>({
    resolver: yupResolver(supervisorSchema),
    defaultValues: {
      upbCode: 0,
      firstName: "",
      secondName: "",
      fatherLastName: "",
      motherLastName: "",
      email: "",
      phone: "",
      department_id: 0,
      role_id: 0,
      upbRole: "",
    },
  });

  useEffect(() => {
    if (supervisor) {
      reset({
        upbCode: supervisor.upbCode,
        firstName: supervisor.firstName,
        secondName: supervisor.secondName,
        fatherLastName: supervisor.fatherLastName,
        motherLastName: supervisor.motherLastName,
        email: supervisor.email,
        phone: supervisor.phone,
        department_id: supervisor.department_id,
        role_id: supervisor.role_id,
        upbRole: supervisor.upbRole,
      });
    }
  }, [supervisor]);

  const handleEdit = async (data: SupervisorFormData) => {
    try {
      await editSupervisor(data);
      router.back();
    } catch {
      setErrorVisible(true);
    }
  };

  return (
    <Screen>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(
          errorFetching || errorUpdate,
          "No se pudo actualizar el supervisor."
        )}
      />
      <ProcessingModal visible={isLoading || isLoadingUpdate} />
      <SupervisorForm control={control} edit/>
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleEdit)}>Actualizar</Button>
      </View>
    </Screen>
  );
};

export default EditSupervisorScreen;
