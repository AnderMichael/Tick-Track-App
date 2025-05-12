import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SkeletonBox } from '../boxes';

const WorkCard = ({ children, isLoading, transaction_id }: { children?: React.ReactNode, isLoading?: boolean, transaction_id?: number }) => {
  const router = useRouter();

  const navToTransaction = (id: number) => {
    router.navigate(`/administrative/works/${id}`);
  };

  if (isLoading || !transaction_id) {
    return <SkeletonBox className={`bg-gray-600 rounded-2xl h-32`} />;
  }

  return (
    <TouchableOpacity
      className="bg-black rounded-2xl p-5"
      onPress={() => navToTransaction(transaction_id)}
    >
      {children}
    </TouchableOpacity>
  );
};

function WorkCardTitle({ children }: { children: React.ReactNode }) {
  return <Text className="text-white font-outfit-bold text-base mb-3">{children}</Text>;
}

function WorkCardDate({ date }: { date: string }) {
  return (
    <View className="flex-row items-center gap-2 mb-1">
      <MaterialCommunityIcons name="calendar" color="white" size={20} />
      <Text className="text-white font-outfit-regular text-sm">{date}</Text>
    </View>
  );
}

function WorkCardId({ id }: { id: string }) {
  return <Text className="text-white font-outfit-regular text-sm">{id}</Text>;
}

WorkCard.Title = WorkCardTitle;
WorkCard.Date = WorkCardDate;
WorkCard.Id = WorkCardId;

export default WorkCard;
