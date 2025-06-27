import { SupervisorForm } from "@/components/app/administrative/supervisors";
import { Button, ErrorModal, ProcessingModal } from "@/components/common";
import { supervisorSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { useSupervisor } from "@/hooks/app";
import { useSupervisorFilters } from "@/hooks/app/useSupervisorFilters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type SupervisorFormData = yup.InferType<typeof supervisorSchema>;

export default function CreateSupervisorScreen() {
  const router = useRouter();
  const [errorVisible, setErrorVisible] = useState(false);

  const { createNewSupervisor, isLoadingCreation, errorCreation } =
    useSupervisor();

  const { roleId, filters } = useSupervisorFilters();

  const { control, handleSubmit, reset } = useForm<SupervisorFormData>({
    resolver: yupResolver(supervisorSchema),
    defaultValues: {
      upbCode: 0,
      firstName: "",
      secondName: "",
      fatherLastName: "",
      motherLastName: "",
      email: "",
      phone: "",
      department_id: filters?.department_id,
      role_id: roleId,
      upbRole: "",
    },
  });

  const handleCreate = async (data: SupervisorFormData) => {
    try {
      await createNewSupervisor(data);
      router.back();
    } catch {
      setErrorVisible(true);
    }
  };

  useEffect(() => {
    reset({
      upbCode: 0,
      firstName: "",
      secondName: "",
      fatherLastName: "",
      motherLastName: "",
      email: "",
      phone: "",
      department_id: filters?.department_id,
      role_id: roleId,
      upbRole: "",
    });
  }, [filters]);

  return (
    <>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(errorCreation, "Error al crear el supervisor.")}
      />
      <ProcessingModal visible={isLoadingCreation} />
      <SupervisorForm control={control} />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleCreate)}>Crear</Button>
      </View>
    </>
  );
}
