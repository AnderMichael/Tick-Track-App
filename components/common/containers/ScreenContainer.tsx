import React from 'react';
import { SafeAreaView } from 'react-native';

const variantStyles = {
    default: "flex flex-1 bg-white",
    center_between: "justify-between items-center",
    left: "items-start",
    right: "items-end",
};

type Variant = keyof typeof variantStyles;

interface Props {
    children: React.ReactNode
    variant: Variant
}

const ScreenContainer = ({ children, variant }: Props) => {
    return (
        <SafeAreaView className={`
            ${variantStyles.default}
            ${variantStyles[variant]}
          `}>
            {children}
        </SafeAreaView>
    )
}

export default ScreenContainer