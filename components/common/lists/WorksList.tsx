import { useSemester } from '@/context/home';
import { formatDate } from '@/helpers/common';
import { useSession } from '@/hooks';
import { useTransactionsQuery, useWorksQuery } from '@/store/api/home';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Screen } from '../containers';
import WorkCard from '../cards/WorkCard';

const WorkList = () => {
  const { semester } = useSemester();
  const { user } = useSession();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: worksList,
    isFetching,
    isLoading,
    refetch,
  } = useWorksQuery({
    administrative_upb_code: user!.upbCode,
    semester_id: semester!.value,
    page,
    limit,
  });

  const renderItem = ({ item }: any) => (
    <WorkCard transaction_id={item.id}>
      <WorkCard.Title>{item.title}</WorkCard.Title>
      <WorkCard.Date date={formatDate(item.date_begin)} />
      <WorkCard.Id id={`TRB-${item.id}`} />
    </WorkCard>
  );

  if (isFetching || isLoading) {
    return (
      <Screen.Section>
        <WorkCard isLoading />
        <WorkCard isLoading />
        <WorkCard isLoading />
        <WorkCard isLoading />
        <WorkCard isLoading />
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={worksList?.data || []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          Oops! Al parecer no cuentas con trabajos creados este semestre
        </Text>
      }
    />
  );
};

export default WorkList;