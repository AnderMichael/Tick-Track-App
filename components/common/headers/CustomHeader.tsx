import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { ReactElement } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface CustomHeaderRootProps {
    children: React.ReactNode;
    showBack?: boolean;
}

const CustomHeaderRoot = ({ children, showBack = true }: CustomHeaderRootProps) => {
    const router = useRouter();

    return (
        <View className="flex-row items-center px-4 py-4 bg-transparent justify-between">
            <View className="flex-row items-center gap-4 flex-1">
                {showBack && (
                    <Pressable onPress={() => router.back()} className="p-1">
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Pressable>
                )}
                {children}
            </View>
        </View>
    );
};

interface TitleProps {
    children: React.ReactNode;
    color?: string;
}

const CustomHeaderTitle = ({ children, color = 'black' }: TitleProps) => {
    return (
        <Text className="text-2xl font-outfit-semibold" style={{ color }}>
            {children}
        </Text>
    );
};

interface ActionProps {
    icon: ReactElement;
    onPress: () => void;
}

const CustomHeaderAction = ({ icon, onPress }: ActionProps) => {
    return (
        <TouchableOpacity onPress={onPress} className="p-1 ml-auto">
            {icon}
        </TouchableOpacity>
    );
};

const CustomHeader = Object.assign(CustomHeaderRoot, {
    Title: CustomHeaderTitle,
    Action: CustomHeaderAction,
});

export { CustomHeader };

