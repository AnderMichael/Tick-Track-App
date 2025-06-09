import { DateRangePicker, Screen } from '@/components/common';
import { MultilineInput, SingleLineInput } from '@/components/common/inputs';
import React from 'react';
import { Control } from 'react-hook-form';
import { ScrollView } from 'react-native';

interface Props {
    control: Control<any>;
}

const WorkForm = ({ control }: Props) => {
    return (
        <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
            <Screen.Section>
                <Screen.SubTitle>
                    Título
                </Screen.SubTitle>
                <SingleLineInput
                    control={control}
                    name="title"
                    placeholder="Nombre del trabajo"
                    inputMode='text'
                    className="" />
                <Screen.SubTitle>
                    Descripción
                </Screen.SubTitle>
                <MultilineInput
                    control={control}
                    name="description"
                    placeholder="Tareas, responsabilidades y objetivos del trabajo"
                    className=""
                />
                <Screen.SubTitle>
                    Duración
                </Screen.SubTitle>
                <DateRangePicker
                    name='workDates'
                    control={control}
                />
            </Screen.Section>
        </ScrollView>

    )
}

export default WorkForm