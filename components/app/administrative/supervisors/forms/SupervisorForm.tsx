import { DepartmentDropdown, Screen, WithRole } from "@/components/common";
import { SingleLineInput } from "@/components/common/inputs";
import { Role } from "@/constants/common/roles";
import React from "react";
import { Control } from "react-hook-form";
import { ScrollView, Text } from "react-native";

interface Props {
  control: Control<any>;
  edit?: boolean;
}

const SupervisorForm = ({ control, edit = false }: Props) => {
  return (
    <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
      <Screen.Section>
        <WithRole allowed={[Role.ADMIN]}>
          <Screen.SubTitle>Departamento</Screen.SubTitle>
          <DepartmentDropdown control={control} name="department_id" />
        </WithRole>

        <Screen.SubTitle>Código UPB</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="upbCode"
          placeholder="Ej. 123456"
          inputMode="numeric"
          disabled={edit}
        />
        <Text className="text-sm text-gray-500 font-outfit-light">
          {edit ? "No se puede editar después de crear." : "Se puede editar al crear. El código no debe ser usado por nigún otro usuario"}
        </Text>

        <Screen.SubTitle>Nombre</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="firstName"
          placeholder="Primer nombre"
        />

        <Screen.SubTitle>Segundo Nombre</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="secondName"
          placeholder="Segundo nombre"
        />

        <Screen.SubTitle>Apellido Paterno</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="fatherLastName"
          placeholder="Apellido paterno"
        />

        <Screen.SubTitle>Apellido Materno</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="motherLastName"
          placeholder="Apellido materno"
        />

        <Screen.SubTitle>Correo Electrónico</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="email"
          placeholder="correo@ejemplo.com"
          inputMode="email"
        />

        <Screen.SubTitle>Teléfono</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="phone"
          placeholder="Solo números"
          inputMode="tel"
        />

        <Screen.SubTitle>Rol UPB</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="upbRole"
          placeholder="Ej. Supervisor Académico"
        />
      </Screen.Section>
    </ScrollView>
  );
};

export default SupervisorForm;
