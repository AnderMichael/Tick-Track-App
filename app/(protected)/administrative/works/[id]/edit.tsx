import { WorkForm } from '@/components/app/administrative';
import { Button, ErrorModal, ProcessingModal, Screen } from '@/components/common';
import { useOperationFlow, useWorkOperationFlow } from '@/context/administrative';
import { useSemester } from '@/context/home';
import { workCreationSchema } from '@/forms/administrative/works';
import { parseAPIError } from '@/helpers/common';
import { useWork } from '@/hooks/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';

type WorkCreationForm = yup.InferType<typeof workCreationSchema>

const EditFormScreen = () => {
  const { id: work_id } = useLocalSearchParams();
  const router = useRouter();

  const { semester } = useSemester();
  const { activateReload, activateReloadList } = useWorkOperationFlow();

  const {
    work,
    editWork,
    isLoading,
    isLoadingUpdate,
    errorUpdate,
    errorFetching
  } = useWork({
    work_id: parseInt(work_id as string)
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkCreationForm>({
    resolver: yupResolver(workCreationSchema),
    defaultValues: {
      title: work?.title || '',
      description: work?.description || '',
      workDates: {
        startDate: new Date(work?.date_begin ?? ''),
        endDate: new Date(work?.date_end ?? ''),
      },
    },
  });

  const handleEdition = async (data: WorkCreationForm) => {
    try {
      await editWork({
        title: data.title,
        description: data.description,
        date_begin: data.workDates.startDate.toISOString(),
        date_end: data.workDates.endDate.toISOString(),
        semester_id: semester!.value,
      });
      activateReload();
      activateReloadList();
      router.back();
    } catch (error) {
      setErrorVisible(true);
    }
  }


  return (
    <Screen>
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={parseAPIError(errorFetching || errorUpdate, "No se pudo obetener la información del trabajo.")}
      />
      <ProcessingModal visible={isLoading || isLoadingUpdate} />
      <WorkForm control={control} />
      <View className='px-5 my-5'>
        <Button onPress={handleSubmit(handleEdition)}>
          Actualizar
        </Button>
      </View>
    </Screen>
  )
}

export default EditFormScreen;