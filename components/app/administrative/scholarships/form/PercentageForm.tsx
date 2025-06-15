import { Screen } from "@/components/common";
import { SingleLineInput } from "@/components/common/inputs";
import React, { useEffect } from "react";
import { Control, FieldErrors, useWatch } from "react-hook-form";
import { ScrollView } from "react-native";

interface Props {
  control: Control<any>;
  errors?: FieldErrors;
}

const PercentageForm = ({ control }: Props) => {
  return (
    <ScrollView style={{ gap: 20, paddingVertical: 15 }}>
      <Screen.Section>
        <Screen.SubTitle>Porcentaje de beca (%)</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="percentage"
          placeholder="Ej: 25"
          inputMode="numeric"
        />

        <Screen.SubTitle>Horas por semestre</Screen.SubTitle>
        <SingleLineInput
          control={control}
          name="hours_per_semester"
          placeholder="Ej: 40"
          inputMode="numeric"
        />
      </Screen.Section>
    </ScrollView>
  );
};

export default PercentageForm;
