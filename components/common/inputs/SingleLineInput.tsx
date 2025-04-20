import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputModeOptions, Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  inputMode?: InputModeOptions;
  className?: string;
};

export function SingleLineInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  inputMode = "text",
  className = "",
}: Props<T>) {

  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputMode={inputMode}
              className={`border border-black px-4 py-3 rounded-xl font-outfit-regular ${className}`}
            />
            {error && (
              <Text className="text-sm text-red-600 mt-1 font-outfit-light">
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}
