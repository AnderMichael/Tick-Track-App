import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    children: React.ReactNode;
    onPress?: () => void;
}

const ActionButton = ({ children, onPress }: Props) => {
    return (
        <TouchableOpacity className="flex items-center" onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap;
    size?: number;
    color?: string;
}

const Icon = ({ name, size = 28, color = 'black' }: IconProps) => {
    return (
        <View className="w-16 h-16 bg-gray-200 rounded-full justify-center items-center mb-2">
            <MaterialIcons name={name} size={size} color={color} />
        </View>
    );
};

interface TitleProps {
    children: string;
    color?: string;
}

const Title = ({ children, color = 'black' }: TitleProps) => {
    return <Text className="font-outfit-medium" style={{ color }}>{children}</Text>;
};

ActionButton.Icon = Icon;
ActionButton.Title = Title;

export { ActionButton };

