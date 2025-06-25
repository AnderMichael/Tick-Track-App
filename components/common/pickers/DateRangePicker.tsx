import { formatDate } from "@/helpers/common";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Modal, Pressable, Text, View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

type DateRange = {
  startDate: DateType;
  endDate: DateType;
};

export default function DateRangePicker<T extends FieldValues>({
  name,
  control,
  placeholder = "Seleccionar rango de fechas",
  minDate = new Date(),
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  className = "",
}: Props<T>) {
  const [modalVisible, setModalVisible] = useState(false);
  const [range, setRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  const defaultClassNames = useDefaultClassNames();

  const getDateString = (date: Date) => formatDate(date.toISOString());

  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          useEffect(() => {
            if (value && value.startDate && value.endDate) {
              setRange({
                startDate: value.startDate,
                endDate: value.endDate,
              });
            } else {
              setRange({ startDate: undefined, endDate: undefined });
            }
          }, [value]);

          const handleRangeChange = ({
            startDate: startDateChanged,
            endDate: endDateChanged,
          }: DateRange) => {
            setRange({ startDate: startDateChanged, endDate: endDateChanged });

            if (startDateChanged && endDateChanged) {
              onChange({
                startDate: startDateChanged as Date,
                endDate: endDateChanged as Date,
              });
            }
          };

          return (
            <>
              <Pressable
                onPress={() => setModalVisible(true)}
                className={`border border-black px-4 py-3 rounded-xl ${className}`}
              >
                {range.startDate && range.endDate ? (
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base text-black font-outfit-medium">
                      {getDateString(range.startDate as Date)}
                    </Text>
                    <Feather name="clock" size={24} color="black" />
                    <Text className="text-base text-black font-outfit-medium">
                      {getDateString(range.endDate as Date)}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-base text-black font-outfit-light text-center">
                    {placeholder}
                  </Text>
                )}
              </Pressable>

              {error && (
                <Text className="text-sm text-red-600 mt-1 font-outfit-light">
                  {error.message}
                </Text>
              )}
              <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View className="flex-1 justify-center px-5">
                  <View className="absolute inset-0 bg-black opacity-20 rounded-2xl p-5">
                    <Pressable
                      onPress={() => setModalVisible(false)}
                      className="w-full h-full"
                    />
                  </View>
                  <DateTimePicker
                    showOutsideDays
                    mode="range"
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onChange={handleRangeChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    className="bg-white rounded-2xl px-5 pt-5"
                    classNames={{
                      ...defaultClassNames,
                      selected: "bg-blue-200 my-1",
                      range_start: "bg-blue-200 rounded-l-full my-1",
                      range_end: "bg-blue-200 rounded-r-full my-1",
                      range_middle: "bg-blue-100 my-1",
                      day: `font-outfit-medium ${defaultClassNames.day} hover:bg-amber-100`,
                      disabled: "opacity-50",
                      year: "font-outfit-medium",
                      weekdays: "font-outfit-medium",
                      weekday_label: "font-outfit-medium",
                      day_label: "font-outfit-medium",
                      time_selector_label: "font-outfit-medium",
                      button_next: "bg-black rounded-full p-2",
                      button_prev: "bg-black rounded-full p-2",
                      month_label: "font-outfit-medium",
                      month_selector_label: "font-outfit-medium",
                      year_selector_label: "font-outfit-medium",
                      active_year_label: "font-outfit-medium",
                      year_label: "font-outfit-light",
                      outside_label: "text-gray-200 font-outfit-light",
                    }}
                  />
                  <Pressable className="px-5" onPress={() => setModalVisible(false)}>
                    <Text className="text-sm text-white font-outfit-medium my-3 text-center">
                      CERRAR
                    </Text>
                  </Pressable>
                </View>
              </Modal>
            </>
          );
        }}
      />
    </View>
  );
}
