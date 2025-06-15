import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  className?: string;
};

export function ReadOnlyInput<T extends FieldValues>({
  name,
  control,
  label,
  className = "",
}: Props<T>) {
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { value } }) => (
          <>
            {label && (
              <Text className="font-outfit-medium text-sm mb-1 text-gray-500">
                {label}
              </Text>
            )}
            <TextInput
              value={value?.toString() ?? ""}
              editable={false}
              selectTextOnFocus={false}
              className={`border border-gray-300 bg-gray-100 rounded-xl px-4 py-3 font-outfit-regular text-gray-700 ${className}`}
            />
          </>
        )}
      />
    </View>
  );
}
