import { formatDate } from '@/helpers/common';
import { Transaction } from '@/interfaces/student';
import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { TransactionCard } from '../cards';
import { Screen } from '../containers';

interface Props {
  transactions: Transaction[];
  isLoading?: boolean;
  refetch?: () => void;
}

const TransactionsList = ({
  transactions,
  isLoading = false,
  refetch,
}: Props) => {
  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item }) => (
      <TransactionCard transaction_id={item.id}>
        <TransactionCard.Title>{item.work_name}</TransactionCard.Title>
        <TransactionCard.Supervisor supervisor_name={item.author_name} />
        <TransactionCard.Date date={formatDate(item.date)} />
        <TransactionCard.Id id={`TRB-${item.id}`} />
        <TransactionCard.Hours hours={item.hours} />
      </TransactionCard>
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        <TransactionCard isLoading />
        <TransactionCard isLoading />
        <TransactionCard isLoading />
        <TransactionCard isLoading />
        <TransactionCard isLoading />
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          Oops! Al parecer no cuentas con transacciones este semestre
        </Text>
      }
    />
  );
};

export default TransactionsList;
