import { Screen } from '@/components/common';
import { MultilineInput, SingleLineInput } from '@/components/common/inputs';
import React from 'react';
import { Control } from 'react-hook-form';
import { ScrollView } from 'react-native';

interface Props {
  control: Control<any>;
}

const ScholarshipForm = ({ control }: Props) => {
  return (
    <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
      <Screen.Section>
        <Screen.SubTitle>Nombre de la beca</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="name"
          placeholder="Nombre de la beca"
          inputMode="text"
          className=""
        />
        <Screen.SubTitle>Descripción</Screen.SubTitle>
        <MultilineInput
          control={control}
          name="description"
          placeholder="Breve descripción de la beca, requisitos u observaciones"
          className=""
        />
      </Screen.Section>
    </ScrollView>
  );
};

export default ScholarshipForm;
