import { Screen } from '@/components/common';
import { MultilineInput } from '@/components/common/inputs';
import React from 'react';
import { Control } from 'react-hook-form';
import { HourInput, QualificationInput } from '../inputs';

interface Props {
    control: Control<any>;
}

const TransactionDetailsForm = ({ control }: Props) => {
    return (
        <Screen.Section>
            <Screen.SubTitle>
                Horas
            </Screen.SubTitle>
            <HourInput
                control={control}
                name="hours"
            />
            <Screen.SubTitle>
                Calificación
            </Screen.SubTitle>
            <QualificationInput
                control={control}
                name='qualification' 
            />
            <Screen.SubTitle>
                Comentarios
            </Screen.SubTitle>
            <MultilineInput
                control={control}
                name="comment"
                placeholder="¿Qué te pareció el trabajo? (Opcional)"
                className="mb-6"
            />
        </Screen.Section>
    )
}

export default TransactionDetailsForm