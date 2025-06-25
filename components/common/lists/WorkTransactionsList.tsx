import { formatDate } from "@/helpers/common";
import { Transaction } from "@/interfaces/student";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { TransactionCard } from "../cards";
import { Screen } from "../containers";

interface Props {
  transactions: Transaction[];
  isLoading?: boolean;
  refetch?: () => void;
}

const WorkTransactionsList = ({
  transactions,
  isLoading = false,
  refetch,
}: Props) => {
  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item: transaction }) => (
      <TransactionCard transaction_id={transaction.id}>
        <TransactionCard.Title>
          {transaction.student_name}
        </TransactionCard.Title>
        <TransactionCard.Supervisor supervisor_name={transaction.author_name} />
        <TransactionCard.Date date={formatDate(transaction.date)} />
        <TransactionCard.Id id={`Nro. ${transaction.id}`} />
        <TransactionCard.Hours hours={transaction.hours} />
      </TransactionCard>
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        <TransactionCard isLoading={isLoading} />
        <TransactionCard isLoading={isLoading} />
        <TransactionCard isLoading={isLoading} />
        <TransactionCard isLoading={isLoading} />
        <TransactionCard isLoading={isLoading} />
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
          Oops! Al parecer no cuentas con transacciones en este trabajo
        </Text>
      }
    />
  );
};

export default WorkTransactionsList;
