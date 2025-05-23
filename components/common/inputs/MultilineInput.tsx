import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    placeholder: string;
    className?: string;
    placeholderTextColor?: string;
};

export function MultilineInput<T extends FieldValues>({
    name,
    control,
    placeholder,
    className = "",
    placeholderTextColor = "gray",
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
                            placeholderTextColor={placeholderTextColor}
                            multiline
                            textAlignVertical="top"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            className={`border border-black px-4 py-2 rounded-2xl h-40 text-base font-outfit-light ${className}`}
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
