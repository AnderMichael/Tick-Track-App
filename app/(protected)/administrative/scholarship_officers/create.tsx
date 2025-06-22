import { ScholarshipOfficerForm } from "@/components/app/administrative";
import { Button, ErrorModal, ProcessingModal } from "@/components/common";
import { scholarshipOfficerSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { useScholarshipOfficer } from "@/hooks/app";
import { useScholarshipOfficerFilters } from "@/hooks/app/useScholarshipOfficerFilters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type ScholarshipOfficerFormData = yup.InferType<
  typeof scholarshipOfficerSchema
>;

export default function CreateScholarshipOfficerScreen() {
  const router = useRouter();
  const [errorVisible, setErrorVisible] = useState(false);

  const { createNewOfficer, isLoadingCreation, errorCreation } =
    useScholarshipOfficer();

  const { roleId } = useScholarshipOfficerFilters();

  const { control, handleSubmit } = useForm<ScholarshipOfficerFormData>({
    resolver: yupResolver(scholarshipOfficerSchema),
    defaultValues: {
      upbCode: 0,
      firstName: "",
      secondName: "",
      fatherLastName: "",
      motherLastName: "",
      email: "",
      phone: "",
      department_id: 0,
      role_id: roleId,
      upbRole: "",
    },
  });

  const handleCreate = async (data: ScholarshipOfficerFormData) => {
    try {
      await createNewOfficer(data);
      router.back();
    } catch {
      setErrorVisible(true);
    }
  };

  return (
    <>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(
          errorCreation,
          "Error al crear el encargado de becas."
        )}
      />
      <ProcessingModal visible={isLoadingCreation} />
      <ScholarshipOfficerForm control={control} />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleCreate)}>Crear</Button>
      </View>
    </>
  );
}
