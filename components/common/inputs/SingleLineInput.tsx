import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputModeOptions, Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  inputMode?: InputModeOptions;
  className?: string;
  disabled?: boolean;
};

export function SingleLineInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  inputMode = "text",
  className = "",
  disabled = false,
}: Props<T>) {
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              placeholder={placeholder}
              value={value !== undefined && value !== null ? String(value) : ""}
              onChangeText={onChange}
              onBlur={onBlur}
              inputMode={inputMode}
              className={`border border-black px-4 py-3 rounded-xl font-outfit-light ${className}`}
              editable={!disabled}
              style={{ opacity: disabled ? 0.2 : 1 }}
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
