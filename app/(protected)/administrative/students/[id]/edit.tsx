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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type StudentFormData = yup.InferType<typeof studentSchema>;

const EditStudentScreen = () => {
  const { id: student_id } = useLocalSearchParams();
  const router = useRouter();

  const {
    student,
    editStudent,
    isLoading,
    isLoadingUpdate,
    errorFetching,
    errorUpdate,
  } = useStudent({
    student_id: parseInt(student_id as string),
  });

  const { roleId } = useStudentFilter();

  const [errorVisible, setErrorVisible] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm<StudentFormData>({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      upbCode: 0,
      firstName: "",
      secondName: "",
      fatherLastName: "",
      motherLastName: "",
      email: "",
      phone: "",
      department_id: 0,
      semester: 1,
    },
  });

  useEffect(() => {
    if (student) {
      reset({
        upbCode: student.upbCode,
        firstName: student.firstName,
        secondName: student.secondName,
        fatherLastName: student.fatherLastName,
        motherLastName: student.motherLastName,
        email: student.email,
        phone: student.phone,
        department_id: student.department_id,
        semester: student.semester,
        role_id: roleId,
      });
    }
  }, [student]);

  const handleEdit = async (data: StudentFormData) => {
    try {
      await editStudent(data);
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
          "No se pudo actualizar el estudiante."
        )}
      />
      <ProcessingModal visible={isLoading || isLoadingUpdate} />
      <StudentForm control={control} edit />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleEdit)}>Actualizar</Button>
      </View>
    </Screen>
  );
};

export default EditStudentScreen;
