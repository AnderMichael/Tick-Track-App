import { StudentForm } from "@/components/app/administrative/students";
import {
  Button,
  ErrorModal,
  ProcessingModal,
  Screen,
} from "@/components/common";
import { studentSchema } from "@/forms/administrative";
import { parseAPIError } from "@/helpers/common";
import { useStudent } from "@/hooks/app";
import { useStudentFilter } from "@/hooks/app/useStudentFilter";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type StudentFormData = yup.InferType<typeof studentSchema>;

const CreateStudentScreen = () => {
  const { createNewStudent, isLoadingCreation, errorCreation } = useStudent();
  const { roleId, filters } = useStudentFilter();
  const router = useRouter();
  const [errorVisible, setErrorVisible] = useState(false);

  const { control, handleSubmit, reset } = useForm<StudentFormData>({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      upbCode: 0,
      firstName: "",
      secondName: "",
      fatherLastName: "",
      motherLastName: "",
      email: "",
      phone: "",
      department_id: filters?.department_id,
      semester: 0,
      role_id: roleId,
    },
  });

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
      semester: 0,
      role_id: roleId,
    });
  }, [filters]);

  const handleCreate = async (data: StudentFormData) => {
    try {
      await createNewStudent(data);
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
          errorCreation,
          "No se pudo crear el estudiante."
        )}
      />
      <ProcessingModal visible={isLoadingCreation} />
      <StudentForm control={control} />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleCreate)}>Registrar</Button>
      </View>
    </Screen>
  );
};

export default CreateStudentScreen;
