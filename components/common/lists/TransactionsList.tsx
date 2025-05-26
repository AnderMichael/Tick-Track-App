import { useSemester } from '@/context/home';
import { formatDate } from '@/helpers/common';
import { useSession } from '@/hooks';
import { useTransactionsQuery } from '@/store/api/app';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Screen } from '../containers';
import { TransactionCard } from '../cards';

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
    } = useTransactionsQuery({ student_upb_code: user!.upbCode, semester_id: semester!.value, page, limit });

    const renderItem = ({ item }: any) => (
        <TransactionCard transaction_id={item.id}>
            <TransactionCard.Title>{item.work_name}</TransactionCard.Title>
            {/* <TransactionCard.Supervisor supervisor_name={item.administrative_name} /> */}
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
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ItemSeparatorComponent= {() => <View className='h-4' />}
            ListEmptyComponent={<Text className='text-center text-2xl font-outfit-extralight'>Oops! Al parecer no cuentas con transacciones este semestre</Text>}
        />
    );
};

export default TransactionsList;