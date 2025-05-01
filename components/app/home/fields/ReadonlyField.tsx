import { Text, View } from "react-native";

interface ReadonlyFieldProps {
    label: string;
    children: React.ReactNode;
};

const ReadonlyField = ({ label, children }: ReadonlyFieldProps) => {
    return (
        <>
            <Text className="font-outfit-bold mb-1">{label}</Text>
            <View className="bg-gray-300 rounded-xl p-3" style={{elevation: 2}}>{children}</View>
        </>
    );
};

export default ReadonlyField;