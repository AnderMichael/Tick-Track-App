import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    placeholder: string;
    className?: string;
};

export function SecureInput<T extends FieldValues>({
    name,
    control,
    placeholder,
    className = "",
}: Props<T>) {
    const [visible, setVisible] = useState(false);

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
                            secureTextEntry={!visible}
                            className={`border border-black px-4 py-3 rounded-xl pr-10 font-outfit-regular ${className}`}
                        />
                        <Pressable
                            onPress={() => setVisible(!visible)}
                            className="absolute right-3 top-3"
                        >
                            <Text className="text-xl">{visible ? "🙈" : "👁️"}</Text>
                        </Pressable>
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
