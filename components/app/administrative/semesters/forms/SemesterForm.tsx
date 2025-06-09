import { DateRangePicker, Screen } from "@/components/common";
import { Control } from "react-hook-form";
import { ScrollView } from "react-native";

interface Props {
  control: Control<any>;
  year: number;
}

export default function SemesterForm({ control, year }: Props) {
  return (
    <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 15 }}>
      <Screen.Section>
        <Screen.SubTitle>Duración</Screen.SubTitle>
        <DateRangePicker
          name="workDates"
          control={control}
          maxDate={new Date(year + 1, 1, 10)}
          minDate={new Date(year, 0, 1)}
        />
        <Screen.SubTitle>
          Sugerencia: Los semestres no pueden cruzarse entre sí, selecciona
          fechas puntuales.
        </Screen.SubTitle>
      </Screen.Section>
    </ScrollView>
  );
}
