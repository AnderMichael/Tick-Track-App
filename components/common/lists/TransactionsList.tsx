import { Screen, TransactionCard } from '@/components/common';
import { useSemester } from '@/context/home';
import { formatDate } from '@/helpers/common';
import { useSession } from '@/hooks';
import { useTransactionsQuery } from '@/store/api/home';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

const TransactionsList = () => {
    const { semester } = useSemester();
    const { user } = useSession();
    const [page, setPage] = useState(1);
    const limit = 10;

    const {
        data,
        isFetching,
        isLoading,
        refetch,
    } = useTransactionsQuery({ upbCode: user!.upbCode, semester_id: semester!.value, page, limit });

    const renderItem = ({ item }: any) => (
        <TransactionCard>
            <TransactionCard.Title>{item.comment_student}</TransactionCard.Title>
            <TransactionCard.Date date={formatDate(item.date)} />
            <TransactionCard.Id id={`TRB-${item.id}`} />
            <TransactionCard.Hours hours={item.hours} />
        </TransactionCard>
    );

    if (isFetching || isLoading) {
        return <Screen.Section>
            <TransactionCard isLoading={isFetching || isLoading} />
            <TransactionCard isLoading={isFetching || isLoading} />
            <TransactionCard isLoading={isFetching || isLoading} />
            <TransactionCard isLoading={isFetching || isLoading} />
            <TransactionCard isLoading={isFetching || isLoading} />
        </Screen.Section>
    }


    return (
        <FlatList
            data={data?.data || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 20}}
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ItemSeparatorComponent= {() => <View className='h-4' />}
            ListEmptyComponent={<Text className='text-center text-2xl font-outfit-extralight'>Oops! Al parecer no cuentas con transacciones este semestre</Text>}
        />
    );
};

export default TransactionsList;