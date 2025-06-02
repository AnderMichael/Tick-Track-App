import { WorkForm } from '@/components/app/administrative';
import { Button, ErrorModal, ProcessingModal } from '@/components/common';
import { useWorkOperationFlow } from '@/context/administrative';
import { useSemester } from '@/context/home';
import { workCreationSchema } from '@/forms/administrative/works';
import { parseAPIError } from '@/helpers/common';
import { useWork } from '@/hooks/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';

type WorkCreationForm = yup.InferType<typeof workCreationSchema>

const CreateWorkForm = () => {
    const router = useRouter();
    const { semester } = useSemester();
    const { activateReloadList } = useWorkOperationFlow();

    const { 
        createNewWork, 
        isLoadingCreation, 
        errorCreation 
    } = useWork();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkCreationForm>({
        resolver: yupResolver(workCreationSchema),
        defaultValues: {
            title: '',
            description: '',
            workDates: {
                startDate: undefined,
                endDate: undefined,
            },
        },
    });

    const [errorVisible, setErrorVisible] = useState(false);

    const handleCreation = async (data: WorkCreationForm) => {
        console.log('Data to create work:', data);
        try {
            await createNewWork({
                title: data.title,
                description: data.description,
                date_begin: data.workDates.startDate.toISOString(),
                date_end: data.workDates.endDate.toISOString(),
                semester_id: semester!.value,
            });
            activateReloadList();
            router.back();
        } catch (error) {
            setErrorVisible(true);
        }
    }

    return (
        <>
            <ErrorModal
                visible={errorVisible}
                onClose={() => setErrorVisible(false)}
                message={parseAPIError(errorCreation, "No se pudo crear el trabajo.")}
            />
            <ProcessingModal visible={isLoadingCreation} />
            <WorkForm control={control} />
            <View className='px-5 my-5'>
                <Button onPress={handleSubmit(handleCreation)}>
                    Crear
                </Button>
            </View>
        </>
    )
}

export default CreateWorkForm;