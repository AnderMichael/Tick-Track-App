import { ScholarshipOfficerForm } from "@/components/app/administrative";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { parseAPIError } from "@/helpers/common";
import { useScholarshipOfficer } from "@/hooks/app";
import { scholarshipOfficerSchema } from "@/forms/administrative";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useState, useEffect } from "react";
import * as yup from "yup";

type ScholarshipOfficerFormData = yup.InferType<typeof scholarshipOfficerSchema>;

const EditScholarshipOfficerScreen = () => {
  const { id: scholarship_officer_id } = useLocalSearchParams();
  const router = useRouter();

  const {
    officer,
    editOfficer,
    isLoading,
    isLoadingUpdate,
    errorFetching,
    errorUpdate,
  } = useScholarshipOfficer({
    officer_id: parseInt(scholarship_officer_id as string),
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<ScholarshipOfficerFormData>({
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
      role_id: 0,
      upbRole: "",
    },
  });

  useEffect(() => {
    if (officer) {
      reset({
        upbCode: officer.upbCode,
        firstName: officer.firstName,
        secondName: officer.secondName,
        fatherLastName: officer.fatherLastName,
        motherLastName: officer.motherLastName,
        email: officer.email,
        phone: officer.phone,
        department_id: officer.department_id,
        role_id: officer.role_id,
        upbRole: officer.upbRole,
      });
    }
  }, [officer]);

  const handleEdit = async (data: ScholarshipOfficerFormData) => {
    try {
      await editOfficer(data);
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
          "No se pudo actualizar el encargado de becas."
        )}
      />
      <ProcessingModal visible={isLoading || isLoadingUpdate} />
      <ScholarshipOfficerForm control={control} edit />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleEdit)}>Actualizar</Button>
      </View>
    </Screen>
  );
};

export default EditScholarshipOfficerScreen;
