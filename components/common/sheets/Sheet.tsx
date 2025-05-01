import React from "react";
import { Text, View } from "react-native";
import { SandglassIcon } from "../icon";

function Sheet({ children }: { children: React.ReactNode }) {
    return <View className="bg-gray-200 rounded-2xl p-6 items-center gap-y-5">{children}</View>;
}

function SheetTitle({ icon = "hourglass-outline", children }: { icon?: any; children: React.ReactNode }) {
    return (
        <>
            <View className='flex items-center justify-center mb-5'>
                <SandglassIcon />
            </View>
            <Text className="text-xl font-outfit-semibold mb-6">{children}</Text>
        </>
    );
}

function SheetField({ children }: { children: React.ReactNode }) {
    return <View className="flex-row justify-between w-full">{children}</View>;
}

function SheetName({ children }: { children: React.ReactNode }) {
    return <Text className="font-outfit-regular">{children}</Text>;
}

function SheetValue({ children }: { children: React.ReactNode }) {
    return <Text className="font-outfit-bold">{children}</Text>;
}

Sheet.Title = SheetTitle;
Sheet.Field = SheetField;
Sheet.Name = SheetName;
Sheet.Value = SheetValue;

export { Sheet };

