import { YearPickerModal } from "@/components/app/home";
import { Pressable, Text } from "react-native";

interface Props {
  yearSelected: number;
  setYearSelected: (year: number) => void;
  isModalVisible: boolean;
  close: () => void;
  open: () => void;
}

export default function YearSelector({
  yearSelected,
  isModalVisible,
  open,
  close,
  setYearSelected,
}: Props) {
  return (
    <>
      <YearPickerModal
        visible={isModalVisible}
        onClose={close}
        onSelectYear={(year) => setYearSelected(year)}
        initialYear={yearSelected}
      />

      <Pressable
        className="flex flex-1 flex-row justify-between bg-black py-4 px-6 mx-5 rounded-3xl"
        onPress={open}
      >
        <Text className="text-white text-center font-outfit-bold">Gestión</Text>
        <Text className="text-white text-center font-outfit-medium">
          {yearSelected}
        </Text>
      </Pressable>
    </>
  );
}
