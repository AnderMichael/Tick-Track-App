import { COLORS } from '@/constants/common/colors';
import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const { WHITE } = COLORS;

interface Props {
    children: React.ReactNode;
    backgroundColor?: string;
}

const Screen = ({ children, backgroundColor = WHITE }: Props) => {
    const headerHeight = useHeaderHeight();
    return (
        <SafeAreaView className='flex flex-1' style={{ gap: 25, paddingTop: headerHeight, backgroundColor }}>
            {children}
        </SafeAreaView>
    )
}

interface TitleProps {
    children: React.ReactNode
    color?: string
}

const ScreenTitle = ({ children, color }: TitleProps) => {
    return (
        <Text className='text-xl font-outfit-bold' style={{ color: color || 'black' }}>
            {children}
        </Text>
    )
}

interface SubTitleProps {
    children: React.ReactNode
    color?: string
}

const ScreenSubTitle = ({ children, color }: SubTitleProps) => {
    return (
        <Text className='text-lg font-outfit-regular' style={{ color: color || 'black' }}>
            {children}
        </Text>
    )
}

interface SectionProps {
    children: React.ReactNode
}

const ScreenSection = ({ children }: SectionProps) => {
    return (
        <View className="flex px-5" style={{ gap: 15 }}>
            {children}
        </View>
    )
}

Screen.Title = ScreenTitle;
Screen.SubTitle = ScreenSubTitle;
Screen.Section = ScreenSection;

export { Screen };

