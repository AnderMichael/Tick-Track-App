import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  className?: string;
  placeholderTextColor?: string;
};

export function HourInput<T extends FieldValues>({
  name,
  control,
  placeholder = '0.00',
  className = '',
  placeholderTextColor = 'gray',
}: Props<T>) {
  const [displayValue, setDisplayValue] = useState('');

  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
          useEffect(() => {
            if (typeof value === 'number') {
              setDisplayValue(value.toFixed(2));
            }
          }, [value]);

          const handleChangeText = (text: string) => {
            const sanitized = text.replace(',', '.');
            setDisplayValue(sanitized);
          };

          const handleBlur = () => {
            const parsed = parseFloat(displayValue);
            const floored = isNaN(parsed) ? 0 : Math.floor(parsed);
            onChange(floored);
            onBlur();
          };

          return (
            <>
              <TextInput
                value={displayValue}
                onChangeText={handleChangeText}
                onBlur={handleBlur}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                className={`border border-black px-4 py-2 rounded-2xl text-xl font-outfit-light text-black ${className}`}
              />
              {error && (
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


export default HourInput;
