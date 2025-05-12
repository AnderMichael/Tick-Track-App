import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SkeletonBox } from '../boxes';

const TransactionCard = ({ children, isLoading, transaction_id }: { children?: React.ReactNode, isLoading?: boolean, transaction_id?: number }) => {

    const router = useRouter();

    const navToTransaction = (id: number) => {
        router.navigate(`/student/transactions/${id}`);
    }

    if (isLoading || !transaction_id) {
        return <SkeletonBox className={`bg-gray-600 rounded-2xl h-32`} />;
    }

    return <TouchableOpacity className="bg-black rounded-2xl p-5" onPress={() => navToTransaction(transaction_id)}>
        {children}
    </TouchableOpacity>
};

function TransactionCardTitle({ children }: { children: React.ReactNode }) {
    return <Text className="text-white font-outfit-bold text-base mb-3">{children}</Text>;
}

function TransactionCardDate({ date }: { date: string }) {
    return (
        <View className="flex-row items-center gap-2 mb-1">
            <MaterialCommunityIcons name="calendar" color="white" size={20} />
            <Text className="text-white font-outfit-regular text-sm">{date}</Text>
        </View>
    );
}

function TransactionCardId({ id }: { id: string }) {
    return (
        <Text className="text-white font-outfit-regular text-sm mb-3">
            {id}
        </Text>
    );
}

function TransactionCardSupervisor({ supervisor_name }: { supervisor_name: string }) {
    return (
        <View className="flex-row items-center gap-2 mb-1">
            <MaterialCommunityIcons name="human" color="white" size={20} />
            <Text className="text-white font-outfit-regular text-sm">{supervisor_name}</Text>
        </View>
    );
}

function TransactionCardHours({ hours }: { hours: number }) {
    return (
        <Text className="absolute right-5 bottom-5 font-outfit-bold text-white text-base">
            +{hours.toFixed(2)} hrs
        </Text>
    );
}

TransactionCard.Title = TransactionCardTitle;
TransactionCard.Date = TransactionCardDate;
TransactionCard.Id = TransactionCardId;
TransactionCard.Hours = TransactionCardHours;
TransactionCard.Supervisor = TransactionCardSupervisor;

export default TransactionCard;
