import { COLORS } from '@/constants/common/colors';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    color?: string;
    textColor?: string;
    onPress: () => void;
    children: React.ReactNode;
}

const { BLACK, WHITE } = COLORS;

const Button = ({ color = BLACK, onPress, textColor = WHITE, children }: Props) => {
    return (
        <TouchableOpacity className="py-3 px-10 rounded-2xl w-full" style={{
            backgroundColor: color
        }} onPress={onPress}>
            <Text className="text-center font-outfit-medium text-base" style={{
                color: textColor
            }}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Button