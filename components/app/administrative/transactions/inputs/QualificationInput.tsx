import { OptionDropdown } from '@/components/common';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Text, View } from 'react-native';


type QualificationItem = {
  label: string;
  value: number;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
};

const qualifications: QualificationItem[] = [
  { label: 'Excelente', value: 1 },
  { label: 'Bueno', value: 2 },
  { label: 'Regular', value: 3 },
  { label: 'Insuficiente', value: 4 },
];

export function QualificationDropdown<T extends FieldValues>({
  control,
  name,
  placeholder = 'Calificación',
}: Props<T>) {
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          // Convertimos string a objeto de dropdown
          const selected = qualifications.find(q => q.value === value) ?? null;

          return (
            <>
              <OptionDropdown
                data={qualifications}
                value={selected}
                onChange={item => onChange(item.value)}
                placeholder={placeholder}
              />
              {error?.message && (
                <Text className="text-sm text-red-600 mt-1 font-outfit-light">
                  {error.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
}

export default QualificationDropdown;