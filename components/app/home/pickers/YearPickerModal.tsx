import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface YearPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectYear: (year: number) => void;
    initialYear?: number;
}

const YearPickerModal: React.FC<YearPickerModalProps> = ({ visible, onClose, onSelectYear, initialYear }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i);

    const [selectedYear, setSelectedYear] = useState(initialYear);

    const handleSelect = (year: number) => {
        setSelectedYear(year);
        onSelectYear(year);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white rounded-2xl p-6 w-[90%]">
                    <Text className="text-lg font-outfit-medium mb-2">Selecciona un año</Text>

                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue) => handleSelect(itemValue)}
                        style={{ width: '100%', height: 80 }}
                    >
                        {years.map((year) => (
                            <Picker.Item key={year} label={year.toString()} value={year} fontFamily='Outfit_400Regular' />
                        ))}
                    </Picker>

                    <TouchableOpacity
                        className="bg-black mt-4 py-3 rounded-xl"
                        onPress={onClose}
                    >
                        <Text className="text-white text-center font-outfit-medium">Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default YearPickerModal;
