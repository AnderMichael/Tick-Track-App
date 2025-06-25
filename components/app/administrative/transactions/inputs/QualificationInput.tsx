import { OptionDropdown } from "@/components/common";
import { useSession } from "@/hooks";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";

type QualificationItem = {
  label: string;
  value: number;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
};

export function QualificationDropdown<T extends FieldValues>({
  control,
  name,
  placeholder = "Calificación",
}: Props<T>) {
  const { user } = useSession();

  const qualifications =
    user!.administrative?.utils.qualifications.map((q) => ({
      label: q.value,
      value: q.id,
    })) ?? [];
    
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          // Convertimos string a objeto de dropdown
          const selected =
            qualifications.find((q) => q.value === value) ?? null;

          return (
            <>
              <OptionDropdown
                data={qualifications}
                value={selected}
                onChange={(item) => onChange(item.value)}
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
