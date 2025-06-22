import { OptionDropdown } from "@/components/common";
import { useSession } from "@/hooks";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";

interface Props {
  control: any;
  name?: string;
}

const DepartmentDropdown = ({ control, name = "department_id" }: Props) => {
  const { user } = useSession();
  const departments = user?.administrative?.utils?.departments ?? [];

  const options = [
    { label: "Ninguno", value: 0 },
    ...departments.map((d) => ({
      label: d.value,
      value: d.id,
    })),
  ];

  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const selectedOption =
            options.find((opt) => opt.value === value) || options[0];

          return (
            <>
              <OptionDropdown
                data={options}
                value={selectedOption}
                onChange={(item) => onChange(item.value)}
                placeholder="Selecciona un departamento"
              />
              {error && (
                <Text className="text-red-500 text-sm mt-1 font-outfit-light">
                  {error.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default DepartmentDropdown;
