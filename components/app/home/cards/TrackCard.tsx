import { SkeletonBox } from "@/components/common";
import React from "react";
import { Text, View } from "react-native";

const TrackCard = ({ children }: { children: React.ReactNode }) => {
    return <View>{children}</View>;
};

function Group({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-row justify-between gap-x-4 mb-4">
            {children}
        </View>
    );
}

function Card({
    children,
    className = "",
    isLoading = false,
}: {
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}) {

    if (isLoading) {
        return (
            <SkeletonBox className={`bg-gray-600 rounded-2xl h-24 flex-1 ${className}`} />
        );
    }

    return (
        <View className={`bg-gray-200 rounded-2xl p-4 flex-1 ${className}`}>
            {children}
        </View>
    );
}

function Value({ children }: { children: React.ReactNode }) {
    return <Text className="text-xl font-outfit-bold">{children}</Text>;
}

function Label({ children }: { children: React.ReactNode }) {
    return <Text className="text-right font-outfit-regular mt-5">{children}</Text>;
}

TrackCard.Group = Group;
TrackCard.Card = Card;
TrackCard.Value = Value;
TrackCard.Label = Label;

export { TrackCard };

