import { SecureInput } from '@/components/common/inputs';
import React from 'react';
import { Control } from "react-hook-form";
import { Text } from 'react-native';

interface Props {
    control: Control<any>;
}

const ConfirmPasswordForm = ({ control, }: Props) => {
    return (
        <>
            <Text className="font-outfit-medium text-base">Nueva Contraseña</Text>
            <SecureInput
                name="newPassword"
                control={control}
                placeholder="********"
            />

            <Text className="font-outfit-medium text-base">Repite la Contraseña</Text>
            <SecureInput
                name="confirmPassword"
                control={control}
                placeholder="********"
            />
        </>
    )
}

export default ConfirmPasswordForm;