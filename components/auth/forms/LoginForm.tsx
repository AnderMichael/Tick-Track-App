import { SecureInput, SingleLineInput } from '@/components/common/inputs';
import React from 'react';
import { Control } from "react-hook-form";
import { Text } from 'react-native';

interface Props {
  control: Control<any>;
}

const LoginForm = ({ control, }: Props) => {
  return (
    <>
      <Text className="text-2xl font-outfit-semibold mt-7">
        Accede a tu perfil con tus{'\n'}credenciales
      </Text>
      <SingleLineInput
        control={control}
        name="upbCode"
        placeholder="Código UPB"
        inputMode='numeric'
        className="mb-4" />
      <SecureInput
        name="password"
        control={control}
        placeholder="Contraseña"
        className="mb-4" />
    </>
  )
}

export default LoginForm