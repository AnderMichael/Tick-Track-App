import { ScholarshipForm } from "@/components/app/administrative";
import { Button, ErrorModal, ProcessingModal } from "@/components/common";
import { createScholarshipSchema } from "@/forms/administrative/scholarships";
import { parseAPIError } from "@/helpers/common";
import { useScholarship } from "@/hooks/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

type ScholarshipCreationForm = yup.InferType<typeof createScholarshipSchema>;

const CreateScholarshipForm = () => {
  const router = useRouter();

  const { createNewScholarship, isLoadingCreation, errorCreation } =
    useScholarship();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScholarshipCreationForm>({
    resolver: yupResolver(createScholarshipSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const handleCreation = async (data: ScholarshipCreationForm) => {
    try {
      await createNewScholarship({
        name: data.name,
        description: data.description,
      });
      router.back();
    } catch (error) {
      setErrorVisible(true);
    }
  };

  return (
    <>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(errorCreation, "No se pudo crear la beca.")}
      />
      <ProcessingModal visible={isLoadingCreation} />
      <ScholarshipForm control={control} />
      <View className="px-5 my-5">
        <Button onPress={handleSubmit(handleCreation)}>Crear</Button>
      </View>
    </>
  );
};

export default CreateScholarshipForm;
