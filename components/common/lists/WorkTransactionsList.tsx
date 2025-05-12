import { useSemester } from '@/context/home';
import { formatDate } from '@/helpers/common';
import { useTransactionsQuery } from '@/store/api/home';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { TransactionCard } from '../cards';
import { Screen } from '../containers';
import { useSession } from '@/hooks';

interface Props {
    work_id: number;
}

const WorkTransactionsList = ({work_id}: Props) => {
    const { semester } = useSemester();
    const { user } = useSession();
    const [page, setPage] = useState(1);
    const limit = 10;

    const {
        data,
        isFetching,
        isLoading,
        refetch,
    } = useTransactionsQuery({ administrative_upb_code: user!.upbCode, semester_id: semester!.value, page, limit, work_id });

    const renderItem = ({ item }: any) => (
        <TransactionCard transaction_id={item.id} work_id={work_id}>
            <TransactionCard.Title>{item.student_name}</TransactionCard.Title>
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
            contentContainerStyle={{ paddingHorizontal: 20 }}
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ItemSeparatorComponent={() => <View className='h-4' />}
            ListEmptyComponent={<Text className='text-center text-2xl font-outfit-extralight'>Oops! Al parecer no cuentas con transacciones en este trabajo</Text>}
        />
    );
}

export default WorkTransactionsList